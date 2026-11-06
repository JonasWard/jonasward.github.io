#version 300 es
precision highp float;

// Embossed paper tiles on an animated asymmetric tiling: the wall pass.
//
// This renders the lit paper into a texture, with the wall's height in the alpha channel;
// the shade pass (paperTilesShadeShader.glsl) then marches that heightfield for the soft
// shadows, so the tiling is only ever built once per pixel. The texture runs on past the
// canvas by uOrigin on every side, so the march near the canvas' edges finds real wall.
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
// slabs sit at different heights and the shapes stand out of
// them, and every pixel marches towards the light across that heightfield, so
// slabs and shapes cast soft shadows onto anything lower, including their own
// slab and the neighbours (see the shade pass). Each slab is faced with paper
// whose fibres are anchored to the slab's centre with a per-slab offset, so
// they travel with it; the paper itself is baked once into a repeating tile
// (paperTilesPaperShader.glsl) and read here. Slabs abut directly; only tone and
// shadow mark the edges.

uniform vec2 uResolution;  // canvas size, device px
uniform vec2 uOrigin;      // where the canvas' lower left corner sits in this pass' target, device px
uniform float uTime;       // seconds
uniform float uTileSize;   // average tile edge, device px
uniform float uPixelRatio; // device px per css px
uniform vec3 uPalette[32];    // slab tones, precomputed around a neutral colour
uniform sampler2D uLogo;      // signed distance field of the logo, 0.5 on the outline
uniform vec4 uLogoRect;       // centre x, centre y, width, height of the logo on screen, device px
uniform float uLogoSpread;    // distance the field spans on each side of the outline, device px
uniform sampler2D uPaper;     // the paper's lightness, a repeating tile, 0.5 is flat

out vec4 fragColor;

const float TAU = 6.28318530718;
const vec3 LIGHT = vec3(-0.5014, 0.6017, 0.6217); // unit vector, from the upper left

const vec2 SCROLL = vec2(0.05, 0.03);  // tiles per second
const float SPAN_MIN = 0.2;            // where a tile edge can sit inside a cell
const float SPAN_MAX = 0.8;
const float SPAN_RATE = 0.2;           // radians per second of the edge oscillation
const float SPAN_RATE_SPREAD = 0.35;   // per-cell variation of that rate

const float PERIOD_MIN = 20.0;  // spacing of the pattern's folds, css px
const float PERIOD_MAX = 384.0;
const float PERIOD_MAX_CENTRED_FRAME = 60.0; // frames sitting on the slab's centre keep their folds tight
const float HEIGHT = 12.0;      // tallest slab above the lowest, css px
const float LOGO_DEPTH = 10.0;  // how far the logo is cut below the lowest slab, css px
const float FRAY = 0.8;         // how far the edges between slabs wander, css px
const float RELIEF = 2.5;       // half height of the pattern's folds, css px
const float HEIGHT_SPAN = LOGO_DEPTH + HEIGHT + RELIEF; // the height range the alpha channel covers, see the shade pass
const float AA = 0.75;          // half width of every blend across an edge, device px
const float PAPER_TILE = 512.0; // css px the paper tile spans, keep in step with the paper shader
const float PAPER_RANGE = 0.5;  // lightness spanned by its byte, likewise

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

