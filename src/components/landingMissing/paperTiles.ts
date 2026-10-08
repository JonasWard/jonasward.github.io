import vsSource from './shaders/paperTilesVertexShader.glsl?raw';
import wallSource from './shaders/paperTilesWallShader.glsl?raw';
import shadeSource from './shaders/paperTilesShadeShader.glsl?raw';
import logoSdfUrl from 'src/assets/icons/jonasward_logo_sdf.png'; // inlined as a data url, see vite.config.ts

const DEFAULT_NEUTRAL_COLOR: [number, number, number] = [Math.floor(Math.random() * 360), 0.08, 0.66];
const DEFAULT_HUE_DELTA = 20;
const DEFAULT_SATURATION_DELTA = 0.04;
const DEFAULT_VALUE_DELTA = 0.12;
const PALETTE_SIZE = 32;
const LOGO_SDF_SPREAD = 48; // px of the distance field texture on each side of the outline
const LOGO_CSS_WIDTH_MAX = 894.5;
const LOGO_VIEWPORT_FRACTION = 0.8;

const hsvToRgb = (h: number, s: number, v: number): [number, number, number] => {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return [f(5), f(3), f(1)];
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/** the slab tones: evenly spread deviations from the neutral colour, shuffled so neighbours in the array differ */
const buildPalette = () => {
  const [h, s, v] = DEFAULT_NEUTRAL_COLOR;
  const dh = DEFAULT_HUE_DELTA;
  const ds = DEFAULT_SATURATION_DELTA;
  const dv = DEFAULT_VALUE_DELTA;
  const palette = new Float32Array(PALETTE_SIZE * 3);
  for (let i = 0; i < PALETTE_SIZE; i++) {
    // three low-discrepancy sequences so hue, saturation and value vary independently
    const th = ((i + 0.5) / PALETTE_SIZE) * 2 - 1;
    const ts = (((i * 11) % PALETTE_SIZE) / (PALETTE_SIZE - 1)) * 2 - 1;
    const tv = (((i * 7) % PALETTE_SIZE) / (PALETTE_SIZE - 1)) * 2 - 1;
    const rgb = hsvToRgb((h + th * dh + 360) % 360, clamp(s + ts * ds, 0, 1), clamp(v + tv * dv, 0, 1));
    palette.set(rgb, i * 3);
  }

  return palette;
};

const TILE_CSS_PX_MIN = 84;
const TILE_CSS_PX_MAX = 200;
const TILES_ACROSS_LONG_EDGE = 9;
const SHADOW_REACH_CSS_PX = 16; // how far the shade pass marches, keep in step with SHADOW_REACH in its shader

// the wall is drawn at most this often; it moves a few css px per second, so nothing is lost,
// and the gpu gets to idle between frames
const TARGET_FRAME_MS = 1000 / 30;
const FRAME_TOLERANCE_MS = 4; // so a 60 Hz display settles on every other frame instead of every third
// when drawn frames still come in slower than this, the drawing buffer is scaled down a step
const SLOW_FRAME_MS = 1.5 * TARGET_FRAME_MS;
const PIXEL_RATIO_STEPS = [1.5, 1.25, 1, 0.75]; // device px per css px, the cap only ever steps down
const PACE_WARMUP_DRAWS = 10; // frames ignored after a start or a step, while everything settles
const PACE_WINDOW = 12; // frames judged together
const PACE_GAP_MS = 500; // longer gaps are the tab being hidden, not the gpu being slow

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

const createProgram = (gl: WebGL2RenderingContext, fsSource: string) => {
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

const uniformLocations = <T extends string>(gl: WebGL2RenderingContext, program: WebGLProgram, names: readonly T[]) =>
  Object.fromEntries(names.map((name) => [name, gl.getUniformLocation(program, name)])) as Record<
    T,
    WebGLUniformLocation | null
  >;

/** Starts rendering the paper tiles into the canvas. Returns a function that stops it and frees the GL resources. */
export const startPaperTiles = (canvas: HTMLCanvasElement): (() => void) => {
  const palette = buildPalette();
  document.body.style.background = `rgb(${palette[0] * 255}, ${palette[1] * 255}, ${palette[2] * 255})`;

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

  // two passes: the wall (tiles, paper, logo cut, height) into a texture, then the shadows over it
  const wallProgram = createProgram(gl, wallSource);
  const shadeProgram = createProgram(gl, shadeSource);
  if (!(wallProgram && shadeProgram)) {
    console.error('Could not initialize shaders');
    return () => undefined;
  }
  const wall = uniformLocations(gl, wallProgram, [
    'uResolution',
    'uOrigin',
    'uTime',
    'uTileSize',
    'uPixelRatio',
    'uPalette',
    'uLogo',
    'uLogoRect',
    'uLogoSpread'
  ] as const);
  const shade = uniformLocations(gl, shadeProgram, ['uWall', 'uWallSize', 'uOrigin', 'uResolution', 'uPixelRatio'] as const);

  // what never changes: the palette, and which texture unit each sampler reads
  gl.useProgram(wallProgram);
  gl.uniform3fv(wall.uPalette, palette);
  gl.uniform1i(wall.uLogo, 0);
  gl.useProgram(shadeProgram);
  gl.uniform1i(shade.uWall, 1);

  // the logo's distance field on unit 0; a single "far outside" texel until the image arrives
  const logoTexture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, logoTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, 1, 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, new Uint8Array([255]));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  let logoAspect = 1024 / 264;
  let logoTextureWidth = 1;

  // the wall pass' target on unit 1, (re)sized in fit; unfiltered, so the shade pass' march
  // sees the slabs' edges as the steps they are instead of one texel wide ramps
  const wallTexture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, wallTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const wallFramebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, wallFramebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, wallTexture, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

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
  let cssWidth = 0;
  let cssHeight = 0;
  let pixelRatio = 1;
  let pixelRatioStep = 0;
  let tileSize = TILE_CSS_PX_MIN;
  let margin = 0; // how far the wall texture runs on past the canvas on every side, device px
  let wallWidth = 0;
  let wallHeight = 0;
  let wallChecked = false;

  // keeps the drawing buffer in step with the canvas' css box, which mobile browsers can
  // change after the first frame without a window resize; cheap when nothing changed
  const fit = () => {
    const nextPixelRatio = Math.min(Math.max(window.devicePixelRatio || 1, 1), PIXEL_RATIO_STEPS[pixelRatioStep]);
    const nextCssWidth = canvas.clientWidth || window.innerWidth;
    const nextCssHeight = canvas.clientHeight || window.innerHeight;
    if (nextCssWidth === cssWidth && nextCssHeight === cssHeight && nextPixelRatio === pixelRatio) return;
    cssWidth = nextCssWidth;
    cssHeight = nextCssHeight;
    pixelRatio = nextPixelRatio;
    // sized after the viewport, the canvas can run on underneath the browser's bars
    const longEdge = Math.max(cssWidth, Math.min(cssHeight, window.innerHeight));
    tileSize = clamp(longEdge / TILES_ACROSS_LONG_EDGE, TILE_CSS_PX_MIN, TILE_CSS_PX_MAX) * pixelRatio;
    width = Math.max(1, Math.round(cssWidth * pixelRatio));
    height = Math.max(1, Math.round(cssHeight * pixelRatio));
    canvas.width = width;
    canvas.height = height;

    margin = Math.ceil(SHADOW_REACH_CSS_PX * pixelRatio) + 2;
    wallWidth = width + 2 * margin;
    wallHeight = height + 2 * margin;
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, wallTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, wallWidth, wallHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    if (!wallChecked) {
      wallChecked = true;
      gl.bindFramebuffer(gl.FRAMEBUFFER, wallFramebuffer);
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      if (status !== gl.FRAMEBUFFER_COMPLETE) console.error('The wall framebuffer is incomplete:', status);
    }
  };

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  // every visit starts somewhere else along the animation
  const timeOffset = Math.random() * 1000;
  const startedAt = performance.now();
  const currentTime = () => (reducedMotion ? timeOffset : timeOffset + (performance.now() - startedAt) / 1000);

  let frame = 0;
  let stopped = false;

  // the field is inlined in the bundle, so it decodes at once; the first frame waits for it
  // (with a fallback so a decode failure still shows the wall)
  let logoReady = false;
  const start = () => {
    if (stopped || logoReady) return;
    logoReady = true;
    frame = requestAnimationFrame(render);
  };
  const logoImage = new Image();
  logoImage.onload = () => {
    if (stopped) return;
    logoAspect = logoImage.naturalWidth / logoImage.naturalHeight;
    logoTextureWidth = logoImage.naturalWidth;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, logoTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE, logoImage);
    if (reducedMotion && logoReady) frame = requestAnimationFrame(render);
    start();
  };
  logoImage.onerror = start;
  logoImage.src = logoSdfUrl;
  const startFallback = window.setTimeout(start, 1500);

  const draw = () => {
    fit();
    gl.bindVertexArray(quad);

    // the wall, into its texture
    gl.bindFramebuffer(gl.FRAMEBUFFER, wallFramebuffer);
    gl.viewport(0, 0, wallWidth, wallHeight);
    gl.useProgram(wallProgram);
    gl.uniform2f(wall.uResolution, width, height);
    gl.uniform2f(wall.uOrigin, margin, margin);
    gl.uniform1f(wall.uTime, currentTime());
    gl.uniform1f(wall.uTileSize, tileSize);
    gl.uniform1f(wall.uPixelRatio, pixelRatio);
    const logoWidth = Math.min(LOGO_CSS_WIDTH_MAX, (LOGO_VIEWPORT_FRACTION * width) / pixelRatio) * pixelRatio;
    gl.uniform4f(wall.uLogoRect, 0.5 * width, 0.5 * height, logoWidth, logoWidth / logoAspect);
    gl.uniform1f(wall.uLogoSpread, (LOGO_SDF_SPREAD * logoWidth) / logoTextureWidth);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // the shadows over it, onto the canvas
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, width, height);
    gl.useProgram(shadeProgram);
    gl.uniform2f(shade.uWallSize, wallWidth, wallHeight);
    gl.uniform2f(shade.uOrigin, margin, margin);
    gl.uniform2f(shade.uResolution, width, height);
    gl.uniform1f(shade.uPixelRatio, pixelRatio);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  // paces the animated frames and, when the drawn frames keep coming in slow, scales the
  // drawing buffer down a step. Only ever down, so it cannot oscillate
  let lastDrawAt = -Infinity;
  let drawsSinceStep = 0;
  const drawIntervals: number[] = [];
  const pace = (now: number) => {
    const interval = now - lastDrawAt;
    lastDrawAt = now;
    drawsSinceStep++;
    if (drawsSinceStep <= PACE_WARMUP_DRAWS || interval > PACE_GAP_MS) return;
    drawIntervals.push(interval);
    if (drawIntervals.length < PACE_WINDOW) return;
    const sorted = [...drawIntervals].sort((a, b) => a - b);
    drawIntervals.length = 0;
    if (sorted[PACE_WINDOW >> 1] > SLOW_FRAME_MS && pixelRatioStep < PIXEL_RATIO_STEPS.length - 1) {
      pixelRatioStep++;
      drawsSinceStep = 0;
    }
  };

  const render = (now: number) => {
    if (stopped) return;
    if (!reducedMotion) {
      frame = requestAnimationFrame(render);
      if (now - lastDrawAt < TARGET_FRAME_MS - FRAME_TOLERANCE_MS) return;
      pace(now);
    }
    draw();
  };

  const onResize = () => {
    if (reducedMotion && logoReady) frame = requestAnimationFrame(render);
  };
  window.addEventListener('resize', onResize);
  const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(onResize);
  observer?.observe(canvas);

  return () => {
    stopped = true;
    window.clearTimeout(startFallback);
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', onResize);
    observer?.disconnect();
    gl.deleteBuffer(quadBuffer);
    gl.deleteVertexArray(quad);
    gl.deleteFramebuffer(wallFramebuffer);
    gl.deleteProgram(wallProgram);
    gl.deleteProgram(shadeProgram);
    gl.deleteTexture(logoTexture);
    gl.deleteTexture(wallTexture);
  };
};
