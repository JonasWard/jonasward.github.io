#version 300 es
precision highp float;

// Embossed cement tiles on an animated asymmetric tiling.
//
// The tiling follows gelami's "Straight Flagstone Tiles"
// (https://www.shadertoy.com/view/7tKGRc), itself derived from fizzer's
// "Variegated Tiling" (https://www.shadertoy.com/view/3styzn) and Shane's
// "Asymmetric Blocks" (https://www.shadertoy.com/view/Ws3GRs): every lattice
// cell owns one tile, and the tile's edges sit at random spans inside the
// neighbouring cells. Animating those spans makes the tiles slide and change
// size while each keeps its id, and with it its shape, its height and its
// tone.
//
// Each tile is a paper-faced slab with rounded corners and a rounded edge, carrying
// one of three simple shapes: a circle, a rectangle or a diagonal crease.
// Circle and rectangle are embossed from the signed distance to their outline
// (the circle's radius, or the square distance to the rectangle so its facets
// meet at mitred corners): the surface slopes at a constant pitch inside the
// shape, creasing at the outline, and keeps that pitch across an outer flank
// until a cutoff. The shapes either move with the cell or stay fixed to the
// lattice so the drifting edges clip them. All of it is also a heightfield:
// slabs sit at different heights above the joints and the shapes stand out of
// them, and every pixel marches towards the light across that heightfield, so
// slabs and shapes cast soft shadows onto anything lower, including their own
// slab and the neighbours across the joint. Each slab is faced with paper
// whose fibres are anchored to the slab's centre with a per-slab offset, so
// they travel with it; the joints between slabs are cement.

uniform vec2 uResolution;  // canvas size, device px
uniform float uTime;       // seconds
uniform float uTileSize;   // average tile edge, device px
uniform float uPixelRatio; // device px per css px
uniform vec3 uPalette[32];    // slab tones, precomputed around a neutral colour
uniform vec3 uJointColor;     // tone of the cement joints

out vec4 fragColor;

const float TAU = 6.28318530718;
const vec3 LIGHT = vec3(-0.5014, 0.6017, 0.6217); // unit vector, from the upper left

const vec2 SCROLL = vec2(0.05, 0.03);  // tiles per second
const float SPAN_MIN = 0.2;            // where a tile edge can sit inside a cell
const float SPAN_MAX = 0.8;
const float SPAN_RATE = 0.2;           // radians per second of the edge oscillation
const float SPAN_RATE_SPREAD = 0.35;   // per-cell variation of that rate

const float GAP = 1.5;          // half of the joint between slabs, css px
const float CORNER = 9.0;       // corner radius of a slab, css px
const float EDGE = 7.0;         // width of the rounded edge, css px
const float LIGHT_SIZE = 0.14;  // apparent radius of the light, as a slope, for penumbrae
const float SLAB = 5.0;         // lowest slab top above the joint, css px
const float HEIGHT = 12.0;      // tallest slab above the lowest, css px
const float RELIEF = 6.0;       // height of a circle or rectangle at unit pitch, css px
const float RIDGE = 5.0;        // height of the raised facet of a diagonal crease, css px
const float SHADOW_REACH = 44.0; // how far a shadow can fall, css px
const float SHADOW_FINE = 10.0;  // the first stretch of the march is sampled every css px ...
const int SHADOW_FINE_STEPS = 10;
const int SHADOW_STEPS = 18;     // ... the rest ever more coarsely up to the reach

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
  f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
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

// ---------------------------------------------------------------- paper and cement

// value noise stretched along a direction: long thin fibres
float fibres(vec2 p, float angle, float len, float thick) {
  float c = cos(angle);
  float s = sin(angle);
  vec2 r = vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  return vnoise(vec2(r.x / len, r.y / thick));
}

// lightness of the paper at p (css px): fibres cut at grainAngle, cloudy formation, grain
float paper(vec2 p, float grainAngle) {
  float f1 = fibres(p, 0.4 + grainAngle, 14.0, 1.8);
  float f2 = fibres(p + 31.7, 1.9 + grainAngle, 20.0, 2.0);
  float f3 = fibres(p + 77.1, -1.0 + grainAngle, 11.0, 1.7);
  float f4 = fibres(p + 5.3, 2.6 + grainAngle, 26.0, 2.4);
  float fibre = (f1 + f2 + f3 + f4) * 0.25 - 0.5;
  float cloud = vnoise(p / 90.0) - 0.5;
  float grain = hash12(p * 1.7) - 0.5;
  return 0.08 * fibre + 0.07 * cloud + 0.025 * grain;
}

