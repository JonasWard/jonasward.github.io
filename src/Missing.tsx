import { useEffect, useRef } from 'react';
import logo from './assets/icons/jonasward_logo_ww.svg';

const Missing = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initWebGL = (canvas: HTMLCanvasElement) => {
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    gl.clearColor(0.3, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
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
        <img src={logo} alt={'missing logo'} />
      </div>
    </div>
  );
};

export default Missing;
