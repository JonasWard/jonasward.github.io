#version 300 es
precision highp float;

// Folded-paper tiles on an animated asymmetric tiling.
//
// The tiling follows gelami's "Straight Flagstone Tiles"
// (https://www.shadertoy.com/view/7tKGRc), itself derived from fizzer's
// "Variegated Tiling" (https://www.shadertoy.com/view/3styzn) and Shane's
// "Asymmetric Blocks" (https://www.shadertoy.com/view/Ws3GRs): every lattice
// cell owns one tile, and the tile's edges sit at random spans inside the
// neighbouring cells. Animating those spans makes the tiles slide and change
// size while each keeps its id, and with it its family of motif, its folds
// and its own sheet of paper.
//
// Each tile is one sheet decorated with an SDF motif (curled quarter and half
// cones, creased facets, pyramids, twin arches) that adapts to the sheet's
// proportions and is lit from one fixed light so the folds read as relief.
// The paper fibres are anchored to the sheet's centre with a per-sheet
// offset, so they travel with it.

uniform vec2 uResolution;  // canvas size, device px
uniform float uTime;       // seconds
uniform float uTileSize;   // average tile edge, device px
uniform float uPixelRatio; // device px per css px

out vec4 fragColor;

const float PI = 3.14159265359;
const float TAU = 6.28318530718;
const vec3 LIGHT = vec3(-0.5014, 0.6017, 0.6217); // unit vector, from the upper left

const vec2 SCROLL = vec2(0.05, 0.03);  // tiles per second
const float SPAN_MIN = 0.2;            // where a tile edge can sit inside a cell
const float SPAN_MAX = 0.8;
const float SPAN_RATE = 0.2;           // radians per second of the edge oscillation
const float SPAN_RATE_SPREAD = 0.35;   // per-cell variation of that rate

// ---------------------------------------------------------------- hashing

