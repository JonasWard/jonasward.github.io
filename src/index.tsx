import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Landing from './components/landingMissing/Landing';
import About from './components/me/About';
import ProjectOverview from './components/projects/overview/ProjectOverview';
import CV from './components/cv/CV';
import './index.css';
import { ProjectWrapper } from './components/projects/overview/ProjectWrapper';
import Missing from './components/landingMissing/Missing';
import { HeaderWrapper } from './components/HeaderWrapper';
import { ProjectRoutes } from './types/navigation/projectroutes';
import { MotivationLetterGenerator } from './components/motivationLetter/MotivationLetterGenerator';
import { KeywordFilterBar } from './components/projects/overview/KeywordFilterBar';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <div className="project-page">
        <Routes>
          <Route path={ProjectRoutes.Home} element={<Landing />} />
          <Route path={ProjectRoutes.Portfolio} element={<HeaderWrapper content={<Missing />} />} />
          <Route path={ProjectRoutes.Landing} element={<HeaderWrapper content={<Missing />} />} />
          <Route path={ProjectRoutes.Main} element={<Landing />} />
          <Route path={ProjectRoutes.CV} element={<HeaderWrapper content={<CV />} />} />
          <Route path={ProjectRoutes.About} element={<HeaderWrapper content={<About />} />} />
          <Route
            path={ProjectRoutes.Projects}
            element={<HeaderWrapper children={<KeywordFilterBar />} content={<ProjectOverview />} />}
          />
          <Route path={ProjectRoutes.Project} element={<HeaderWrapper content={<ProjectWrapper />} />} />
          <Route path={ProjectRoutes.Missing} element={<HeaderWrapper content={<Missing />} />} />
          <Route
            path={ProjectRoutes.CreateMotivationLetter}
            element={<HeaderWrapper content={<MotivationLetterGenerator />} />}
          />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
