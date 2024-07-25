import { Header } from '../Header';
import { ProjectData } from '../types/projectContent/projectData';
import { ProjectImageRenderer } from './projectComponents/ProjectImageRenderer';
import { ProjectContentRenderer } from './ProjectContentRenderer';

interface IProjectRendererProps {
  project: ProjectData;
}

export const ProjectRenderer: React.FC<IProjectRendererProps> = ({ project }) => {
  return (
    <>
      <Header />
      <ProjectImageRenderer content={project.projectImage} isMainImage />
      <ProjectContentRenderer content={project.projectContent} />
    </>
  );
};

export default ProjectRenderer;
