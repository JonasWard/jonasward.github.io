import vsSource from './shaders/paperTilesVertexShader.glsl?raw';
import fsSource from './shaders/paperTilesFragmentShader.glsl?raw';

// Renders the cement tiling full screen in one pass.

export type PaperTilesOptions = {
  /** tone every slab varies around: hue in degrees, saturation and value in 0..1 */
  neutralColor?: [number, number, number];
  /** largest deviation of a slab's hue from the neutral one, degrees */
  hueDelta?: number;
  /** largest deviation of a slab's saturation, 0..1 */
  saturationDelta?: number;
  /** largest deviation of a slab's value, 0..1 */
  valueDelta?: number;
};

const DEFAULT_NEUTRAL_COLOR: [number, number, number] = [132, 0.08, 0.71];
const DEFAULT_HUE_DELTA = 6;
const DEFAULT_SATURATION_DELTA = 0.08;
const DEFAULT_VALUE_DELTA = 0.12;
const PALETTE_SIZE = 32;

const hsvToRgb = (h: number, s: number, v: number): [number, number, number] => {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return [f(5), f(3), f(1)];
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/** the slab tones: evenly spread deviations from the neutral colour, shuffled so neighbours in the array differ */
const buildPalette = (options: PaperTilesOptions) => {
  const [h, s, v] = options.neutralColor ?? DEFAULT_NEUTRAL_COLOR;
  const dh = options.hueDelta ?? DEFAULT_HUE_DELTA;
  const ds = options.saturationDelta ?? DEFAULT_SATURATION_DELTA;
  const dv = options.valueDelta ?? DEFAULT_VALUE_DELTA;
  const palette = new Float32Array(PALETTE_SIZE * 3);
  for (let i = 0; i < PALETTE_SIZE; i++) {
    // three low-discrepancy sequences so hue, saturation and value vary independently
    const th = ((i + 0.5) / PALETTE_SIZE) * 2 - 1;
    const ts = (((i * 11) % PALETTE_SIZE) / (PALETTE_SIZE - 1)) * 2 - 1;
    const tv = (((i * 7) % PALETTE_SIZE) / (PALETTE_SIZE - 1)) * 2 - 1;
    const rgb = hsvToRgb((h + th * dh + 360) % 360, clamp(s + ts * ds, 0, 1), clamp(v + tv * dv, 0, 1));
    palette.set(rgb, i * 3);
  }
  return { palette, joint: hsvToRgb(h, s * 0.8, v * 0.5) };
};

const MAX_PIXEL_RATIO = 1.5;
const TILE_CSS_PX_MIN = 84;
const TILE_CSS_PX_MAX = 200;
const TILES_ACROSS_LONG_EDGE = 9;

const compileShader = (gl: WebGL2RenderingContext, type: GLenum, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (gl: WebGL2RenderingContext) => {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  if (!(vertexShader && fragmentShader && program)) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.bindAttribLocation(program, 0, 'aPosition');
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
};

/** Starts rendering the paper tiles into the canvas. Returns a function that stops it and frees the GL resources. */
export const startPaperTiles = (canvas: HTMLCanvasElement, options: PaperTilesOptions = {}): (() => void) => {
  const { palette, joint } = buildPalette(options);

  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance'
  });
  if (!gl) {
    console.error('WebGL2 not supported');
    return () => undefined;
  }

  const program = createProgram(gl);
  if (!program) {
    console.error('Could not initialize shaders');
    return () => undefined;
  }

  const uniforms = {
    resolution: gl.getUniformLocation(program, 'uResolution'),
    time: gl.getUniformLocation(program, 'uTime'),
    tileSize: gl.getUniformLocation(program, 'uTileSize'),
    pixelRatio: gl.getUniformLocation(program, 'uPixelRatio'),
    palette: gl.getUniformLocation(program, 'uPalette'),
    jointColor: gl.getUniformLocation(program, 'uJointColor')
  };

  // full screen quad on attribute location 0
  const quad = gl.createVertexArray();
  const quadBuffer = gl.createBuffer();
  gl.bindVertexArray(quad);
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let tileSize = TILE_CSS_PX_MIN;
  let needsResize = true;

  const resize = () => {
    needsResize = false;
    pixelRatio = clamp(window.devicePixelRatio || 1, 1, MAX_PIXEL_RATIO);
    const cssWidth = canvas.clientWidth || window.innerWidth;
    const cssHeight = canvas.clientHeight || window.innerHeight;
    tileSize =
      clamp(Math.max(cssWidth, cssHeight) / TILES_ACROSS_LONG_EDGE, TILE_CSS_PX_MIN, TILE_CSS_PX_MAX) * pixelRatio;
    width = Math.max(1, Math.round(cssWidth * pixelRatio));
    height = Math.max(1, Math.round(cssHeight * pixelRatio));
    canvas.width = width;
    canvas.height = height;
  };

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  // every visit starts somewhere else along the animation
  const timeOffset = Math.random() * 1000;
  const startedAt = performance.now();
  const currentTime = () => (reducedMotion ? timeOffset : timeOffset + (performance.now() - startedAt) / 1000);

  let frame = 0;
  let stopped = false;

  const render = () => {
    if (stopped) return;
    if (needsResize) resize();

    gl.viewport(0, 0, width, height);
    gl.useProgram(program);
    gl.bindVertexArray(quad);
    gl.uniform2f(uniforms.resolution, width, height);
    gl.uniform1f(uniforms.time, currentTime());
    gl.uniform1f(uniforms.tileSize, tileSize);
    gl.uniform1f(uniforms.pixelRatio, pixelRatio);
    gl.uniform3fv(uniforms.palette, palette);
    gl.uniform3f(uniforms.jointColor, joint[0], joint[1], joint[2]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (!reducedMotion) frame = requestAnimationFrame(render);
  };

  const onResize = () => {
    needsResize = true;
    if (reducedMotion) frame = requestAnimationFrame(render);
  };
  window.addEventListener('resize', onResize);
  frame = requestAnimationFrame(render);

  return () => {
    stopped = true;
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', onResize);
    gl.deleteBuffer(quadBuffer);
    gl.deleteVertexArray(quad);
    gl.deleteProgram(program);
  };
};
