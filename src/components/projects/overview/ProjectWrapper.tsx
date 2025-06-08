import { useParams } from 'react-router-dom';
import { allProjects } from '../../../data/projects/allProjects';
import ProjectRenderer from '../pagecomponents/ProjectMain';
import Missing from '../../landingMissing/Missing';

export const ProjectWrapper: React.FC = () => {
  const { id } = useParams();

  const project = allProjects.find((project) => project.metaData.webstring === id);

  return project ? <ProjectRenderer project={project} /> : <Missing />;
};
