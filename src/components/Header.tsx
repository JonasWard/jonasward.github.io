import { useNavigate, useLocation } from 'react-router-dom';
import './header.css';
import { useEffect, useState } from 'react';
import logo from '../assets/icons/jonasward_logo_ww.svg';
import { ProjectRoutes } from '../types/navigation/projectroutes';
import { useProjectStore } from 'src/state/projectStore';
import { ProjectCategory } from 'src/types/keywords/categoryTypes';
import { ProjectCategoryFilterType } from 'src/types/navigation/filterType';

const DropDownContent: React.FC = () => {
  const navigate = useNavigate();
  const path = useLocation();

  const navigateAbout = (e: React.MouseEvent) => navigate(ProjectRoutes.About);
  const navigateProjects = (e: React.MouseEvent) => navigate(ProjectRoutes.Projects);
  const navigateCV = (e: React.MouseEvent) => navigate(ProjectRoutes.CV);

  return (
    <>
      <button
        className={path.pathname.includes(ProjectRoutes.AnyProject) ? 'button-active' : 'button'}
        onClick={navigateProjects}
      >
        Projects
      </button>
      <button
        className={path.pathname.includes(ProjectRoutes.About) ? 'button-active' : 'button'}
        onClick={navigateAbout}
      >
        About
      </button>
      <button className={path.pathname.includes(ProjectRoutes.CV) ? 'button-active' : 'button'} onClick={navigateCV}>
        Cv
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
        <svg height="40" width="30" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10 L30 10" stroke="black" strokeWidth="3px" />
          <path d="M0 20 L30 20" stroke="black" strokeWidth="3px" />
          <path d="M0 30 L30 30" stroke="black" strokeWidth="3px" />
        </svg>
      </div>
      <div className={`dropdown-content ${showDropDown ? 'show' : ''}`}>
        <DropDownContent />
      </div>
    </div>
  );
};

export const Header: React.FC<{ withFilter?: boolean }> = ({ withFilter = false }) => {
  const navigate = useNavigate();
  const navigateHome = () => navigate(ProjectRoutes.Home);
  const projectFilter = useProjectStore((s) => s.filter);

  return (
    <div className="header">
      <div className="header-content">
        <button className={'button'} onClick={navigateHome}>
          <img alt={''} src={logo} style={{ width: '200px', marginLeft: -12 }} />
        </button>
        {withFilter ? (
          <select
            style={{
              border: 'none',
              background: '#f5f5f5',
              borderRadius: 7,
              padding: 2
            }}
            value={projectFilter}
            onChange={(v) => useProjectStore.getState().setFilter(v.target.value as ProjectCategoryFilterType)}
          >
            <option value={'All'}>All</option>
            {Object.values(ProjectCategory).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        ) : null}
        <Navigation />
      </div>
    </div>
  );
};
