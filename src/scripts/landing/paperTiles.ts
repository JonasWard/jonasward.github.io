import vsSource from './shaders/paperTilesVertexShader.glsl?raw';
import wallSource from './shaders/paperTilesWallShader.glsl?raw';
import shadeSource from './shaders/paperTilesShadeShader.glsl?raw';
import paperSource from './shaders/paperTilesPaperShader.glsl?raw';
import logoSdfUrl from 'src/assets/icons/jonasward_logo_sdf.png?inline'; // a data url, needed for the first frame

const DEFAULT_NEUTRAL_COLOR: [number, number, number] = [Math.floor(Math.random() * 360), 0.08, 0.66];
const DEFAULT_HUE_DELTA = 20;
const DEFAULT_SATURATION_DELTA = 0.04;
const DEFAULT_VALUE_DELTA = 0.12;
const PALETTE_SIZE = 32;
const PAPER_TEXELS = 1024; // the baked paper tile, 2 texels per css px, keep in step with its shader
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

// the wall is drawn at 60 fps where the gpu has the time, at 30 fps otherwise, so a slow gpu gets to idle
// between frames; it moves a few css px per second, so 30 still reads as smooth on a phone
const FAST_FRAME_MS = 1000 / 60;
const SLOW_FRAME_MS = 1000 / 30;
const FRAME_TOLERANCE_MS = 4; // so a display settles on every n-th frame instead of drifting between n and n + 1
const PIXEL_RATIO_STEPS = [1.5, 1.25, 1, 0.75]; // device px per css px
// phones start at one device px per css px: about half the pixels of 1.5, hardly visible at their density
const PHONE_PIXEL_RATIO_STEP = 2;

// with a gpu timer (EXT_disjoint_timer_query_webgl2, most desktop browsers) the frame rate and the resolution
// follow the gpu's time per frame, both ways, with hysteresis so neither flips back and forth
const GPU_WINDOW = 6; // samples judged together
const GPU_60FPS_BELOW_MS = 7; // switch to 60 fps when a frame takes less than this
const GPU_30FPS_ABOVE_MS = 11; // back to 30 fps above this
const GPU_STEP_DOWN_ABOVE_MS = 20; // even at 30 fps the frame is too heavy: fewer pixels
const GPU_STEP_UP_BELOW_MS = 5; // estimated time at the next resolution up, below this it steps up

// the time between drawn frames is always watched, timer or not (Safari and most phones have none, and some
// timers never return a usable result): the resolution steps down while it stays well above 30 fps. Only the timer
// steps it back up. The first second is skipped, loading and shader compiles look slow
const INTERVAL_WARMUP_MS = 1000;
const INTERVAL_WINDOW = 6;
const INTERVAL_SLOW_MS = 1.5 * SLOW_FRAME_MS;
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

/**
 * Starts rendering the paper tiles into the canvas. Returns a function that stops it and frees the GL resources.
 * `onFail` is called once, with the reason, when the wall can't be drawn: no WebGL2, a shader that doesn't compile,
 * a render target the GPU refuses, a lost context, or a first frame that comes out black.
 */
export type PaperTilesStats = {
  frameMs: number; // median time between drawn frames
  gpuMs: number | null; // median gpu time per frame, null without a gpu timer
  targetFps: number;
  pixelRatio: number;
  width: number;
  height: number;
};

