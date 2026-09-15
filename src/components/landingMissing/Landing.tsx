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
    return startPaperTiles(canvas);
  }, []);

  return (
    <div className="landing-page" onClick={goToProjects}>
      <canvas className="landing-canvas" ref={canvasRef} aria-label="jonas ward" />
    </div>
  );
};

export default Landing;
