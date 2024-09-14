import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectImageRenderer } from './ProjectImageRenderer';
import { ProjectContentRenderer } from './ProjectContentRenderer';
import { useEffect } from 'react';

interface IProjectRendererProps {
  project: ProjectData;
}

export const ProjectRenderer: React.FC<IProjectRendererProps> = ({ project }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='project-layout'>
      <ProjectImageRenderer content={project.projectImage} isMainImage />
      <ProjectContentRenderer content={project.projectContent} />
    </div>
  );
};

export default ProjectRenderer;
