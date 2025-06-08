import { useEffect, useRef } from 'react';
import logo from 'src/assets/icons/jonasward_logo_ww.svg';
import { useNavigate } from 'react-router-dom';
import './missing.css';
import vsSource from './shaders/landingVertexShader.glsl?raw';
import fsSource from './shaders/landingFragmentShader.glsl?raw';

const loadShader = (gl: WebGLRenderingContext, type: GLenum, source: string) => {
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

const initShader = (gl: WebGLRenderingContext) => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  if (!(vertexShader && fragmentShader && shaderProgram)) return null;

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program:', gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
};
const Landing = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const goToProjects = () => {
    navigate('/projects');
  };

  const initWebGL = (canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gl = canvas.getContext('webgl2');
    if (!gl) {
      console.error('WebGL2 not supported');
      return;
    }

    gl.clearColor(0.9, 0.3, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const shaderProgram = initShader(gl);
    if (!shaderProgram) {
      console.log('Could not initialize shaders');
      return;
    }

    const timeUniformLocation = gl.getUniformLocation(shaderProgram, 'uTime');
    const centerUniformLocation = gl.getUniformLocation(shaderProgram, 'uCenter');
    const resolution = gl.getUniformLocation(shaderProgram, 'uInverseResolution');
    const uProportion = gl.getUniformLocation(shaderProgram, 'uProportion');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const render = () => {
      const time = 35 + Math.sin(Date.now() * 0.00005) * 25;
      const localTime = time * (100 / window.innerWidth) ** 0.5;
      const proportion = ((canvas.height / canvas.width) * window.innerWidth) / window.innerHeight;

      const sizeMultiplier = window.innerWidth * 0.2;

      // time based lisajoue figures
      const a = Math.sin(localTime * 0.01) * 5.0;
      const b = Math.cos(localTime * 0.01) * 5.0;
      const t = localTime * 0.2;
      const delta = Math.cos(localTime * 0.05);

      const x = window.innerWidth * 0.5 + sizeMultiplier * Math.sin(a * t * 2.0 + delta);
      const y = window.innerHeight * 0.5 + sizeMultiplier * proportion * Math.sin(b * t * 2.0);

      // const x = window.innerWidth * 0.5;
      // const y = window.innerHeight * 0.5;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(shaderProgram);
      gl.uniform1f(timeUniformLocation, localTime * 10.0); // Convert time to seconds
      gl.uniform2f(centerUniformLocation, x, y);
      gl.uniform2f(resolution, 1 / window.innerWidth, 1 / window.innerHeight);
      gl.uniform1f(uProportion, proportion);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [-1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(vertexPosition);
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(shaderProgram);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  useEffect(() => {
    if (canvasRef.current) initWebGL(canvasRef.current);
  }, []);

  return (
    <div className="missing-page" onClick={goToProjects}>
      <canvas className="missing-page canvas" ref={canvasRef} />
      <div className="missing-link">
        <img
          style={{ maxWidth: '100%', maxHeight: '100%', height: '800px', width: '894.5px' }}
          src={logo}
          alt={'missing logo'}
        />
      </div>
    </div>
  );
};

export default Landing;