// lightness of the cement at p (css px): fine grain, speckle, cloudy mottling and pores
float cement(vec2 p) {
  float grain = vnoise(p * 0.6) - 0.5;
  float speckle = vnoise(p / 2.5) - 0.5;
  float mottle = (vnoise(p / 38.0) - 0.5) + 0.6 * (vnoise(p / 120.0 + 7.3) - 0.5);
  float pores = smoothstep(0.8, 0.93, vnoise(p / 3.5 + 41.0));
  return 0.04 * grain + 0.06 * speckle + 0.1 * mottle - 0.06 * pores;
}

// ---------------------------------------------------------------- look

// what a tile carries, fixed by its seed for as long as the tile exists
struct Look {
  float family;   // 0 circle, 1 rectangle, 2 diagonal
  float anchored; // 1: the shape moves with the cell, 0: it stays fixed to the lattice
  float k;        // pitch of the emboss (sign: outline raised or sunken)
  float cut;      // width of the flank outside the shape, as a fraction of its size
  float cutIn;    // depth of the slope inside the shape before it flattens, or a huge value for never
  vec2 tBase;     // tilt of the sheet itself
  vec2 tShape;    // tilt of the first facet of a crease
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
  L.k = (hashSeeded(seed, 23.0) < 0.5 ? -1.0 : 1.0) * mix(0.8, 1.5, hashSeeded(seed, 24.0));
  L.cut = mix(0.6, 1.2, hashSeeded(seed, 30.0));
  // now and then the inside flattens before reaching the centre
  L.cutIn = hashSeeded(seed, 31.0) < 0.35 ? mix(0.3, 0.7, hashSeeded(seed, 32.0)) : 1e5;
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

// signed distance to a box of half size b with rounded corners of radius r
float sdRoundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

// direction away from the nearest edge of that box
vec2 roundBoxDir(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  vec2 dir = max(q.x, q.y) > 0.0 ? normalize(max(q, 1e-4)) : (q.x > q.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0));
  return dir * sign(p + 1e-4);
}

float lit(vec3 n, vec3 l) {
  return max(dot(n, l), 0.0);
}

// flat facet tilted by t
float litFlat(vec2 t, vec3 l) {
  return lit(normalize(vec3(t, 1.0)), l);
}

float blendSdf(float inside, float outside, float d, float aa) {
  return mix(inside, outside, smoothstep(-aa, aa, d));
}

// the emboss at signed distance d from an outline: full pitch across the outer flank
// of width c and inside the shape down to depth cIn, flat beyond either, with a pixel
// of smoothing at the cutoffs
float bevel(float d, float c, float cIn, float aa) {
  return (1.0 - smoothstep(c - aa, c + aa, d)) * smoothstep(-cIn - aa, -cIn + aa, d);
}

// faint line along a crease; m is the sheet's short side
float crease(float d, float m) {
  return 1.0 - 0.08 * exp(-abs(d) / (0.012 * m));
}

// diffuse light on a sheet of `size` px at local position q, with the shape centred on c;
// unit is the nominal cell size in px, which fixed shapes are measured in
float motif(vec2 q, vec2 size, vec2 c, float unit, Look L, vec3 l, float aa) {
  float m = min(size.x, size.y);
  vec2 d = q - c;
  if (L.family < 0.5) {
    // circle: the sheet slopes away from the outline on both sides, so the inside
    // is a cone or a dish and the outside a flank that ends at the cutoff
    float r = L.anchored > 0.5 ? 0.4 * m : 0.5 * unit;
    float dC = length(d) - r;
    vec2 tilt = L.k * bevel(dC, L.cut * r, L.cutIn * r, aa) * normalize(d + 1e-4);
    // the slope points away from the outline on both sides; blend across the crease
    return blendSdf(litFlat(L.tBase - tilt, l), litFlat(L.tBase + tilt, l), dC, aa);
  }
  if (L.family < 1.5) {
    // rectangle: the same along the square distance, so the inside is a hip roof or
    // its dent and the outer flank is four flat facets meeting at mitred corners
    vec2 halfSize = L.anchored > 0.5 ? 0.28 * size : vec2(0.3 * unit);
    vec2 e = abs(d) - halfSize;
    float dR = max(e.x, e.y);
    float sz = min(halfSize.x, halfSize.y);
    float slope = L.k * bevel(dR, L.cut * sz, L.cutIn * sz, aa);
    vec2 tiltX = slope * vec2(sign(d.x), 0.0);
    vec2 tiltY = slope * vec2(0.0, sign(d.y));
    // facets meet at the mitres, and the slope flips across the crease at the outline
    float inside = blendSdf(litFlat(L.tBase - tiltY, l), litFlat(L.tBase - tiltX, l), e.x - e.y, aa);
    float outside = blendSdf(litFlat(L.tBase + tiltY, l), litFlat(L.tBase + tiltX, l), e.x - e.y, aa);
    return blendSdf(inside, outside, dR, aa);
  }
  // diagonal crease: two facets folding away from each other
  vec2 a = L.diag > 0.5 ? vec2(0.0) : vec2(size.x, 0.0);
  vec2 b = L.diag > 0.5 ? size : vec2(0.0, size.y);
  float dL = sdLine(q, a, b);
  vec2 tOther = L.tBase - 0.9 * L.tShape;
  return blendSdf(litFlat(tOther, l), litFlat(L.tShape, l), dL, aa) * crease(dL, m);
}

