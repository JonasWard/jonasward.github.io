import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Landing from './components/Landing';
import About from './me/About';
import ProjectOverview from './projects/ProjectOverview';
import CV from './cv/CV';
import './index.css';
import { ProjectWrapper } from './projects/ProjectWrapper';
import { Header } from './Header';
import Missing from './components/Missing';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <div className='project-page'>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/portfolio' element={<Missing />} />
          <Route path='/landing' element={<Missing />} />
          <Route path='/home' element={<Landing />} />
          <Route path='/main' element={<Missing />} />
          <Route path='/cv' element={<CV />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<ProjectOverview />} />
          <Route path='/project/:id' element={<ProjectWrapper />} />
          <Route path='*' element={<Missing />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
