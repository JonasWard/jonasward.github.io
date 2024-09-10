import { useEffect, useRef } from 'react';
import logo from 'src/assets/icons/jonasward_logo_ww.svg';
import { useNavigate } from 'react-router-dom';
import './missing.css';

const vsSource = `
    attribute vec4 aVertexPosition;
    void main(void) {
        gl_Position = aVertexPosition;
    }
`;

const fsSource = `
#define TAU                         6.2831853071795862
    precision mediump float;
    uniform float uTime;
    uniform vec2 uCenter;
    uniform vec2 uInverseResolution;
    uniform float uProportion;
    const float amplitude = 100.0;

    void main(void) {
        vec2 uv = (vec2(gl_FragCoord.xy) * vec2(uProportion, 1.0) - uCenter );
        float angle = atan(uv.y, uv.x);
        float radius = length(uv) * 0.1;
        radius = radius / amplitude + (angle + uTime) / TAU;
        vec3 color = vec3(0.5 + 0.5 * sin(TAU * radius - 1.0), 0.5 + 0.5 * sin(TAU * radius), 0.5 + 0.5 * sin(TAU * radius + 1.0));
        gl_FragColor = vec4(color, 1.0);
    }
`;

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
const Missing = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const goToProjects = () => {
    navigate('/projects');
  };

  const initWebGL = (canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
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
      const time = (0.75 + 0.5 * Math.sin(Date.now() * 0.00005)) * 100000;
      const localTime = time * 0.0005 * (100 / window.innerWidth) ** 0.5;
      const proportion = ((canvas.height / canvas.width) * window.innerWidth) / window.innerHeight;

      const sizeMultiplier = window.innerWidth * 0.2;

      // time based lisajoue figures
      const a = Math.sin(localTime * 0.01) * 5.0;
      const b = Math.cos(localTime * 0.01) * 5.0;
      const t = localTime * 0.2;
      const delta = Math.cos(localTime * 0.05);

      const x = window.innerWidth * 1.5 + sizeMultiplier * Math.sin(a * t * 2.0 + delta);
      const y = window.innerHeight * 1.5 + sizeMultiplier * proportion * Math.sin(b * t * 2.0);

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
    <div className='missing-page'>
      <canvas className='missing-page canvas' ref={canvasRef} />
      <div className='missing-link' onClick={goToProjects}>
        <span>You must have taken a wrong turn</span>
        <span>why don't you go back to the projects page</span>
        <img src={logo} alt={'missing logo'} />
      </div>
    </div>
  );
};

export default Missing;
