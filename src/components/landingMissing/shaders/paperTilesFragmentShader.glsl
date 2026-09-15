#version 300 es
precision highp float;

// Folded-paper tiles on a lattice of sliding rows.
//
// Every tile is a single sheet of paper (one cell wide, sometimes two) decorated with an
// SDF motif: quarter and half cones curling out of corners and edges, and facets facets that
// meet along creases. Normals are derived from those distance fields and shaded with one
// fixed light so the folds read as relief. Rows creep sideways one tile at a time, tiles
// slowly re-fold themselves and the whole wall drifts upwards, so the arrangement keeps
// changing and, being hashed per lattice cell, never repeats.

uniform vec2 uResolution; // canvas size in device pixels
uniform float uTime;      // seconds
uniform float uTileSize;  // tile edge in device pixels

out vec4 fragColor;

const float PI = 3.14159265359;
const vec3 LIGHT = vec3(-0.5014, 0.6017, 0.6217); // unit vector, from the upper left

const float DOUBLE_TILE_CHANCE = 0.22; // chance that a pair of cells forms one wide tile
const float ROW_STEP_RATE_MIN = 0.03;  // row steps per second
const float ROW_STEP_RATE_MAX = 0.10;
const float ROW_SLIDE_PORTION = 0.3;   // fraction of a step period spent sliding
const float REFOLD_RATE = 0.04;        // per-tile refolds per second
const float REFOLD_PORTION = 0.25;     // fraction of a refold period spent morphing
const float DRIFT_RATE = 0.006;        // tiles per second, upwards

// ---------------------------------------------------------------- hashing

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float hashSeeded(float seed, float salt) {
  return hash12(vec2(seed * 53.17, salt));
}

// smooth 0..1 ramp over the first `portion` of a unit period, held afterwards
float stepEase(float f, float portion) {
  float u = clamp(f / portion, 0.0, 1.0);
  return u * u * (3.0 - 2.0 * u);
}

// ---------------------------------------------------------------- lattice

// horizontal offset of a row in tiles: a staircase that advances one tile per step
float rowOffset(float row, float t) {
  float dir = hash12(vec2(row, 1.7)) < 0.5 ? -1.0 : 1.0;
  float rate = mix(ROW_STEP_RATE_MIN, ROW_STEP_RATE_MAX, hash12(vec2(row, 5.3)));
  float u = t * rate + hash12(vec2(row, 9.1)) * 11.0;
  return dir * (floor(u) + stepEase(fract(u), ROW_SLIDE_PORTION));
}

// (origin cell, width) of the tile covering `cell`; even cells may start a double tile
vec2 tileSpan(float cell, float row) {
  float pair = floor(cell * 0.5);
  float isDouble = step(hash12(vec2(pair, row) + 0.37), DOUBLE_TILE_CHANCE);
  return vec2(mix(cell, 2.0 * pair, isDouble), 1.0 + isDouble);
}

float tileSeed(float origin, float row) {
  return hash12(vec2(origin, row) * 1.3 + 0.11);
}

float tileHeight(float seed) {
  return hashSeeded(seed, 1.0);
}

struct Tile {
  vec2 q;      // position inside the tile, [0,w] x [0,1]
  float w;     // tile width in cells
  float seed;
  float row;
};

Tile tileAt(vec2 p, float t) {
  Tile T;
  T.row = floor(p.y);
  float x = p.x - rowOffset(T.row, t);
  vec2 span = tileSpan(floor(x), T.row);
  T.w = span.y;
  T.q = vec2(x - span.x, p.y - T.row);
  T.seed = tileSeed(span.x, T.row);
  return T;
}

// ---------------------------------------------------------------- symmetry

// one of the eight symmetries of the square (only the four flips for wide tiles),
// applied to a point inside the tile ...
vec2 symPoint(vec2 q, float w, float k) {
  if (w < 1.5 && k >= 4.0) q = vec2(q.y, 1.0 - q.x);
  if (mod(k, 4.0) >= 2.0) q.x = w - q.x;
  if (mod(k, 2.0) >= 1.0) q.y = 1.0 - q.y;
  return q;
}

