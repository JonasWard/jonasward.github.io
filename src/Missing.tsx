import { useEffect, useRef } from 'react';
import logo from './assets/icons/jonasward_logo_ww.svg';
import { useNavigate } from 'react-router-dom';

const vsSource = `
    attribute vec4 aVertexPosition;
    void main(void) {
        gl_Position = aVertexPosition;
    }
`;

const fsSource = `
    precision mediump float;
    uniform float uTime;
    uniform vec2 uCenter;
    uniform vec2 uInverseResolution;
    uniform float uProportion;
    const float amplitude = 100.0;
    void main(void) {
        vec2 uv = (vec2(gl_FragCoord.xy) * vec2(uProportion, 1.0) - uCenter );
        float angle = atan(uv.y, uv.x);
        float radius = length(uv);
        radius = radius / amplitude + (angle + uTime) / 6.2831;
        vec3 color = vec3(0.5 + 0.5 * sin(6.2831 * radius - 1.0), 0.5 + 0.5 * sin(6.2831 * radius), 0.5 + 0.5 * sin(6.2831 * radius + 1.0));
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

    const render = (time: number) => {
      const localTime = time * 0.0005;
      const proportion = (window.innerWidth * 0.5) / window.innerHeight;

      const sizeMultiplier = window.innerWidth * 0.25 * 0.25;

      // time based lisajoue figures
      const a = (Math.sin(localTime * 0.01) + 1.5) * 5.0;
      const b = (Math.cos(localTime * 0.01) + 1.5) * 5.0;
      const t = localTime * 0.02;
      const delta = Math.cos(localTime * 0.05);

      const x = sizeMultiplier * (Math.sin(a * t * 2.0 + delta) + 1.5);
      const y = sizeMultiplier * (Math.sin(b * t * 2.0) + 1.5);

      // const x = sizeMultiplier * 0.5;
      // const y = sizeMultiplier * 0.5;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(shaderProgram);
      gl.uniform1f(timeUniformLocation, localTime * 2.0); // Convert time to seconds
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
    <div style={{ width: '100svw', height: '100svh', overflow: 'hidden' }}>
      <canvas style={{ position: 'fixed', width: '100svw', height: '100svh', overflow: 'hidden' }} ref={canvasRef} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          textAlign: 'center',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          gap: 20,
        }}
      >
        <span>You must have taken a wrong turn</span>
        <span>why don't you go back to the projects page</span>
        <img style={{ cursor: 'pointer' }} src={logo} alt={'missing logo'} onClick={goToProjects} />
      </div>
    </div>
  );
};

export default Missing;
