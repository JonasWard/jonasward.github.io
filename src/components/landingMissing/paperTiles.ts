import vsSource from './shaders/paperTilesVertexShader.glsl?raw';
import fsSource from './shaders/paperTilesFragmentShader.glsl?raw';

// Renders the cement tiling full screen in one pass.

export type PaperTilesOptions = {
  /** tone every slab varies around, rgb in 0..1 */
  neutralColor?: [number, number, number];
  /** largest deviation of a slab's tone from the neutral colour, per channel, 0..1 */
  toneVariation?: number;
};

const DEFAULT_NEUTRAL_COLOR: [number, number, number] = [0.66, 0.71, 0.67];
const DEFAULT_TONE_VARIATION = 0.03;

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

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/** Starts rendering the paper tiles into the canvas. Returns a function that stops it and frees the GL resources. */
export const startPaperTiles = (canvas: HTMLCanvasElement, options: PaperTilesOptions = {}): (() => void) => {
  const neutralColor = options.neutralColor ?? DEFAULT_NEUTRAL_COLOR;
  const toneVariation = options.toneVariation ?? DEFAULT_TONE_VARIATION;

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
    neutralColor: gl.getUniformLocation(program, 'uNeutralColor'),
    toneVariation: gl.getUniformLocation(program, 'uToneVariation')
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
    gl.uniform3f(uniforms.neutralColor, neutralColor[0], neutralColor[1], neutralColor[2]);
    gl.uniform1f(uniforms.toneVariation, toneVariation);
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
