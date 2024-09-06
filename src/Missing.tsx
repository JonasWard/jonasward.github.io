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
    void main(void) {
        vec2 uv = gl_FragCoord.xy / vec2(800.0, 600.0); // Adjust to your canvas size
        uv = uv * 2.0 - 1.0;
        float angle = atan(uv.y, uv.x);
        float radius = length(uv);
        float spiral = sin(10.0 * radius - uTime * 5.0);
        vec3 color = vec3(0.5 + 0.5 * sin(6.2831 * spiral - 1.0), 0.5 + 0.5 * sin(6.2831 * spiral), 0.5 + 0.5 * sin(6.2831 * spiral + 1.0));
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

    const render = (time: number) => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(shaderProgram);
      gl.uniform1f(timeUniformLocation, time * 0.0001); // Convert time to seconds
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
      <canvas style={{ width: '100svw', height: '100svh', overflow: 'hidden' }} ref={canvasRef} />
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
