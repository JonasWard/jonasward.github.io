#version 300 es
precision highp float;

// The paper's texture, baked once into a tile the wall pass repeats.
//
// The paper is four layers of value noise stretched into fibres at different angles, a
// cloudy formation and a fine grain: 24 hashes per sample, and the wall pass needs a
// sample for every pixel and more near the edges. None of it moves, so it is rendered once
// here, into a square of PAPER_TILE css px at 2 texels per css px, and the wall pass reads
// it with the per-slab offset and rotation it used to put into the noise.
//
// To repeat without a seam every noise lattice is chosen so the tile's edge vectors are
// lattice vectors: the lattice is spanned by (PAPER_TILE / det M) * M for an integer matrix
// M, which always contains PAPER_TILE times the unit vectors, and the lattice points are
// hashed modulo the tile. M is rounded from the fibre's angle, length and thickness, so a
// fibre lattice comes out within a percent of the one the noise used to run on.

out vec4 fragColor;

const float PAPER_TILE = 512.0; // css px the tile spans, keep in step with the wall shader
const float PAPER_RANGE = 0.5;  // lightness spanned by the byte, likewise; 0.5 is flat paper

// Hash without Sine, David Hoskins, MIT (https://www.shadertoy.com/view/4djSRW)
float hash12(vec2 p) {
  p = p * 1.1213;
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// value noise on the lattice spanned by the columns of PAPER_TILE / det(M) * M, quintic
float vnoiseOn(vec2 p, mat2 M, float salt) {
  float det = determinant(M); // integer, so exact
  mat2 adj = mat2(M[1][1], -M[0][1], -M[1][0], M[0][0]);
  vec2 l = adj * p / PAPER_TILE; // lattice coordinates
  vec2 i = floor(l);
  vec2 f = fract(l);
  f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  // M * ij is the lattice point in tile units times det, and modulo det it wraps with the tile
  float a = hash12(mod(M * i, det) + salt);
  float b = hash12(mod(M * (i + vec2(1.0, 0.0)), det) + salt);
  float c = hash12(mod(M * (i + vec2(0.0, 1.0)), det) + salt);
  float d = hash12(mod(M * (i + vec2(1.0, 1.0)), det) + salt);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// the integer lattice closest to cells `len` along `angle` by `thick` across, that tiles
mat2 latticeFor(float angle, float len, float thick) {
  float scale = PAPER_TILE / (len * thick); // det / PAPER_TILE, for det = tile area / cell area
  vec2 along = vec2(cos(angle), sin(angle));
  return mat2(floor(scale * len * along + 0.5), floor(scale * thick * vec2(-along.y, along.x) + 0.5));
}

// value noise stretched along a direction: long thin fibres
float fibres(vec2 p, float angle, float len, float thick, float salt) {
  return vnoiseOn(p, latticeFor(angle, len, thick), salt);
}

// lightness of the paper at p (css px): fibres, cloudy formation, grain
float paper(vec2 p) {
  float f1 = fibres(p, 0.4, 14.0, 1.8, 31.7);
  float f2 = fibres(p, 1.9, 20.0, 2.0, 77.1);
  float f3 = fibres(p, -1.0, 11.0, 1.7, 5.3);
  float f4 = fibres(p, 2.6, 26.0, 2.4, 13.9);
  float fibre = (f1 + f2 + f3 + f4) * 0.25 - 0.5;
  float cloud = fibres(p, 0.0, 90.0, 90.0, 0.0) - 0.5;
  float grain = fibres(p, 0.0, 1.0 / 0.7, 1.0 / 0.7, 0.0) - 0.5;
  return 0.16 * fibre + 0.1 * cloud + 0.05 * grain;
}

void main(void) {
  // two texels per css px, texel centres
  vec2 p = gl_FragCoord.xy * 0.5;
  fragColor = vec4(vec3(0.5 + paper(p) / PAPER_RANGE), 1.0);
}
