import vsSource from './shaders/paperTilesVertexShader.glsl?raw';
import tilesFsSource from './shaders/paperTilesFragmentShader.glsl?raw';
import fiberFsSource from './shaders/paperFiberFragmentShader.glsl?raw';

// Two passes: the folded-paper tiles are rendered into a texture, then drawn to the
// screen through the fibre filter that turns the render into paper.

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

const createProgram = (gl: WebGL2RenderingContext, fragmentSource: string) => {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
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
export const startPaperTiles = (canvas: HTMLCanvasElement): (() => void) => {
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

  const tilesProgram = createProgram(gl, tilesFsSource);
  const fiberProgram = createProgram(gl, fiberFsSource);
  if (!(tilesProgram && fiberProgram)) {
    console.error('Could not initialize shaders');
    return () => undefined;
  }

  const tilesUniforms = {
    resolution: gl.getUniformLocation(tilesProgram, 'uResolution'),
    time: gl.getUniformLocation(tilesProgram, 'uTime'),
    tileSize: gl.getUniformLocation(tilesProgram, 'uTileSize')
  };
  const fiberUniforms = {
    resolution: gl.getUniformLocation(fiberProgram, 'uResolution'),
    pixelRatio: gl.getUniformLocation(fiberProgram, 'uPixelRatio'),
    scene: gl.getUniformLocation(fiberProgram, 'uScene')
  };

  // full screen quad, shared by both passes through attribute location 0
  const quad = gl.createVertexArray();
  const quadBuffer = gl.createBuffer();
  gl.bindVertexArray(quad);
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  // the tiles pass renders into this texture, the fibre pass reads it
  const sceneTexture = gl.createTexture();
  const sceneFramebuffer = gl.createFramebuffer();
  gl.bindTexture(gl.TEXTURE_2D, sceneTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

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

    const nextWidth = Math.max(1, Math.round(cssWidth * pixelRatio));
    const nextHeight = Math.max(1, Math.round(cssHeight * pixelRatio));
    if (nextWidth === width && nextHeight === height) return;
    width = nextWidth;
    height = nextHeight;
    canvas.width = width;
    canvas.height = height;

    gl.bindTexture(gl.TEXTURE_2D, sceneTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, sceneFramebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, sceneTexture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
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
    gl.bindVertexArray(quad);

    gl.bindFramebuffer(gl.FRAMEBUFFER, sceneFramebuffer);
    gl.viewport(0, 0, width, height);
    gl.useProgram(tilesProgram);
    gl.uniform2f(tilesUniforms.resolution, width, height);
    gl.uniform1f(tilesUniforms.time, currentTime());
    gl.uniform1f(tilesUniforms.tileSize, tileSize);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, width, height);
    gl.useProgram(fiberProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sceneTexture);
    gl.uniform1i(fiberUniforms.scene, 0);
    gl.uniform2f(fiberUniforms.resolution, width, height);
    gl.uniform1f(fiberUniforms.pixelRatio, pixelRatio);
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
    gl.deleteFramebuffer(sceneFramebuffer);
    gl.deleteTexture(sceneTexture);
    gl.deleteBuffer(quadBuffer);
    gl.deleteVertexArray(quad);
    gl.deleteProgram(tilesProgram);
    gl.deleteProgram(fiberProgram);
  };
};