// ... and to a direction, so the light can follow the tile into its local frame
vec2 symVec(vec2 v, float w, float k) {
  if (w < 1.5 && k >= 4.0) v = vec2(v.y, -v.x);
  if (mod(k, 4.0) >= 2.0) v.x = -v.x;
  if (mod(k, 2.0) >= 1.0) v.y = -v.y;
  return v;
}

// ---------------------------------------------------------------- folds

struct Fold {
  float k;  // tilt of the first cone (sign: curling up or down)
  float k2; // tilt of the second cone
  float r;  // radius parameter of the first cone, 0..1
  float r2; // radius parameter of the second cone, 0..1
  vec2 tA;  // facet tilts
  vec2 tB;
  vec2 tC;
  vec2 tD;
};

float hf(float seed, float n, float salt) {
  return hash12(vec2(seed * 97.0 + salt, n + 0.5));
}

vec2 tiltFrom(float h1, float h2) {
  float a = h1 * 2.0 * PI;
  return mix(0.2, 0.75, h2) * vec2(cos(a), sin(a));
}

Fold foldFrom(float seed, float n) {
  Fold F;
  F.k = (hf(seed, n, 1.0) < 0.5 ? -1.0 : 1.0) * mix(0.55, 1.2, hf(seed, n, 2.0));
  F.k2 = (hf(seed, n, 3.0) < 0.5 ? -1.0 : 1.0) * mix(0.55, 1.2, hf(seed, n, 4.0));
  F.r = hf(seed, n, 5.0);
  F.r2 = hf(seed, n, 6.0);
  F.tA = tiltFrom(hf(seed, n, 7.0), hf(seed, n, 8.0));
  // the facet across a crease folds the other way
  F.tB = -F.tA * mix(0.5, 1.4, hf(seed, n, 9.0)) + 0.15 * tiltFrom(hf(seed, n, 10.0), 0.5);
  F.tC = tiltFrom(hf(seed, n, 11.0), hf(seed, n, 12.0));
  F.tD = tiltFrom(hf(seed, n, 13.0), hf(seed, n, 14.0));
  return F;
}

Fold mixFold(Fold a, Fold b, float m) {
  Fold F;
  F.k = mix(a.k, b.k, m);
  F.k2 = mix(a.k2, b.k2, m);
  F.r = mix(a.r, b.r, m);
  F.r2 = mix(a.r2, b.r2, m);
  F.tA = mix(a.tA, b.tA, m);
  F.tB = mix(a.tB, b.tB, m);
  F.tC = mix(a.tC, b.tC, m);
  F.tD = mix(a.tD, b.tD, m);
  return F;
}

// ---------------------------------------------------------------- sdf shading

// signed distance to the line through a and b, positive on the left of a -> b
float sdLine(vec2 p, vec2 a, vec2 b) {
  vec2 d = b - a;
  return (d.x * (p.y - a.y) - d.y * (p.x - a.x)) / length(d);
}

float lit(vec3 n, vec3 l) {
  return max(dot(n, l), 0.0);
}

// facets facet tilted by t
float litFlat(vec2 t, vec3 l) {
  return lit(normalize(vec3(t, 1.0)), l);
}

// cone with its apex at the origin of d: the normal turns around the apex
float litCone(vec2 d, float k, vec3 l) {
  float a = atan(d.y, d.x);
  return lit(normalize(vec3(k * cos(a), k * sin(a), 1.0)), l);
}

float blendSdf(float inside, float outside, float d, float aa) {
  return mix(inside, outside, smoothstep(-aa, aa, d));
}

// darkening of the facets paper next to a curled sheet, strongest away from the light
float coneShadow(float d, vec2 dir, float r, vec3 l) {
  float away = 0.5 - 0.5 * dot(normalize(dir + 1e-5), normalize(l.xy));
  return 1.0 - (0.3 + 0.4 * away) * exp(-max(d, 0.0) / (0.05 * r + 0.005));
}

