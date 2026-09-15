import { useEffect, useRef } from 'react';
import logo from 'src/assets/icons/jonasward_logo_ww.svg';
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
      <canvas className="landing-canvas" ref={canvasRef} />
      <div className="landing-logo">
        <img src={logo} alt={'jonas ward logo'} />
      </div>
    </div>
  );
};

export default Landing;