// ---------------------------------------------------------------- heightfield

// height of the shape above its slab, css px (the profile behind the emboss)
float shapeHeight(vec2 q, vec2 size, vec2 c, float unit, Look L) {
  float m = min(size.x, size.y);
  vec2 d = q - c;
  if (L.family < 2.0) {
    float dS;
    float sz;
    if (L.family < 0.5) {
      sz = L.anchored > 0.5 ? 0.4 * m : 0.5 * unit;
      dS = length(d) - sz;
    } else {
      vec2 halfSize = L.anchored > 0.5 ? 0.28 * size : vec2(0.3 * unit);
      vec2 e = abs(d) - halfSize;
      dS = max(e.x, e.y);
      sz = min(halfSize.x, halfSize.y);
    }
    float cut = L.cut * sz;
    float dc = clamp(dS, -L.cutIn * sz, cut);
    return L.k * RELIEF * (cut - abs(dc)) / cut;
  }
  // a step: one facet sits RIDGE above the other, meeting at the crease
  vec2 a = L.diag > 0.5 ? vec2(0.0) : vec2(size.x, 0.0);
  vec2 b = L.diag > 0.5 ? size : vec2(0.0, size.y);
  return sdLine(q, a, b) * sign(L.k) > 0.0 ? RIDGE : 0.0;
}

float slabHeight(Tile T) {
  return hashSeeded(tileSeed(T), 14.0);
}

// height of the wall at world position uv, css px; the joints are at zero
float terrain(vec2 uv, float t) {
  Tile T = tileAt(uv, t);
  float cssPx = uPixelRatio;
  vec2 sizePx = T.size * uTileSize;
  vec2 q = (uv - T.lo) / T.size * sizePx;
  vec2 halfSlab = 0.5 * sizePx - GAP * cssPx;
  float dSlab = sdRoundBox(q - 0.5 * sizePx, halfSlab, CORNER * cssPx);
  if (dSlab > 0.0) return 0.0;
  float edge = clamp(-dSlab / (EDGE * cssPx), 0.0, 1.0);
  float drop = EDGE * (sqrt(1.0 - (1.0 - edge) * (1.0 - edge)) - 1.0);
  Look L = lookFrom(tileSeed(T));
  vec2 c = L.anchored > 0.5 ? 0.5 * sizePx : (T.id + 0.5 - T.lo) * uTileSize;
  return SLAB + slabHeight(T) * HEIGHT + drop + shapeHeight(q, sizePx, c, uTileSize, L);
}

// height of the wall s css px from uv towards the light
float terrainAlong(vec2 uv, float s, vec2 dir, float t) {
  return terrain(uv + dir * s * uPixelRatio / uTileSize, t);
}

