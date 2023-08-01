import { useNavigate, useLocation } from 'react-router-dom';
import './header.css';
import { useEffect, useState } from 'react';
import logo from './assets/icons/jonasward_logo_ww.svg';

enum activeTab {
  home,
  about,
  projects,
  cv,
}

export const Header = () => {
  const navigate = useNavigate();
  const path = useLocation();
  const [acitveTab, setActiveTab] = useState<activeTab | null>(null);

  const navigateHome = () => navigate('/home');
  const navigateAbout = () => navigate('/about');
  const navigateProjects = () => navigate('/projects');
  const navigateCV = () => navigate('/cv');
  const [mobileView, setMobileView] = useState<boolean>(false);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const onResize = () => {
    const isMobile = window.innerWidth < 600;
    if (!isMobile) setShowDropDown(false);
    setMobileView(isMobile);
  };

  useEffect(() => {
    console.log(showDropDown);
  }, [showDropDown]);

  useEffect(() => {
    if (path.pathname.indexOf('/home') !== -1) setActiveTab(activeTab.home);
    else if (path.pathname.indexOf('/landing') !== -1) setActiveTab(activeTab.home);
    else if (path.pathname.indexOf('/about') !== -1) setActiveTab(activeTab.about);
    else if (path.pathname.indexOf('/project') !== -1) setActiveTab(activeTab.projects);
    else if (path.pathname.indexOf('/cv') !== -1) setActiveTab(activeTab.cv);
  }, [path]);

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={'header'}>
      <button className={acitveTab === activeTab.home ? 'button-active' : 'button'} onClick={navigateHome}>
        <img alt={''} src={logo} style={{ width: '200px' }} />
      </button>
      <div style={{ width: mobileView ? '100px' : '200px' }} className={'header-right'}>
        {mobileView ? (
          <>
            <button className={showDropDown ? 'button-active' : 'button'} onClick={() => setShowDropDown(!showDropDown)}>
              <p>Dropdown</p>
            </button>
            {showDropDown && (
              <div className='dropdown-content'>
                <button className={acitveTab === activeTab.projects ? 'button-active' : 'button'} onClick={navigateProjects}>
                  <p>Projects</p>
                </button>
                <button className={acitveTab === activeTab.about ? 'button-active' : 'button'} onClick={navigateAbout}>
                  <p>About</p>
                </button>
                <button className={acitveTab === activeTab.cv ? 'button-active' : 'button'} onClick={navigateCV}>
                  <p>Cv</p>
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <button style={{ width: '40%' }} className={acitveTab === activeTab.projects ? 'button-active' : 'button'} onClick={navigateProjects}>
              <p>Projects</p>
            </button>
            <button style={{ width: '40%' }} className={acitveTab === activeTab.about ? 'button-active' : 'button'} type='button' onClick={navigateAbout}>
              <p>About</p>
            </button>
            <button style={{ width: '20%' }} className={acitveTab === activeTab.cv ? 'button-active' : 'button'} onClick={navigateCV}>
              <p>Cv</p>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
