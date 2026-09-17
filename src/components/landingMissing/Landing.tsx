import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';
import { startPaperTiles } from './paperTiles';

const Landing = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const goToProjects = () => {
    navigate('/projects');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const stop = startPaperTiles(canvas);
    const previousBackground = document.body.style.background;
    document.body.style.background = '#9daaa3';
    return () => {
      stop();
      document.body.style.background = previousBackground;
    };
  }, []);

  return (
    <div className="landing-page" onClick={goToProjects}>
      <canvas className="landing-canvas" ref={canvasRef} aria-label="jonas ward" />
    </div>
  );
};

export default Landing;
