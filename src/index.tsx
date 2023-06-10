import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Landing from './Landing';
import About from './me/About';
import ProjectOverview from './projects/ProjectOverview';
import CV from './me/CV';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/portfolio' element={<Landing />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/main' element={<Landing />} />
        <Route path='/cv' element={<CV />} />
        <Route path='/about' element={<About />} />
        <Route path='/projects' element={<ProjectOverview />} />
        {/* ... etc. */}
      </Routes>
    </Router>
  </React.StrictMode>
);