// faint line along a crease
float crease(float d) {
  return 1.0 - 0.08 * exp(-abs(d) / 0.012);
}

// diffuse light on a tile of width w at local position q, for one of eight motifs
float motif(vec2 q, float w, float kind, Fold F, vec3 l, float aa) {
  if (kind < 1.0) {
    // quarter cone curling out of a corner, the rest creased along the diagonal
    float r = mix(0.65, 1.0, F.r);
    float dC = length(q) - r;
    float dL = sdLine(q, vec2(0.0), vec2(w, 1.0));
    float facets = blendSdf(litFlat(F.tB, l), litFlat(F.tA, l), dL, aa);
    facets *= crease(dL) * coneShadow(dC, q, r, l);
    return blendSdf(litCone(q, F.k, l), facets, dC, aa);
  }
  if (kind < 2.0) {
    // quarter cone with the crease running from the far corner to the middle of its arc
    float r = mix(0.5, 0.85, F.r);
    float dC = length(q) - r;
    float dL = sdLine(q, vec2(w, 1.0), vec2(r * 0.7071));
    float facets = blendSdf(litFlat(F.tB, l), litFlat(F.tA, l), dL, aa);
    facets *= crease(dL) * coneShadow(dC, q, r, l);
    return blendSdf(litCone(q, F.k, l), facets, dC, aa);
  }
  if (kind < 3.0) {
    // half cone rising from the middle of the bottom edge, three facets around it
    vec2 apex = vec2(0.5 * w, 0.0);
    float r = min(0.5 * w, 0.95) * mix(0.75, 1.0, F.r);
    vec2 d = q - apex;
    float dC = length(d) - r;
    float dL1 = sdLine(q, apex, vec2(0.0, 1.0));
    float dL2 = sdLine(q, apex, vec2(w, 1.0));
    float facets = blendSdf(litFlat(F.tC, l), litFlat(F.tB, l), dL2, aa);
    facets = blendSdf(facets, litFlat(F.tA, l), dL1, aa);
    facets *= crease(dL1) * crease(dL2) * coneShadow(dC, d, r, l);
    return blendSdf(litCone(d, F.k, l), facets, dC, aa);
  }
  if (kind < 4.0) {
    // plain ridge: one diagonal crease, two facets
    float dL = sdLine(q, vec2(0.0), vec2(w, 1.0));
    return blendSdf(litFlat(F.tB, l), litFlat(F.tA, l), dL, aa) * crease(dL);
  }
  if (kind < 5.0) {
    // pyramid or dent: both diagonals, four facets tilted towards their edges
    float d1 = sdLine(q, vec2(0.0), vec2(w, 1.0));
    float d2 = sdLine(q, vec2(w, 0.0), vec2(0.0, 1.0));
    float m = F.k * 0.45;
    float left = litFlat(vec2(-m, 0.0) + 0.2 * F.tA, l);
    float top = litFlat(vec2(0.0, m) + 0.2 * F.tB, l);
    float right = litFlat(vec2(m, 0.0) + 0.2 * F.tC, l);
    float bottom = litFlat(vec2(0.0, -m) + 0.2 * F.tD, l);
    float v = blendSdf(blendSdf(right, bottom, d2, aa), blendSdf(top, left, d2, aa), d1, aa);
    return v * crease(d1) * crease(d2);
  }
  if (kind < 6.0) {
    // two cones curling from opposite corners, creased along the other diagonal
    float r1 = mix(0.4, 0.68, F.r);
    float r2 = mix(0.4, 0.68, F.r2);
    vec2 d2v = q - vec2(w, 1.0);
    float dC1 = length(q) - r1;
    float dC2 = length(d2v) - r2;
    float dL = sdLine(q, vec2(w, 0.0), vec2(0.0, 1.0));
    float facets = blendSdf(litFlat(F.tB, l), litFlat(F.tA, l), dL, aa);
    facets *= crease(dL) * coneShadow(dC1, q, r1, l) * coneShadow(dC2, d2v, r2, l);
    float v = blendSdf(litCone(d2v, F.k2, l), facets, dC2, aa);
    return blendSdf(litCone(q, F.k, l), v, dC1, aa);
  }
  if (kind < 7.0) {
    // one big cone filling the corner, a single facets facet left over
    float r = mix(0.85, 1.0, F.r);
    float dC = length(q) - r;
    float facets = litFlat(F.tA, l) * coneShadow(dC, q, r, l);
    return blendSdf(litCone(q, F.k, l), facets, dC, aa);
  }
  // twin arches: half cones from both bottom corners, creased down the middle
  float r = 0.5 * w * mix(0.75, 1.0, F.r);
  vec2 d2v = q - vec2(w, 0.0);
  float dC1 = length(q) - r;
  float dC2 = length(d2v) - r;
  float dL = sdLine(q, vec2(0.5 * w, 0.0), vec2(0.5 * w, 1.0));
  float facets = blendSdf(litFlat(F.tB, l), litFlat(F.tA, l), dL, aa);
  facets *= crease(dL) * coneShadow(dC1, q, r, l) * coneShadow(dC2, d2v, r, l);
  float v = blendSdf(litCone(d2v, F.k2, l), facets, dC2, aa);
  return blendSdf(litCone(q, F.k, l), v, dC1, aa);
}

