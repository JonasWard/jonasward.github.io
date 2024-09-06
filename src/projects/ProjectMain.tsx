import { ProjectData } from '../types/projectContent/projectData';
import { ProjectImageRenderer } from './projectComponents/ProjectImageRenderer';
import { ProjectContentRenderer } from './ProjectContentRenderer';

interface IProjectRendererProps {
  project: ProjectData;
}

export const ProjectRenderer: React.FC<IProjectRendererProps> = ({ project }) => {
  return (
    <>
      <ProjectImageRenderer content={project.projectImage} isMainImage />
      <ProjectContentRenderer content={project.projectContent} />
    </>
  );
};

export default ProjectRenderer;
