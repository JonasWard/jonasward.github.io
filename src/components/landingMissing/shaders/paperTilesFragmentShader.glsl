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
// Each tile is one sheet carrying one of three simple shapes: a circle (a
// curled disc), a rectangle (a second sheet laid on top) or a diagonal crease.
// Circles and rectangles either move with the cell or stay fixed to the
// lattice so the drifting edges clip them. Everything is lit from one fixed
// light so the shapes read as relief. The paper fibres are anchored to the
// sheet's centre with a per-sheet offset, so they travel with it.

uniform vec2 uResolution;  // canvas size, device px
uniform float uTime;       // seconds
uniform float uTileSize;   // average tile edge, device px
uniform float uPixelRatio; // device px per css px

out vec4 fragColor;

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

// ---------------------------------------------------------------- look

// what a tile carries, fixed by its seed for as long as the tile exists
struct Look {
  float family;   // 0 circle, 1 rectangle, 2 diagonal
  float anchored; // 1: the shape moves with the cell, 0: it stays fixed to the lattice
  float k;        // tilt of the curled disc (sign: curling up or down)
  vec2 tBase;     // tilt of the sheet itself
  vec2 tShape;    // tilt of the raised rectangle, or of the first facet of a crease
  float diag;     // which diagonal a crease follows
};

vec2 tiltFrom(float h1, float h2) {
  float a = h1 * TAU;
  return mix(0.2, 0.75, h2) * vec2(cos(a), sin(a));
}

Look lookFrom(float seed) {
  Look L;
  float f = hashSeeded(seed, 21.0);
  L.family = f < 0.4 ? 0.0 : (f < 0.65 ? 1.0 : 2.0);
  L.anchored = step(0.5, hashSeeded(seed, 22.0));
  L.k = (hashSeeded(seed, 23.0) < 0.5 ? -1.0 : 1.0) * mix(0.55, 1.2, hashSeeded(seed, 24.0));
  L.tBase = 0.35 * tiltFrom(hashSeeded(seed, 25.0), hashSeeded(seed, 26.0));
  L.tShape = tiltFrom(hashSeeded(seed, 27.0), hashSeeded(seed, 28.0));
  L.diag = step(0.5, hashSeeded(seed, 29.0));
  return L;
}

// ---------------------------------------------------------------- sdf shading

// signed distance to the line through a and b, positive on the left of a -> b
float sdLine(vec2 p, vec2 a, vec2 b) {
  vec2 d = b - a;
  return (d.x * (p.y - a.y) - d.y * (p.x - a.x)) / length(d);
}

float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float lit(vec3 n, vec3 l) {
  return max(dot(n, l), 0.0);
}

// flat facet tilted by t
float litFlat(vec2 t, vec3 l) {
  return lit(normalize(vec3(t, 1.0)), l);
}

// curled disc with its centre at the origin of d: the normal turns around the centre
float litCone(vec2 d, float k, vec3 l) {
  float a = atan(d.y, d.x);
  return lit(normalize(vec3(k * cos(a), k * sin(a), 1.0)), l);
}

float blendSdf(float inside, float outside, float d, float aa) {
  return mix(inside, outside, smoothstep(-aa, aa, d));
}

// darkening of the sheet next to a raised shape, strongest away from the light
float contactShadow(float d, vec2 dir, float r, vec3 l) {
  float away = 0.5 - 0.5 * dot(normalize(dir + 1e-4), normalize(l.xy));
  return 1.0 - (0.3 + 0.4 * away) * exp(-max(d, 0.0) / (0.05 * r + 1.0));
}

// faint line along a crease; m is the sheet's short side
float crease(float d, float m) {
  return 1.0 - 0.08 * exp(-abs(d) / (0.012 * m));
}

// diffuse light on a sheet of `size` px at local position q, with the shape centred on c;
// unit is the nominal cell size in px, which fixed shapes are measured in
float motif(vec2 q, vec2 size, vec2 c, float unit, Look L, vec3 l, float aa) {
  float m = min(size.x, size.y);
  float base = litFlat(L.tBase, l);
  vec2 d = q - c;
  if (L.family < 0.5) {
    // circle: a curled disc
    float r = L.anchored > 0.5 ? 0.4 * m : 0.5 * unit;
    float dC = length(d) - r;
    return blendSdf(litCone(d, L.k, l), base * contactShadow(dC, d, r, l), dC, aa);
  }
  if (L.family < 1.5) {
    // rectangle: a second sheet laid on top
    vec2 halfSize = L.anchored > 0.5 ? 0.28 * size : vec2(0.3 * unit);
    float dR = sdBox(d, halfSize);
    return blendSdf(litFlat(L.tShape, l), base * contactShadow(dR, d, min(halfSize.x, halfSize.y), l), dR, aa);
  }
  // diagonal crease: two facets folding away from each other
  vec2 a = L.diag > 0.5 ? vec2(0.0) : vec2(size.x, 0.0);
  vec2 b = L.diag > 0.5 ? size : vec2(0.0, size.y);
  float dL = sdLine(q, a, b);
  vec2 tOther = L.tBase - 0.9 * L.tShape;
  return blendSdf(litFlat(tOther, l), litFlat(L.tShape, l), dL, aa) * crease(dL, m);
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

  // the shape: its family and tilts are fixed by the seed; it sits either on the
  // sheet's centre or on the lattice point the sheet belongs to
  Look L = lookFrom(seed);
  vec2 c = L.anchored > 0.5 ? 0.5 * sizePx : (T.id + 0.5 - T.lo) * uTileSize;
  float light = motif(q, sizePx, c, uTileSize, L, LIGHT, 0.75);

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
