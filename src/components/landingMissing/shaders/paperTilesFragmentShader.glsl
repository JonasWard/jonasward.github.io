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
// Each tile is a sharp-edged paper-faced slab, covered
// edge to edge by one of three patterns: concentric rings around a centre, nested
// frames around it (square distance, so the corners are mitred) or stripes at 45
// degrees. Each pattern is the signed distance to its shape taken modulo a period,
// and the surface folds into a triangle wave along that distance, creasing at
// every ridge and valley. The centre either moves with the cell or stays fixed to
// the
// lattice so the pattern slides under the drifting edges. All of it is also a heightfield:
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

const float GAP = 0.55;         // half of the seam between slabs, css px
const float FRAY = 1.3;         // how far the fibres pull the slab's edge, css px
const float LIGHT_SIZE = 0.14;  // apparent radius of the light, as a slope, for penumbrae
const float PERIOD_MIN = 14.0;  // spacing of the pattern's folds, css px
const float PERIOD_MAX = 256.0;
const float PERIOD_MAX_CENTRED_FRAME = 42.0; // frames sitting on the slab's centre keep their folds tight
const float SLAB = 5.0;         // lowest slab top above the joint, css px
const float HEIGHT = 12.0;      // tallest slab above the lowest, css px
const float RELIEF = 2.5;       // half height of the pattern's folds, css px
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
  return 0.16 * fibre + 0.1 * cloud + 0.04 * grain;
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
  float family;   // 0 rings, 1 frames, 2 stripes
  float anchored; // 1: the pattern's centre moves with the cell, 0: it stays fixed to the lattice
  float k;        // pitch of the folds (sign: which way the first fold goes)
  float period;   // distance from one ridge to the next, css px
  float phase;    // where along the period the centre sits
  float diag;     // which of the two 45 degree directions the stripes follow
  vec2 tBase;     // tilt of the sheet itself
};

vec2 tiltFrom(float h1, float h2) {
  float a = h1 * TAU;
  return mix(0.2, 0.75, h2) * vec2(cos(a), sin(a));
}

Look lookFrom(float seed) {
  Look L;
  float f = hashSeeded(seed, 21.0);
  L.family = f < 0.4 ? 0.0 : (f < 0.65 ? 1.0 : 2.0);
  // frames sit on the slab's centre less often than rings do
  L.anchored = step(L.family == 1.0 ? 0.75 : 0.5, hashSeeded(seed, 22.0));
  L.k = (hashSeeded(seed, 23.0) < 0.5 ? -1.0 : 1.0) * mix(0.8, 1.5, hashSeeded(seed, 24.0));
  // periods spread evenly in the log so small and large ones are equally common
  float periodMax = (L.family == 1.0 && L.anchored > 0.5) ? PERIOD_MAX_CENTRED_FRAME : PERIOD_MAX;
  L.period = PERIOD_MIN * pow(periodMax / PERIOD_MIN, hashSeeded(seed, 30.0));
  L.phase = hashSeeded(seed, 31.0);
  L.diag = step(0.5, hashSeeded(seed, 29.0));
  L.tBase = 0.35 * tiltFrom(hashSeeded(seed, 25.0), hashSeeded(seed, 26.0));
  return L;
}

// ---------------------------------------------------------------- sdf shading