// Hash without Sine, David Hoskins, MIT (https://www.shadertoy.com/view/4djSRW)
float hash12(vec2 p) {
  p = p * 1.1213;
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float hashSeeded(float seed, float salt) {
  return hash12(vec2(seed * 53.17, salt));
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash12(i);
  float b = hash12(i + vec2(1.0, 0.0));
  float c = hash12(i + vec2(0.0, 1.0));
  float d = hash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// ---------------------------------------------------------------- tiling

// where the edge owned by `cell` sits inside it, breathing with time
float randSpan(vec2 cell, float t) {
  float phase = hash12(cell) * TAU;
  float rate = SPAN_RATE * (1.0 + SPAN_RATE_SPREAD * (hash12(cell + 17.3) * 2.0 - 1.0));
  return mix(SPAN_MIN, SPAN_MAX, 0.5 + 0.5 * sin(t * rate + phase));
}

struct Tile {
  vec2 id;   // lattice cell that owns the tile
  vec2 lo;   // lower left corner, tile units
  vec2 size; // tile units
};

Tile tileAt(vec2 uv, float t) {
  vec2 fl = floor(uv);
  vec2 fr = uv - fl;
  bool ch = mod(fl.x + fl.y, 2.0) > 0.5;

  float r1 = randSpan(fl, t);
  vec2 ax = ch ? fr.xy : fr.yx;
  float a1 = ax.x - r1;
  float si = sign(a1);
  vec2 o1 = ch ? vec2(si, 0.0) : vec2(0.0, si);

  float r2 = randSpan(fl + o1, t);
  float a2 = ax.y - r2;

  vec2 st = step(vec2(0.0), vec2(a1, a2));
  vec2 of = ch ? st.xy : st.yx;

  Tile T;
  T.id = fl + of - 1.0;
  bool ch2 = mod(T.id.x + T.id.y, 2.0) > 0.5;

  float r00 = randSpan(T.id, t);
  float r10 = randSpan(T.id + vec2(1.0, 0.0), t);
  float r01 = randSpan(T.id + vec2(0.0, 1.0), t);
  float r11 = randSpan(T.id + vec2(1.0, 1.0), t);

  vec2 s0 = ch2 ? vec2(r00, r10) : vec2(r01, r00);
  vec2 s1 = ch2 ? vec2(r11, r01) : vec2(r10, r11);
  T.lo = T.id + s0;
  T.size = 1.0 - s0 + s1;
  return T;
}

float tileSeed(Tile T) {
  return hash12(T.id + 0.5);
}

// ---------------------------------------------------------------- paper

struct Paper {
  float fibre; // long thin fibres
  float cloud; // cloudy formation of the sheet
  float grain;
  vec2 disp;   // how far the fibres pull a point, css px
};

// value noise stretched along a direction: long thin fibres
float fibres(vec2 p, float angle, float len, float thick) {
  float c = cos(angle);
  float s = sin(angle);
  vec2 r = vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  return vnoise(vec2(r.x / len, r.y / thick));
}

// p in css px, so the paper looks the same on every screen
Paper paperAt(vec2 p, float grainAngle) {
  float f1 = fibres(p, 0.4 + grainAngle, 16.0, 1.3);
  float f2 = fibres(p + 31.7, 1.9 + grainAngle, 22.0, 1.6);
  float f3 = fibres(p + 77.1, -1.0 + grainAngle, 12.0, 1.1);
  float f4 = fibres(p + 5.3, 2.6 + grainAngle, 30.0, 2.2);
  Paper P;
  P.fibre = (f1 + f2 + f3 + f4) * 0.25 - 0.5;
  P.cloud = vnoise(p / 90.0) - 0.5;
  P.grain = hash12(p * 1.7) - 0.5;
  P.disp = (vec2(f4, f2) - 0.5) * 1.1;
  return P;
}

// ---------------------------------------------------------------- symmetry

// one of the eight symmetries of the square, applied to a point in the unit square ...
vec2 symPoint(vec2 q, float k) {
  if (k >= 4.0) q = vec2(q.y, 1.0 - q.x);
  if (mod(k, 4.0) >= 2.0) q.x = 1.0 - q.x;
  if (mod(k, 2.0) >= 1.0) q.y = 1.0 - q.y;
  return q;
}

// ... and to a direction, so the light can follow the tile into its local frame
vec2 symVec(vec2 v, float k) {
  if (k >= 4.0) v = vec2(v.y, -v.x);
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

vec2 tiltFrom(float h1, float h2) {
  float a = h1 * TAU;
  return mix(0.2, 0.75, h2) * vec2(cos(a), sin(a));
}

// a tile's folds never change: they are fixed by its seed
Fold foldFrom(float seed) {
  Fold F;
  F.k = (hashSeeded(seed, 21.0) < 0.5 ? -1.0 : 1.0) * mix(0.55, 1.2, hashSeeded(seed, 22.0));
  F.k2 = (hashSeeded(seed, 23.0) < 0.5 ? -1.0 : 1.0) * mix(0.55, 1.2, hashSeeded(seed, 24.0));
  F.r = hashSeeded(seed, 25.0);
  F.r2 = hashSeeded(seed, 26.0);
  F.tA = tiltFrom(hashSeeded(seed, 27.0), hashSeeded(seed, 28.0));
  // the facet across a crease folds the other way
  F.tB = -F.tA * mix(0.5, 1.4, hashSeeded(seed, 29.0)) + 0.15 * tiltFrom(hashSeeded(seed, 30.0), 0.5);
  F.tC = tiltFrom(hashSeeded(seed, 31.0), hashSeeded(seed, 32.0));
  F.tD = tiltFrom(hashSeeded(seed, 33.0), hashSeeded(seed, 34.0));
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

// flat facet tilted by t
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

// darkening of the flat paper next to a curled sheet, strongest away from the light
float coneShadow(float d, vec2 dir, float r, vec3 l) {
  float away = 0.5 - 0.5 * dot(normalize(dir + 1e-4), normalize(l.xy));
  return 1.0 - (0.3 + 0.4 * away) * exp(-max(d, 0.0) / (0.05 * r + 1.0));
}

// faint line along a crease; m is the sheet's short side
float crease(float d, float m) {
  return 1.0 - 0.08 * exp(-abs(d) / (0.012 * m));
}

// diffuse light on a sheet of `size` px at local position q, for one of eight motif families
float motif(vec2 q, vec2 size, float kind, Fold F, vec3 l, float aa) {
  float m = min(size.x, size.y);
  if (kind < 1.0) {
    // quarter cone curling out of a corner, the rest creased along the diagonal
    float r = mix(0.65, 1.0, F.r) * m;
    float dC = length(q) - r;
    float dL = sdLine(q, vec2(0.0), size);
    float facets = blendSdf(litFlat(F.tB, l), litFlat(F.tA, l), dL, aa);
    facets *= crease(dL, m) * coneShadow(dC, q, r, l);
    return blendSdf(litCone(q, F.k, l), facets, dC, aa);
  }
  if (kind < 2.0) {
    // quarter cone with the crease running from the far corner to the middle of its arc
    float r = mix(0.5, 0.85, F.r) * m;
    float dC = length(q) - r;
    float dL = sdLine(q, size, vec2(r * 0.7071));
    float facets = blendSdf(litFlat(F.tB, l), litFlat(F.tA, l), dL, aa);
    facets *= crease(dL, m) * coneShadow(dC, q, r, l);
    return blendSdf(litCone(q, F.k, l), facets, dC, aa);
  }
  if (kind < 3.0) {
    // half cone rising from the middle of the bottom edge, three facets around it
    vec2 apex = vec2(0.5 * size.x, 0.0);
    float r = min(0.5 * size.x, 0.95 * size.y) * mix(0.75, 1.0, F.r);
    vec2 d = q - apex;
    float dC = length(d) - r;
    float dL1 = sdLine(q, apex, vec2(0.0, size.y));
    float dL2 = sdLine(q, apex, size);
    float facets = blendSdf(litFlat(F.tC, l), litFlat(F.tB, l), dL2, aa);
    facets = blendSdf(facets, litFlat(F.tA, l), dL1, aa);
    facets *= crease(dL1, m) * crease(dL2, m) * coneShadow(dC, d, r, l);
    return blendSdf(litCone(d, F.k, l), facets, dC, aa);
  }
  if (kind < 4.0) {
    // plain ridge: one diagonal crease, two facets
    float dL = sdLine(q, vec2(0.0), size);
    return blendSdf(litFlat(F.tB, l), litFlat(F.tA, l), dL, aa) * crease(dL, m);
  }
  if (kind < 5.0) {
    // pyramid or dent: both diagonals, four facets tilted towards their edges
    float d1 = sdLine(q, vec2(0.0), size);
    float d2 = sdLine(q, vec2(size.x, 0.0), vec2(0.0, size.y));
    float k = F.k * 0.45;
    float left = litFlat(vec2(-k, 0.0) + 0.2 * F.tA, l);
    float top = litFlat(vec2(0.0, k) + 0.2 * F.tB, l);
    float right = litFlat(vec2(k, 0.0) + 0.2 * F.tC, l);
    float bottom = litFlat(vec2(0.0, -k) + 0.2 * F.tD, l);
    float v = blendSdf(blendSdf(right, bottom, d2, aa), blendSdf(top, left, d2, aa), d1, aa);
    return v * crease(d1, m) * crease(d2, m);
  }
  if (kind < 6.0) {
    // two cones curling from opposite corners, creased along the other diagonal
    float r1 = mix(0.4, 0.68, F.r) * m;
    float r2 = mix(0.4, 0.68, F.r2) * m;
    vec2 d2v = q - size;
    float dC1 = length(q) - r1;
    float dC2 = length(d2v) - r2;
    float dL = sdLine(q, vec2(size.x, 0.0), vec2(0.0, size.y));
    float facets = blendSdf(litFlat(F.tB, l), litFlat(F.tA, l), dL, aa);
    facets *= crease(dL, m) * coneShadow(dC1, q, r1, l) * coneShadow(dC2, d2v, r2, l);
    float v = blendSdf(litCone(d2v, F.k2, l), facets, dC2, aa);
    return blendSdf(litCone(q, F.k, l), v, dC1, aa);
  }
  if (kind < 7.0) {
    // one big cone filling the corner, a single flat facet left over
    float r = mix(0.85, 1.0, F.r) * m;
    float dC = length(q) - r;
    float facets = litFlat(F.tA, l) * coneShadow(dC, q, r, l);
    return blendSdf(litCone(q, F.k, l), facets, dC, aa);
  }
  // twin arches: half cones from both bottom corners, creased down the middle
  float r = min(0.5 * size.x, size.y) * mix(0.75, 1.0, F.r);
  vec2 d2v = q - vec2(size.x, 0.0);
  float dC1 = length(q) - r;
  float dC2 = length(d2v) - r;
  float dL = sdLine(q, vec2(0.5 * size.x, 0.0), vec2(0.5 * size.x, size.y));
  float facets = blendSdf(litFlat(F.tB, l), litFlat(F.tA, l), dL, aa);
  facets *= crease(dL, m) * coneShadow(dC1, q, r, l) * coneShadow(dC2, d2v, r, l);
  float v = blendSdf(litCone(d2v, F.k2, l), facets, dC2, aa);
  return blendSdf(litCone(q, F.k, l), v, dC1, aa);
}

// ---------------------------------------------------------------- main

void main(void) {
  float t = uTime;
  float px = uTileSize / 160.0; // size-relative pixel, keeps seams and shadows proportional
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uTileSize + SCROLL * t;

  Tile T = tileAt(uv, t);
  float seed = tileSeed(T);
  vec2 sizePx = T.size * uTileSize;
  vec2 puv = (uv - T.lo) / T.size;

  // this sheet's paper: fibres anchored to its centre, offset per sheet, cut at its own angle
  vec2 texPx = (puv - 0.5) * sizePx / uPixelRatio + vec2(hashSeeded(seed, 10.0), hashSeeded(seed, 11.0)) * 2000.0;
  Paper paper = paperAt(texPx, (hashSeeded(seed, 12.0) - 0.5) * 0.6);

  // position on the sheet in px, pulled slightly along the fibres so edges fray
  vec2 q = puv * sizePx + paper.disp * uPixelRatio;

  // the motif in the sheet's own frame: family and orientation are fixed by the seed,
  // the geometry follows the sheet's current proportions
  float sym = floor(hashSeeded(seed, 2.0) * 8.0);
  float kind = floor(hashSeeded(seed, 3.0) * 8.0);
  vec2 sizeL = sym >= 4.0 ? sizePx.yx : sizePx;
  vec2 qL = symPoint(q / sizePx, sym) * sizeL;
  vec3 l = vec3(symVec(LIGHT.xy, sym), LIGHT.z);
  float light = motif(qL, sizeL, kind, foldFrom(seed), l, 0.75);

  vec3 tone = mix(vec3(0.76, 0.80, 0.75), vec3(0.56, 0.63, 0.59), hashSeeded(seed, 6.0));
  vec3 col = tone * (0.3 + 0.95 * light);
  col *= 1.0 + 0.11 * paper.fibre + 0.07 * paper.cloud + 0.04 * paper.grain;

  // every sheet sits at its own height: the neighbours on the lit side cast onto this one
  float h = hashSeeded(seed, 14.0);
  float shade = 1.0;
  if (q.x < 40.0 * px) {
    Tile L = tileAt(vec2(T.lo.x - 0.002, uv.y), t);
    float drop = max(hashSeeded(tileSeed(L), 14.0) - h, 0.0);
    shade -= (0.15 + 0.4 * drop) * exp(-max(q.x, 0.0) / ((1.5 + 10.0 * drop) * px));
  }
  if (sizePx.y - q.y < 40.0 * px) {
    Tile U = tileAt(vec2(uv.x, T.lo.y + T.size.y + 0.002), t);
    float drop = max(hashSeeded(tileSeed(U), 14.0) - h, 0.0);
    shade -= (0.15 + 0.4 * drop) * exp(-max(sizePx.y - q.y, 0.0) / ((1.5 + 10.0 * drop) * px));
  }

  // the gap between sheets
  float dEdge = min(min(q.x, sizePx.x - q.x), min(q.y, sizePx.y - q.y));
  shade *= 1.0 - 0.35 * exp(-max(dEdge, 0.0) / (1.2 * px));
  col *= max(shade, 0.0);

  vec2 v = gl_FragCoord.xy / uResolution - 0.5;
  col *= 1.0 - 0.25 * dot(v, v);

  fragColor = vec4(col, 1.0);
}
