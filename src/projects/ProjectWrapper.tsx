import { useParams } from 'react-router-dom';
import { allProjects } from './projectsData/allProjects';
import ProjectRenderer from './ProjectMain';
import Missing from '../components/Missing';

export const ProjectWrapper: React.FC = () => {
  const { id } = useParams();

  const project = allProjects.find((project) => project.metaData.webstring === id);

  return project ? <ProjectRenderer project={project} /> : <Missing />;
};