export const startPaperTiles = (
  canvas: HTMLCanvasElement,
  onFail: (reason: string) => void = () => undefined,
  // called after every judged window of frames, for the ?debug overlay
  onStats?: (stats: PaperTilesStats) => void
): (() => void) => {
  let failed = false;
  const fail = (reason: string) => {
    if (failed) return;
    failed = true;
    onFail(reason);
  };

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
    fail('WebGL2 not supported');
    return () => undefined;
  }

  // two passes a frame: the wall (tiles, paper, logo cut, height) into a texture, then the
  // shadows over it; and once, before, the paper's texture into a tile the wall repeats
  const wallProgram = createProgram(gl, wallSource);
  const shadeProgram = createProgram(gl, shadeSource);
  const paperProgram = createProgram(gl, paperSource);
  if (!(wallProgram && shadeProgram && paperProgram)) {
    console.error('Could not initialize shaders');
    fail('a shader did not compile or link');
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
    'uLogoSpread',
    'uPaper'
  ] as const);
  const shade = uniformLocations(gl, shadeProgram, ['uWall', 'uWallSize', 'uOrigin', 'uResolution', 'uPixelRatio'] as const);

  // what never changes: the palette, and which texture unit each sampler reads
  gl.useProgram(wallProgram);
  gl.uniform3fv(wall.uPalette, palette);
  gl.uniform1i(wall.uLogo, 0);
  gl.uniform1i(wall.uPaper, 2);
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

  // the wall pass' target on unit 1, (re)sized in fit; filtered, so the shade pass' march
  // reads a heightfield that slides smoothly with the tiling
  const wallTexture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, wallTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  // the texture is attached in fit, once it has storage: Adreno drivers drop an attachment made while the texture
  // is still empty, which leaves the framebuffer incomplete (missing attachment)
  const wallFramebuffer = gl.createFramebuffer();

  // full screen quad on attribute location 0
  const quad = gl.createVertexArray();
  const quadBuffer = gl.createBuffer();
  gl.bindVertexArray(quad);
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  // the paper on unit 2: baked now, repeating, with mipmaps so it stays calm when the
  // wall is drawn at one device px per css px or less
  const paperTexture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D, paperTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  const paperFramebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, paperFramebuffer);
  // a single channel is all it needs; should a (mobile) driver not render into one, four
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, PAPER_TEXELS, PAPER_TEXELS, 0, gl.RED, gl.UNSIGNED_BYTE, null);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, paperTexture, 0);
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, PAPER_TEXELS, PAPER_TEXELS, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) fail(`the paper framebuffer is incomplete: ${status}`);
  }
  gl.viewport(0, 0, PAPER_TEXELS, PAPER_TEXELS);
  gl.useProgram(paperProgram);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.deleteFramebuffer(paperFramebuffer);
  gl.deleteProgram(paperProgram);

  let width = 0;
  let height = 0;
  let cssWidth = -1; // so the first fit always sizes the buffers, even when the canvas has no box yet
  let cssHeight = -1;
  let pixelRatio = 1;
  let pixelRatioStep = window.matchMedia?.('(pointer: coarse)').matches ? PHONE_PIXEL_RATIO_STEP : 0;
  let tileSize = TILE_CSS_PX_MIN;
  let margin = 0; // how far the wall texture runs on past the canvas on every side, device px
  let wallWidth = 0;
  let wallHeight = 0;

  // keeps the drawing buffer in step with the canvas' css box, which mobile browsers can
  // change after the first frame without a window resize; cheap when nothing changed
  const fit = () => {
    const nextPixelRatio = Math.min(Math.max(window.devicePixelRatio || 1, 1), PIXEL_RATIO_STEPS[pixelRatioStep]);
    const nextCssWidth = canvas.clientWidth || window.innerWidth || 1;
    const nextCssHeight = canvas.clientHeight || window.innerHeight || 1;
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
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, wallWidth, wallHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    // (re)attached after every resize, see where the framebuffer is created
    gl.bindFramebuffer(gl.FRAMEBUFFER, wallFramebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, wallTexture, 0);
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
      console.error('The wall framebuffer is incomplete:', status);
      fail(`the wall framebuffer is incomplete: ${status}`);
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
    const timing = !!timer && !query;
    if (timing) {
      query = gl.createQuery();
      gl.beginQuery(timer.TIME_ELAPSED_EXT, query!);
    }

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
    if (timing) gl.endQuery(timer.TIME_ELAPSED_EXT);
  };

  // gpu time per frame, one query in flight at a time; disjoint results (power state changes) are dropped
  const timer = gl.getExtension('EXT_disjoint_timer_query_webgl2');
  let query: WebGLQuery | null = null;
  const gpuSamples: number[] = [];
  const readQuery = () => {
    if (!timer || !query || !gl.getQueryParameter(query, gl.QUERY_RESULT_AVAILABLE)) return;
    if (!gl.getParameter(timer.GPU_DISJOINT_EXT)) gpuSamples.push(gl.getQueryParameter(query, gl.QUERY_RESULT) / 1e6);
    gl.deleteQuery(query);
    query = null;
  };

  let targetFrameMs = SLOW_FRAME_MS;
  let gpuMs: number | null = null;
  const median = (values: number[]) => [...values].sort((a, b) => a - b)[values.length >> 1];
  const stepTo = (step: number) => {
    pixelRatioStep = step;
    gpuSamples.length = 0; // the next window measures the new size
    drawIntervals.length = 0;
  };

  // with the timer: frame rate and resolution from the gpu's time per frame
  const judgeGpu = () => {
    if (gpuSamples.length < GPU_WINDOW) return;
    gpuMs = median(gpuSamples);
    gpuSamples.length = 0;
    if (gpuMs < GPU_60FPS_BELOW_MS) targetFrameMs = FAST_FRAME_MS;
    else if (gpuMs > GPU_30FPS_ABOVE_MS) targetFrameMs = SLOW_FRAME_MS;
    if (gpuMs > GPU_STEP_DOWN_ABOVE_MS && pixelRatioStep < PIXEL_RATIO_STEPS.length - 1) stepTo(pixelRatioStep + 1);
    else if (pixelRatioStep > 0) {
      // the cost scales with the pixel count; the device's own ratio caps how far up it is worth going
      const up = Math.min(PIXEL_RATIO_STEPS[pixelRatioStep - 1], Math.max(window.devicePixelRatio || 1, 1));
      if (up > pixelRatio && gpuMs * (up / pixelRatio) ** 2 < GPU_STEP_UP_BELOW_MS) stepTo(pixelRatioStep - 1);
    }
  };

  // without it: the resolution steps down while the drawn frames keep coming in slow
  const drawIntervals: number[] = [];
  const judgeIntervals = () => {
    if (drawIntervals.length < INTERVAL_WINDOW) return;
    const frameMs = median(drawIntervals);
    drawIntervals.length = 0;
    if (frameMs > INTERVAL_SLOW_MS && pixelRatioStep < PIXEL_RATIO_STEPS.length - 1) stepTo(pixelRatioStep + 1);
  };

  let lastDrawAt = -Infinity;
  const pace = (now: number) => {
    const interval = now - lastDrawAt;
    lastDrawAt = now;
    if (interval <= PACE_GAP_MS && now - startedAt > INTERVAL_WARMUP_MS) drawIntervals.push(interval);
    if (drawIntervals.length >= INTERVAL_WINDOW)
      onStats?.({ frameMs: median(drawIntervals), gpuMs, targetFps: Math.round(1000 / targetFrameMs), pixelRatio, width, height });
    if (timer) {
      readQuery();
      judgeGpu();
    }
    judgeIntervals();
  };

  // the wall is never black (its darkest tone is the shadowed floor), so a black first frame means the GPU
  // ran the passes but drew nothing, as some mobile drivers do instead of reporting an error
  let firstFrameChecked = false;
  const checkFirstFrame = () => {
    firstFrameChecked = true;
    const pixel = new Uint8Array(4);
    gl.readPixels(width >> 1, height >> 1, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
    if (pixel[0] + pixel[1] + pixel[2] === 0) fail(`the first frame is black (gl error ${gl.getError()})`);
  };

  const render = (now: number) => {
    if (stopped || failed) return;
    if (!reducedMotion) {
      frame = requestAnimationFrame(render);
      if (now - lastDrawAt < targetFrameMs - FRAME_TOLERANCE_MS) return;
      pace(now);
    }
    draw();
    if (!firstFrameChecked) checkFirstFrame();
  };

  const onResize = () => {
    if (reducedMotion && logoReady) frame = requestAnimationFrame(render);
  };
  window.addEventListener('resize', onResize);
  const onContextLost = () => fail('the WebGL context was lost');
  canvas.addEventListener('webglcontextlost', onContextLost);
  const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(onResize);
  observer?.observe(canvas);

  return () => {
    stopped = true;
    window.clearTimeout(startFallback);
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', onResize);
    canvas.removeEventListener('webglcontextlost', onContextLost);
    observer?.disconnect();
    gl.deleteBuffer(quadBuffer);
    gl.deleteVertexArray(quad);
    gl.deleteFramebuffer(wallFramebuffer);
    gl.deleteProgram(wallProgram);
    gl.deleteProgram(shadeProgram);
    gl.deleteTexture(logoTexture);
    gl.deleteTexture(wallTexture);
    gl.deleteTexture(paperTexture);
    if (query) gl.deleteQuery(query);
  };
};
