import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Landing from './components/landingMissing/Landing';
import './index.css';
import Missing from './components/landingMissing/Missing';
import { HeaderWrapper } from './components/HeaderWrapper';
import { ProjectRoutes } from './types/navigation/projectroutes';

// every route but the landing page is split off, so e.g. @react-pdf/renderer and the project data only load when needed
const About = lazy(() => import('./components/me/About'));
const ProjectOverview = lazy(() => import('./components/projects/overview/ProjectOverview'));
const KeywordFilterBar = lazy(() =>
  import('./components/projects/overview/KeywordFilterBar').then((m) => ({ default: m.KeywordFilterBar }))
);
const ProjectWrapper = lazy(() =>
  import('./components/projects/overview/ProjectWrapper').then((m) => ({ default: m.ProjectWrapper }))
);
const MotivationLetterGenerator = lazy(() =>
  import('./components/motivationLetter/MotivationLetterGenerator').then((m) => ({
    default: m.MotivationLetterGenerator
  }))
);
const cvVariant = (variant: keyof typeof import('./components/cv/CVVariants')) =>
  lazy(() => import('./components/cv/CVVariants').then((m) => ({ default: m[variant] })));
const CVCompact = cvVariant('CVCompact');
const CVProductDesigner = cvVariant('CVProductDesigner');
const CVLivingLabHil = cvVariant('CVLivingLabHil');
const CVLonger = cvVariant('CVLonger');
const CVMax = cvVariant('CVMax');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <div className="project-page">
        <Suspense fallback={null}>
          <Routes>
            <Route path={ProjectRoutes.Home} element={<Landing />} />
            <Route path={ProjectRoutes.Portfolio} element={<HeaderWrapper content={<Missing />} />} />
            <Route path={ProjectRoutes.Landing} element={<HeaderWrapper content={<Missing />} />} />
            <Route path={ProjectRoutes.Main} element={<Landing />} />
            <Route path={ProjectRoutes.CV} element={<HeaderWrapper content={<CVCompact />} />} />
            <Route path={ProjectRoutes.CVProductDesigner} element={<HeaderWrapper content={<CVProductDesigner />} />} />
            <Route path={ProjectRoutes.CVLivingLabHil} element={<HeaderWrapper content={<CVLivingLabHil />} />} />
            <Route path={ProjectRoutes.CVLonger} element={<HeaderWrapper content={<CVLonger />} />} />
            <Route path={ProjectRoutes.CVMax} element={<HeaderWrapper content={<CVMax />} />} />
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
        </Suspense>
      </div>
    </Router>
  </React.StrictMode>
);
