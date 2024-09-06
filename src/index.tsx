import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Landing from './Landing';
import About from './me/About';
import ProjectOverview from './projects/ProjectOverview';
import CV from './cv/CV';
import NotFound from './NotFound';
import './index.css';
import { ProjectWrapper } from './projects/ProjectWrapper';
import { Header } from './Header';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <div className='project-page'>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/portfolio' element={<Landing />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/home' element={<Landing />} />
          <Route path='/main' element={<Landing />} />
          <Route path='/cv' element={<CV />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<ProjectOverview />} />
          <Route path='/project/:id' element={<ProjectWrapper />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
