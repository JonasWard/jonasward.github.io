import { Header } from '../Header';
import { allProjects } from './projectsData/allProjects';

export const ProjectOverview = () => {
  return (
    <>
      <Header />
      <div>{allProjects.map((project) => project.projectCard)}</div>
    </>
  );
};

export default ProjectOverview;
