import { useEffect } from 'react';
import { Header } from '../Header';
import { allProjects } from './projectsData/allProjects';
import './ProjectOverview.css';
import ProjectCard from './ProjectCard';

export const ProjectOverview = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Header />
      <div className='project-grid fade-in'>
        {allProjects.map((project) => (
          <ProjectCard metaData={project.metaData} id={project.id} keyImage={project.projectImage.imageHref} />
        ))}
      </div>
    </>
  );
};

export default ProjectOverview;
