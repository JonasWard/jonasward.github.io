import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Landing from './components/Landing';
import About from './me/About';
import ProjectOverview from './projects/ProjectOverview';
import CV from './cv/CV';
import './index.css';
import { ProjectWrapper } from './projects/ProjectWrapper';
import Missing from './components/Missing';
import { HeaderWrapper } from './components/HeaderWrapper';
import { ProjectRoutes } from './types/navigation/projectroutes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <div className='project-page'>
        <Routes>
          <Route path={ProjectRoutes.Home} element={<Landing />} />
          <Route path={ProjectRoutes.Portfolio} element={<HeaderWrapper children={<Missing />} />} />
          <Route path={ProjectRoutes.Landing} element={<HeaderWrapper children={<Missing />} />} />
          <Route path={ProjectRoutes.Main} element={<Landing />} />
          <Route path={ProjectRoutes.CV} element={<HeaderWrapper children={<CV />} />} />
          <Route path={ProjectRoutes.About} element={<HeaderWrapper children={<About />} />} />
          <Route path={ProjectRoutes.Projects} element={<HeaderWrapper children={<ProjectOverview />} />} />
          <Route path={ProjectRoutes.Project} element={<HeaderWrapper children={<ProjectWrapper />} />} />
          <Route path={ProjectRoutes.Missing} element={<HeaderWrapper children={<Missing />} />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