// soft shadow: march from height h0 at uv towards the light and keep the smallest
// angular clearance (clearance over distance) of the wall above the ray. Wherever the
// wall steps up between two samples, bisect to the step's edge and measure there, so the
// clearance is a continuous function of the pixel rather than of where samples fall. The
// light's apparent size then turns the angle into a penumbra
float shadowAt(vec2 uv, float h0, float t) {
  vec2 dir = normalize(LIGHT.xy);
  float rise = LIGHT.z / length(LIGHT.xy); // how much the ray climbs per css px travelled
  float bias = 0.4;
  float angle = 1.0;
  float sPrev = 0.0;
  float hPrev = h0;
  for (int i = 1; i <= SHADOW_STEPS; i++) {
    float f = float(i - SHADOW_FINE_STEPS) / float(SHADOW_STEPS - SHADOW_FINE_STEPS);
    float s = i <= SHADOW_FINE_STEPS ? float(i) * SHADOW_FINE / float(SHADOW_FINE_STEPS)
                                     : SHADOW_FINE + (SHADOW_REACH - SHADOW_FINE) * f * sqrt(f);
    float h = terrainAlong(uv, s, dir, t);
    if (h - hPrev > 0.75) {
      // a step up: find its edge and see how far the wall behind it rises above the ray there
      float lo = sPrev;
      float hi = s;
      float threshold = 0.5 * (h + hPrev);
      for (int j = 0; j < 5; j++) {
        float mid = 0.5 * (lo + hi);
        if (terrainAlong(uv, mid, dir, t) > threshold) hi = mid; else lo = mid;
      }
      angle = min(angle, (h0 + hi * rise + bias - h) / max(hi, 0.5));
    }
    float clearance = h0 + s * rise + bias - h;
    angle = min(angle, clearance / s);
    if (angle < -LIGHT_SIZE) break;
    sPrev = s;
    hPrev = h;
  }
  return smoothstep(-LIGHT_SIZE, LIGHT_SIZE, angle);
}

// ---------------------------------------------------------------- main

void main(void) {
  float t = uTime;
  float cssPx = uPixelRatio; // one css px in device px
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uTileSize + SCROLL * t;

  Tile T = tileAt(uv, t);
  float seed = tileSeed(T);
  vec2 sizePx = T.size * uTileSize;
  vec2 q = (uv - T.lo) / T.size * sizePx; // position on the slab, device px
  float aa = 0.75;

  // the slab: straight edges, rounded corners, a joint around it
  vec2 halfSlab = 0.5 * sizePx - GAP * cssPx;
  float dSlab = sdRoundBox(q - 0.5 * sizePx, halfSlab, CORNER * cssPx);
  vec2 edgeDir = roundBoxDir(q - 0.5 * sizePx, halfSlab, CORNER * cssPx);

  // the shape: its family and tilts are fixed by the seed; it sits either on the
  // slab's centre or on the lattice point the slab belongs to
  Look L = lookFrom(seed);
  vec2 c = L.anchored > 0.5 ? 0.5 * sizePx : (T.id + 0.5 - T.lo) * uTileSize;
  float light = motif(q, sizePx, c, uTileSize, L, LIGHT, aa);

  // the rounded edge: the slope of the quarter circle profile, steepest at the outline
  float edge = clamp(-dSlab / (EDGE * cssPx), 0.0, 1.0);
  float edgeSlope = (1.0 - edge) / sqrt(max(1.0 - (1.0 - edge) * (1.0 - edge), 0.06));
  float edgeLight = litFlat(edgeDir * edgeSlope, LIGHT);
  light = mix(edgeLight, light, smoothstep(0.0, 1.0, edge));
  // and the deeper the edge curves down, the less sky it sees
  light *= 1.0 - 0.25 * (1.0 - edge) * (1.0 - edge);

  // this slab's tone, one of the precomputed palette
  vec3 tone = uPalette[int(hashSeeded(seed, 6.0) * 32.0)];

  // paper anchored to the slab's centre, offset per slab, cut at its own angle
  vec2 texPx = (q - 0.5 * sizePx) / cssPx + vec2(hashSeeded(seed, 10.0), hashSeeded(seed, 11.0)) * 2000.0;
  vec3 col = tone * (0.45 + 0.75 * light) * (1.0 + paper(texPx, (hashSeeded(seed, 12.0) - 0.5) * 0.6));

  // the joint between slabs: dark cement, fixed to the lattice
  vec3 joint = uJointColor * 0.8 * (1.0 + cement(uv * uTileSize / cssPx));
  col = mix(col, joint, smoothstep(-aa, aa, dSlab));

  // shadows from everything taller towards the light, on slabs and joints alike
  float shadow = shadowAt(uv, terrain(uv, t), t);
  col *= 0.5 + 0.5 * shadow;


  vec2 v = gl_FragCoord.xy / uResolution - 0.5;
  col *= 1.0 - 0.25 * dot(v, v);

  fragColor = vec4(col, 1.0);
}
