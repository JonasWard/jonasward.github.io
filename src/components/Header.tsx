import { useNavigate, useLocation } from 'react-router-dom';
import './header.css';
import { useEffect, useState } from 'react';
import logo from '../assets/icons/jonasward_logo_ww.svg';
import { ProjectRoutes } from '../types/navigation/projectroutes';

const DropDownContent: React.FC = () => {
  const navigate = useNavigate();

  const navigateAbout = (e: React.MouseEvent) => navigate(ProjectRoutes.About);
  const navigateProjects = (e: React.MouseEvent) => navigate(ProjectRoutes.Projects);
  const navigateCV = (e: React.MouseEvent) => navigate(ProjectRoutes.CV);

  return (
    <>
      <button
        className={'button-main ' + (window.location.hash.includes(ProjectRoutes.AnyProject) ? 'button-active' : '')}
        onClick={navigateProjects}
      >
        Projects
      </button>
      <button
        className={'button-main ' + (window.location.hash.includes(ProjectRoutes.About) ? 'button-active' : '')}
        onClick={navigateAbout}
      >
        About
      </button>
      <button
        className={'button-main ' + (window.location.hash.includes(ProjectRoutes.CV) ? 'button-active' : '')}
        onClick={navigateCV}
      >
        CV
      </button>
    </>
  );
};

const Navigation: React.FC = () => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const path = useLocation();

  useEffect(() => {
    setShowDropDown(false);
  }, [path]);

  return (
    <div className="header-right">
      <div className={`navigation-button ${showDropDown ? '' : 'show'}`} onClick={() => setShowDropDown(!showDropDown)}>
        <svg height="30" width="30" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 5 L30 5" stroke="black" strokeWidth="2px" />
          <path d="M0 15 L30 15" stroke="black" strokeWidth="2px" />
          <path d="M0 25 L30 25" stroke="black" strokeWidth="2px" />
        </svg>
      </div>
      <div className={`dropdown-content ${showDropDown ? 'show' : ''}`}>
        <DropDownContent />
      </div>
    </div>
  );
};

export const Header: React.FC<{ children?: React.ReactNode }> = ({ children = null }) => {
  const navigate = useNavigate();
  const navigateHome = () =>
    navigate(
      window.location.hash.includes(ProjectRoutes.Projects)
        ? (window.location.hash = ProjectRoutes.Home)
        : ProjectRoutes.Projects
    );

  return (
    <div className="header">
      <div className="header-content">
        <img alt={''} onClick={navigateHome} src={logo} style={{ width: '180px', cursor: 'pointer' }} />
        <Navigation />
      </div>
      {children}
    </div>
  );
};
