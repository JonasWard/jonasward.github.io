import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const navigateHome = () => navigate('/home');
  const navigateAbout = () => navigate('/about');
  const navigateProjects = () => navigate('/projects');
  const navigateCV = () => navigate('/cv');

  return (
    <div style={{ display: 'block', position: 'absolute' }}>
      <button type='button' onClick={navigateHome}>
        Go home
      </button>
      <button type='button' onClick={navigateProjects}>
        Projects
      </button>
      <button type='button' onClick={navigateAbout}>
        About
      </button>
      <button type='button' onClick={navigateCV}>
        CV
      </button>
    </div>
  );
};
