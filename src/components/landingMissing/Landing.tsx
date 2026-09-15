import { useEffect, useRef } from 'react';
import logo from 'src/assets/icons/jonasward_logo_ww.svg';
import { useNavigate } from 'react-router-dom';
import './missing.css';
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
    <div className="missing-page" onClick={goToProjects}>
      <canvas className="missing-page canvas" ref={canvasRef} />
      <div className="landing-logo">
        <img src={logo} alt={'jonas ward logo'} />
      </div>
    </div>
  );
};

export default Landing;
