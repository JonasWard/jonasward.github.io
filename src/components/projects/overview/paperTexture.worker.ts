// Generates the cards' paper grain, off the main thread.
//
// This is a port of the paper() family from the landing page's fragment shader
// (src/components/landingMissing/shaders/paperTilesFragmentShader.glsl, the
// "paper" section) so the overview and the landing are made of the same stock.
// The shader composites it as `tone * (1.0 + paper(p))`, so the tile written
// here is the `1.0 + paper(p)` factor mapped to 0..255 and the card multiplies
// its base colour by it.
//
// It runs in a worker because paper() costs ~24 hash evaluations per pixel:
// at 256x256 that is ~1.6M hashes, measured at ~50ms on a desktop and well
// past 100ms on a mid-range phone — long enough to be worth keeping off the
// main thread entirely.

export type PaperTextureRequest = {
  size: number;
  /** css px of paper covered by one tile; smaller values magnify the grain */
  scale: number;
  /**
   * How much of the shader's modulation to keep. The landing applies it over a
   * mid tone (hsv value 0.66); the same swing over a near-white card reads far
   * stronger, so the cards take a fraction of it.
   */
  intensity: number;
};

export type PaperTextureResponse = {
  size: number;
  pixels: ArrayBuffer;
};

// Hash without Sine, David Hoskins, MIT (https://www.shadertoy.com/view/4djSRW)
const fract = (x: number) => x - Math.floor(x);

const hash12 = (x: number, y: number): number => {
  x *= 1.1213;
  y *= 1.1213;
  let p0 = fract(x * 0.1031);
  let p1 = fract(y * 0.1031);
  let p2 = fract(x * 0.1031);
  const d = p0 * (p1 + 33.33) + p1 * (p2 + 33.33) + p2 * (p0 + 33.33);
  p0 += d;
  p1 += d;
  p2 += d;
  return fract((p0 + p1) * p2);
};

const quintic = (f: number) => f * f * f * (f * (f * 6 - 15) + 10);

const mix = (a: number, b: number, t: number) => a + (b - a) * t;

const vnoise = (x: number, y: number): number => {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = quintic(x - ix);
  const fy = quintic(y - iy);
  const a = hash12(ix, iy);
  const b = hash12(ix + 1, iy);
  const c = hash12(ix, iy + 1);
  const d = hash12(ix + 1, iy + 1);
  return mix(mix(a, b, fx), mix(c, d, fx), fy);
};

/** value noise stretched along a direction: long thin fibres */
const fibres = (x: number, y: number, angle: number, len: number, thick: number): number => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return vnoise((c * x - s * y) / len, (s * x + c * y) / thick);
};

/** lightness of the paper at p (css px): fibres cut at grainAngle, cloudy formation, grain */
const paper = (x: number, y: number, grainAngle: number): number => {
  const f1 = fibres(x, y, 0.4 + grainAngle, 14.0, 1.8);
  const f2 = fibres(x + 31.7, y + 31.7, 1.9 + grainAngle, 20.0, 2.0);
  const f3 = fibres(x + 77.1, y + 77.1, -1.0 + grainAngle, 11.0, 1.7);
  const f4 = fibres(x + 5.3, y + 5.3, 2.6 + grainAngle, 26.0, 2.4);
  const fibre = (f1 + f2 + f3 + f4) * 0.25 - 0.5;
  const cloud = vnoise(x / 90.0, y / 90.0) - 0.5;
  const grain = vnoise(x * 0.7, y * 0.7) - 0.5;
  return 0.16 * fibre + 0.1 * cloud + 0.05 * grain;
};

// The fibre layers are sampled in rotated coordinates, so no choice of lattice
// period makes them wrap. Instead the field is blended with a copy of itself
// shifted by half a tile, so the seam of one copy always falls where the other
// carries all the weight. Doing it separately per axis keeps the two weights
// from vanishing together, which a product of 2d weights does at points like
// (0, size/2).
//
// The shifted copies are the base field read at wrapped indices, so all four
// samples come out of one size*size evaluation: the blend costs lookups, not
// hashes.

/** 0 at the tile's edges, 1 at its centre, smooth throughout */
const seamWeight = (u: number) => quintic(1 - Math.abs(2 * u - 1));

const render = ({ size, scale, intensity }: PaperTextureRequest): PaperTextureResponse => {
  const half = size >> 1;
  const grainAngle = 0.3;

  const base = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) base[y * size + x] = paper(x * scale, y * scale, grainAngle);
  }

  // per-axis blend weights, normalised once per row/column rather than per pixel
  const wa = new Float32Array(size);
  const wb = new Float32Array(size);
  for (let i = 0; i < size; i++) {
    const u = i / size;
    const a = seamWeight(u);
    const b = seamWeight(fract(u + 0.5));
    const sum = a + b;
    wa[i] = a / sum;
    wb[i] = b / sum;
  }

  const blended = new Float32Array(size * size);
  let brightest = -Infinity;
  for (let y = 0; y < size; y++) {
    const row = y * size;
    const rowShifted = ((y + half) % size) * size;

    for (let x = 0; x < size; x++) {
      const xShifted = (x + half) % size;

      // blend along x at this row and at the row half a tile away
      const alongX = base[row + x] * wa[x] + base[row + xShifted] * wb[x];
      const alongXShifted = base[rowShifted + x] * wa[x] + base[rowShifted + xShifted] * wb[x];

      // then blend those two along y
      const value = (alongX * wa[y] + alongXShifted * wb[y]) * intensity;
      blended[row + x] = value;
      if (value > brightest) brightest = value;
    }
  }

  // The shader's factor is `1.0 + paper(p)`, which can exceed 1 and brighten the
  // tone. A multiply layer cannot brighten, so the tile is normalised to put its
  // brightest paper at white: the relative structure survives instead of being
  // clipped flat, and the card's base colour is the colour of that brightest paper.
  const gain = 255 / (1 + brightest);

  const pixels = new Uint8ClampedArray(size * size * 4);
  for (let i = 0; i < blended.length; i++) {
    const value = (1 + blended[i]) * gain;
    const p = i * 4;
    pixels[p] = value;
    pixels[p + 1] = value;
    pixels[p + 2] = value;
    pixels[p + 3] = 255;
  }

  return { size, pixels: pixels.buffer };
};

self.onmessage = (event: MessageEvent<PaperTextureRequest>) => {
  const result = render(event.data);
  (self as unknown as Worker).postMessage(result, [result.pixels]);
};