// everything a tile carries hangs off its seed, so the values come four at a time
vec4 hashSeeded4(float seed, vec4 salt) {
  return vec4(hashSeeded(seed, salt.x), hashSeeded(seed, salt.y), hashSeeded(seed, salt.z), hashSeeded(seed, salt.w));
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

// the lattice cell owning the tile under uv: the cell's own edge, then the edge of the
// cell that one points to, decide which of the four cells around uv it is
vec2 tileIdAt(vec2 uv, float t) {
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
  return fl + of - 1.0;
}

Tile tileAt(vec2 uv, float t) {
  Tile T;
  T.id = tileIdAt(uv, t);
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

float tileSeed(vec2 id) {
  return hash12(id + 0.5);
}

// the slab's tone, one of the palette; the index is capped, a hash of exactly 1.0 would read past its end
vec3 slabTone(float tone) {
  return uPalette[min(int(tone * 32.0), 31)];
}

// how high the slab owned by lattice cell `id` sits, css px
float slabHeight(vec2 id) {
  return hashSeeded(tileSeed(id), 14.0) * HEIGHT;
}

// ---------------------------------------------------------------- paper

// 1d value noise, quintic
float vnoise1(float x) {
  float i = floor(x);
  float f = fract(x);
  f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(hash12(vec2(i, 0.37)), hash12(vec2(i + 1.0, 0.37)), f);
}

// a small displacement of the tiling itself so the edges between slabs run slightly
// jagged. Vertical edges only ever move sideways and horizontal edges only up or down, so
// the wobble depends only on the position along the edge (plus the lattice column or row
// the edge belongs to) and travels with the edge instead of rippling as it slides.
// uv in tile units, result in tile units
vec2 frayAt(vec2 uv) {
  vec2 cell = floor(uv);
  vec2 alongPx = uv * uTileSize / uPixelRatio; // css px
  float sy = alongPx.y + hash12(cell.xx + 3.1) * 100.0;
  float sx = alongPx.x + hash12(cell.yy + 7.9) * 100.0;
  float dx = 0.65 * vnoise1(sy) + 0.35 * vnoise1(sy * 2.7 + 11.0) - 0.5;
  float dy = 0.65 * vnoise1(sx) + 0.35 * vnoise1(sx * 2.7 + 23.0) - 0.5;
  return vec2(dx, dy) * FRAY * uPixelRatio / uTileSize;
}

// lightness of the paper at p (css px), its fibres cut at grainAngle: the baked tile,
// turned. The cloud and grain in it turn along, which nothing can tell
float paper(vec2 p, float grainAngle) {
  float c = cos(grainAngle);
  float s = sin(grainAngle);
  vec2 r = vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  return (texture(uPaper, r / PAPER_TILE).r - 0.5) * PAPER_RANGE;
}

// ---------------------------------------------------------------- look

// what a tile carries, fixed by its seed for as long as the tile exists
struct Look {
  float family;   // 0 rings, 1 frames, 2 stripes
  float anchored; // 1: the pattern's centre sits on the slab's centre, 2: on one of its corners,
                  // both moving with the cell; 0: it stays fixed to the lattice
  float corner;   // which corner, 0..3, when anchored to one
  float k;        // pitch of the folds (sign: which way the first fold goes)
  float period;   // distance from one ridge to the next, device px
  float phase;    // where along the period the centre sits
  float capTop;   // the fold wave is clipped flat above this level (1 = never) ...
  float capBottom; // ... and below minus this level
  float diag;     // which of the two 45 degree directions the stripes follow
  vec2 tBase;     // tilt of the sheet itself
};

vec2 tiltFrom(float h1, float h2) {
  float a = h1 * TAU;
  return mix(0.2, 0.75, h2) * vec2(cos(a), sin(a));
}

Look lookFrom(float seed) {
  vec4 h0 = hashSeeded4(seed, vec4(21.0, 22.0, 34.0, 23.0));
  vec4 h1 = hashSeeded4(seed, vec4(24.0, 30.0, 31.0, 32.0));
  vec4 h2 = hashSeeded4(seed, vec4(33.0, 29.0, 25.0, 26.0));
  Look L;
  L.family = h0.x < 0.4 ? 0.0 : (h0.x < 0.65 ? 1.0 : 2.0);
  // where the pattern sits: mostly on the lattice, sometimes on the slab's centre
  // (frames less often than rings) and sometimes on one of its corners
  float centreFrom = L.family == 1.0 ? 0.55 : 0.4;
  L.anchored = h0.y < centreFrom ? 0.0 : (h0.y < centreFrom + 0.2 ? 1.0 : 2.0);
  L.corner = floor(h0.z * 4.0);
  L.k = (h0.w < 0.5 ? -1.0 : 1.0) * mix(0.8, 1.5, h1.x);
  // periods spread evenly in the log so small and large ones are equally common
  float periodMax = (L.family == 1.0 && L.anchored == 1.0) ? PERIOD_MAX_CENTRED_FRAME : PERIOD_MAX;
  L.period = PERIOD_MIN * exp2(h1.y * log2(periodMax / PERIOD_MIN)) * uPixelRatio;
  L.phase = h1.z;
  L.capTop = mix(0.2, 1.0, h1.w);
  L.capBottom = mix(0.2, 1.0, h2.x);
  L.diag = step(0.5, h2.y);
  L.tBase = 0.35 * tiltFrom(h2.z, h2.w);
  return L;
}

// where the pattern is centred on a slab of `sizePx`, in slab px
vec2 patternCentre(Tile T, vec2 sizePx, Look L) {
  if (L.anchored == 1.0) return 0.5 * sizePx;
  if (L.anchored == 2.0) return vec2(mod(L.corner, 2.0), floor(L.corner * 0.5)) * sizePx;
  return (T.id + 0.5 - T.lo) * uTileSize;
}

// ---------------------------------------------------------------- folds

// diffuse light on a flat facet tilted by t
float litFlat(vec2 t) {
  return max(dot(vec3(t, 1.0), LIGHT) * inversesqrt(dot(t, t) + 1.0), 0.0);
}

// the folds at local position q on the slab with the pattern centred on c: the diffuse
// light on the sheet, and its height above the slab in css px
vec2 foldAt(vec2 q, vec2 c, Look L) {
  // the pattern's distance, the direction it grows in, and for frames a second facet
  // direction that takes over where the mitre passes zero (never, for the others)
  vec2 d = q - c;
  float dist;
  vec2 dir;
  vec2 dirY = vec2(0.0, sign(d.y));
  float mitre = 1.0;
  if (L.family < 0.5) {
    dist = length(d);
    dir = normalize(d + 1e-4);
    dirY = dir;
  } else if (L.family < 1.5) {
    vec2 a = abs(d);
    dist = max(a.x, a.y);
    dir = vec2(sign(d.x), 0.0);
    mitre = a.x - a.y;
  } else {
    dir = L.diag > 0.5 ? vec2(0.7071, 0.7071) : vec2(0.7071, -0.7071);
    dist = dot(d, dir);
    dirY = dir;
  }

  // the triangle wave along that distance, -1 at the valleys, +1 at the ridges, and its
  // slope: +1 rising, -1 falling, blended across ridge and valley so neither aliases, and
  // zero where the slab clips the wave flat above capTop or below -capBottom
  float w = mod(dist + L.phase * L.period, L.period) - 0.5 * L.period;
  float h = sign(L.k) * (1.0 - 2.0 * abs(w) / L.period);
  float slope = (2.0 * smoothstep(-AA, AA, w) - 1.0) * (1.0 - smoothstep(0.5 * L.period - AA, 0.5 * L.period, abs(w)));
  float aaH = 2.0 * AA / L.period;
  float open = smoothstep(L.capTop + aaH, L.capTop - aaH, h) * smoothstep(-L.capBottom - aaH, -L.capBottom + aaH, h);
  slope *= L.k * open;

  float light = mix(litFlat(L.tBase + slope * dirY), litFlat(L.tBase + slope * dir), smoothstep(-AA, AA, mitre));
  return vec2(light, RELIEF * clamp(h, -L.capBottom, L.capTop));
}

// ---------------------------------------------------------------- logo

// signed distance to the logo's outline at a screen position, device px, negative inside
float logoDistance(vec2 fragPx) {
  vec2 uv = (fragPx - uLogoRect.xy) / uLogoRect.zw;
  uv = vec2(uv.x + 0.5, 0.5 - uv.y);
  if (any(lessThan(uv, vec2(0.0))) || any(greaterThan(uv, vec2(1.0)))) return uLogoSpread;
  return (texture(uLogo, uv).r * 2.0 - 1.0) * uLogoSpread;
}

// ---------------------------------------------------------------- main

void main(void) {
  float t = uTime;
  float cssPx = uPixelRatio; // one css px in device px
  vec2 fragPx = gl_FragCoord.xy - uOrigin; // canvas px

  // the logo: cut out of the wall down to the floor (the shade pass casts the tiles'
  // shadows into the letters), so inside the letters there is no wall to build
  float dLogo = logoDistance(fragPx);
  vec3 floorCol = vec3(0.0);
  if (dLogo < AA) {
    floorCol = uPalette[0] * 0.72 * (1.0 + paper(fragPx / cssPx, 0.3));
    if (dLogo < -AA) {
      fragColor = vec4(floorCol, 0.0);
      return;
    }
  }

  vec2 uvWorld = (fragPx - 0.5 * uResolution) / uTileSize + SCROLL * t;
  vec2 uv = uvWorld + frayAt(uvWorld);
  Tile T = tileAt(uv, t);
  float seed = tileSeed(T.id);
  vec2 sizePx = T.size * uTileSize;
  vec2 q = (uv - T.lo) * uTileSize; // position on the slab, device px

  // this slab's paper, anchored to its centre, offset per slab, cut at its own angle, and
  // its tone, one of the precomputed palette
  vec4 hs = hashSeeded4(seed, vec4(10.0, 11.0, 12.0, 6.0));
  float grain = paper((q - 0.5 * sizePx) / cssPx + hs.xy * 2000.0, (hs.z - 0.5) * 0.6);
  vec3 tone = slabTone(hs.w);

  // the shape: its family and tilts are fixed by the seed; it sits either on the
  // slab's centre or on the lattice point the slab belongs to
  Look L = lookFrom(seed);
  vec2 fold = foldAt(q, patternCentre(T, sizePx, L), L);

  // the height and tone: the slab's, plus the folds. Within a pixel of the nearest of the
  // slab's four edges (left, bottom, right, top) the neighbouring slab shows through by its
  // coverage, so height and tone ease across the edge: the shadow that marks it (see the
  // shade pass) and the colour step both slide smoothly as the tiling moves, instead of
  // jumping a pixel at a time. The neighbour's paper and folds are left out, they would
  // cost a whole second surface; its tone is one hash and a palette read
  vec4 d = vec4(q, sizePx - q);
  float edge = min(min(d.x, d.y), min(d.z, d.w));
  float slab = slabHeight(T.id);
  if (edge < AA) {
    vec4 nearest = step(d, vec4(edge));
    vec2 across = uv + (nearest.zw - nearest.xy) * (edge + 1.0) / uTileSize; // just beyond the edge
    vec2 neighbour = tileIdAt(across, t);
    float w = smoothstep(-AA, AA, edge);
    slab = mix(slabHeight(neighbour), slab, w);
    tone = mix(slabTone(hashSeeded(tileSeed(neighbour), 6.0)), tone, w);
  }
  vec3 col = tone * (0.8 + 0.32 * fold.x) * (1.0 + grain);
  float h = slab + fold.y;

  // the outline of the logo, where the floor blends into the wall
  if (dLogo < AA) {
    float w = smoothstep(-AA, AA, dLogo);
    col = mix(floorCol, col, w);
    h = mix(-LOGO_DEPTH, h, w);
  }

  fragColor = vec4(col, (h + LOGO_DEPTH) / HEIGHT_SPAN);
}
