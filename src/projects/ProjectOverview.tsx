import { useEffect } from 'react';
import { Header } from '../Header';
import { allProjects } from './projectsData/allProjects';

export const ProjectOverview = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Header />
      <div>{allProjects.map((project) => project.projectCard)}</div>
    </>
  );
};

export default ProjectOverview;