vec3 shadeTile(Tile T, float t, float aa) {
  float kind = floor(hashSeeded(T.seed, 2.0) * 8.0);
  float sym = floor(hashSeeded(T.seed, 3.0) * 8.0);

  // slow refolding: every refold period the sheet morphs into a new set of folds
  float rate = REFOLD_RATE * mix(0.6, 1.4, hashSeeded(T.seed, 4.0));
  float u = t * rate + hashSeeded(T.seed, 5.0) * 13.0;
  float n = floor(u);
  Fold F = mixFold(foldFrom(T.seed, n), foldFrom(T.seed, n + 1.0), stepEase(fract(u), REFOLD_PORTION));

  vec2 q = symPoint(T.q, T.w, sym);
  vec3 l = vec3(symVec(LIGHT.xy, T.w, sym), LIGHT.z);
  float light = motif(q, T.w, kind, F, l, aa);

  vec3 paper = mix(vec3(0.76, 0.80, 0.75), vec3(0.56, 0.63, 0.59), hashSeeded(T.seed, 6.0));
  return paper * (0.3 + 0.95 * light);
}

// ---------------------------------------------------------------- main

void main(void) {
  float t = uTime;
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uTileSize;
  p.y += DRIFT_RATE * t;
  p += vec2(0.31, 0.5);

  float aa = 0.75 / uTileSize;
  Tile T = tileAt(p, t);
  vec3 col = shadeTile(T, t, aa);

  // every sheet sits at its own height: the neighbours on the lit side cast onto this one
  float h = tileHeight(T.seed);
  float xRow = p.x - rowOffset(T.row, t);
  float hLeft = tileHeight(tileSeed(tileSpan(floor(xRow - T.q.x + 0.5) - 1.0, T.row).x, T.row));
  float rowUp = T.row + 1.0;
  float xUp = p.x - rowOffset(rowUp, t);
  float hUp = tileHeight(tileSeed(tileSpan(floor(xUp), rowUp).x, rowUp));

  float dropLeft = max(hLeft - h, 0.0);
  float dropUp = max(hUp - h, 0.0);
  float shade = 1.0;
  shade -= (0.15 + 0.4 * dropLeft) * exp(-T.q.x / (0.01 + 0.06 * dropLeft));
  shade -= (0.15 + 0.4 * dropUp) * exp(-(1.0 - T.q.y) / (0.01 + 0.06 * dropUp));

  // the gap between sheets
  float dEdge = min(min(T.q.x, T.w - T.q.x), min(T.q.y, 1.0 - T.q.y));
  shade *= 1.0 - 0.3 * exp(-dEdge / 0.008);

  col *= max(shade, 0.0);
  fragColor = vec4(col, 1.0);
}