// signed distance to a box of half size b
float sdBox(vec2 p, vec2 b) {
  vec2 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
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

// the pattern's distance and the direction it grows in, for local position q on a
// sheet of `size` px with the pattern centred on c
struct Field {
  float d;   // signed distance, px
  vec2 dir;  // unit direction of increasing d
  float mitre; // for frames: the x facet takes over from the y facet where this passes zero
};

Field fieldAt(vec2 q, vec2 c, Look L) {
  Field F;
  vec2 d = q - c;
  if (L.family < 0.5) {
    F.d = length(d);
    F.dir = normalize(d + 1e-4);
    F.mitre = 0.0;
  } else if (L.family < 1.5) {
    vec2 a = abs(d);
    F.d = max(a.x, a.y);
    F.dir = vec2(sign(d.x), 0.0);
    F.mitre = a.x - a.y;
  } else {
    vec2 along = L.diag > 0.5 ? vec2(0.7071, 0.7071) : vec2(0.7071, -0.7071);
    F.d = dot(d, along);
    F.dir = along;
    F.mitre = 0.0;
  }
  return F;
}

// slope of the triangle wave along the pattern's distance: +1 rising, -1 falling,
// blended across ridge and valley so neither aliases
float fold(float d, float period, float aa) {
  float w = mod(d, period) - 0.5 * period;
  return (2.0 * smoothstep(-aa, aa, w) - 1.0) * (1.0 - smoothstep(0.5 * period - aa, 0.5 * period, abs(w)));
}

// diffuse light on the sheet at local position q with the pattern centred on c
float motif(vec2 q, vec2 c, Look L, vec3 l, float aa) {
  Field F = fieldAt(q, c, L);
  float period = L.period * uPixelRatio;
  float slope = L.k * fold(F.d + L.phase * period, period, aa);
  float lit = litFlat(L.tBase + slope * F.dir, l);
  if (L.family < 1.5 && L.family >= 0.5) {
    // frames: the y facets, blended with the x facets at the mitres
    float litY = litFlat(L.tBase + slope * vec2(0.0, sign(q.y - c.y)), l);
    lit = blendSdf(litY, lit, F.mitre, aa);
  }
  return lit;
}

// ---------------------------------------------------------------- heightfield

// height of the pattern above its slab, css px: the triangle wave behind the folds
float shapeHeight(vec2 q, vec2 c, Look L) {
  Field F = fieldAt(q, c, L);
  float period = L.period * uPixelRatio;
  float w = mod(F.d + L.phase * period, period) - 0.5 * period;
  return sign(L.k) * RELIEF * (1.0 - 2.0 * abs(w) / period);
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
  if (sdBox(q - 0.5 * sizePx, halfSlab) > 0.0) return 0.0;
  Look L = lookFrom(tileSeed(T));
  vec2 c = L.anchored > 0.5 ? 0.5 * sizePx : (T.id + 0.5 - T.lo) * uTileSize;
  return SLAB + slabHeight(T) * HEIGHT + shapeHeight(q, c, L);
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

  // the slab: a rectangle with a thin seam around it, its edge frayed by the fibres
  vec2 texPx = (q - 0.5 * sizePx) / cssPx + vec2(hashSeeded(seed, 10.0), hashSeeded(seed, 11.0)) * 2000.0;
  float grainAngle = (hashSeeded(seed, 12.0) - 0.5) * 0.6;
  vec2 fray = (vec2(fibres(texPx + 5.3, 2.6 + grainAngle, 26.0, 2.4), fibres(texPx + 31.7, 1.9 + grainAngle, 20.0, 2.0)) - 0.5) * FRAY * cssPx;
  vec2 halfSlab = 0.5 * sizePx - GAP * cssPx;
  float dSlab = sdBox(q + fray - 0.5 * sizePx, halfSlab);

  // the shape: its family and tilts are fixed by the seed; it sits either on the
  // slab's centre or on the lattice point the slab belongs to
  Look L = lookFrom(seed);
  vec2 c = L.anchored > 0.5 ? 0.5 * sizePx : (T.id + 0.5 - T.lo) * uTileSize;
  float light = motif(q, c, L, LIGHT, aa);

  // this slab's tone, one of the precomputed palette
  vec3 tone = uPalette[int(hashSeeded(seed, 6.0) * 32.0)];

  // paper anchored to the slab's centre, offset per slab, cut at its own angle
  vec3 col = tone * (0.62 + 0.55 * light) * (1.0 + paper(texPx, grainAngle));

  // the seam between slabs: dark cement, fixed to the lattice
  vec3 joint = uJointColor * 0.9 * (1.0 + cement(uv * uTileSize / cssPx));
  col = mix(col, joint, smoothstep(-aa, aa, dSlab));

  // shadows from everything taller towards the light, on slabs and joints alike
  float shadow = shadowAt(uv, terrain(uv, t), t);
  col *= 0.9 + 0.1 * shadow;


  vec2 v = gl_FragCoord.xy / uResolution - 0.5;
  col *= 1.0 - 0.25 * dot(v, v);

  fragColor = vec4(col, 1.0);
}
