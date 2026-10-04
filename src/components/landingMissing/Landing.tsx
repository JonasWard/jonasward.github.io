import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';
import { startPaperTiles } from './paperTiles';

// where the landing is taller than the viewport (iOS, see landing.css) the page gets parked
// halfway its scroll range, so the surplus ends up under the browser's bars
const parkScroll = () => {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  if (range > 0) window.scrollTo(0, range / 2);
};

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
    document.documentElement.classList.add('landing-scroll-lock');
    parkScroll();
    window.addEventListener('resize', parkScroll);
    return () => {
      stop();
      document.body.style.background = 'white';
      window.removeEventListener('resize', parkScroll);
      document.documentElement.classList.remove('landing-scroll-lock');
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div className="landing-page" id="landing-page" onClick={goToProjects}>
      <canvas className="landing-canvas" ref={canvasRef} aria-label="jonas ward" />
    </div>
  );
};

export default Landing;
