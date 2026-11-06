// the 404 background, components/landingMissing/Missing.tsx without react
import vsSource from 'src/scripts/missing/missingVertexShader.glsl?raw';
import fsSource from 'src/scripts/missing/missingFragmentShader.glsl?raw';

const loadShader = (gl: WebGL2RenderingContext, type: GLenum, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  console.warn('could not compile the 404 shader:', gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
};

export const startMissing = (canvas: HTMLCanvasElement) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const gl = canvas.getContext('webgl2');
  if (!gl) return;
  gl.clearColor(0.9, 0.3, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const vs = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  if (!(vs && fs && program)) return;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

  const uTime = gl.getUniformLocation(program, 'uTime');
  const uCenter = gl.getUniformLocation(program, 'uCenter');
  const uInverseResolution = gl.getUniformLocation(program, 'uInverseResolution');
  const uProportion = gl.getUniformLocation(program, 'uProportion');

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'aVertexPosition');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const render = () => {
    const time = (0.75 + 0.5 * Math.sin(Date.now() * 0.00005)) * 100000;
    const localTime = time * 0.0005 * (100 / window.innerWidth) ** 0.5;
    const proportion = ((canvas.height / canvas.width) * window.innerWidth) / window.innerHeight;
    const sizeMultiplier = window.innerWidth * 0.2;
    // time based lissajous figures
    const a = Math.sin(localTime * 0.01) * 5.0;
    const b = Math.cos(localTime * 0.01) * 5.0;
    const t = localTime * 0.2;
    const delta = Math.cos(localTime * 0.05);
    const x = window.innerWidth * 1.5 + sizeMultiplier * Math.sin(a * t * 2.0 + delta);
    const y = window.innerHeight * 1.5 + sizeMultiplier * proportion * Math.sin(b * t * 2.0);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniform1f(uTime, localTime * 10.0);
    gl.uniform2f(uCenter, x, y);
    gl.uniform2f(uInverseResolution, 1 / window.innerWidth, 1 / window.innerHeight);
    gl.uniform1f(uProportion, proportion);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};
