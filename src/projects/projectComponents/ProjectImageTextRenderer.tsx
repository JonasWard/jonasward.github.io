import { ProjectImageText } from '../../types/projectContent/projectImageText';
import './projectContent.css';
import { ProjectImageRenderer } from './ProjectImageRenderer';
import { ProjectTextRenderer } from './ProjectTextRenderer';

interface IProjectImageTextRendererProps {
  content: ProjectImageText;
}

export const ProjectImageTextRenderer: React.FC<IProjectImageTextRendererProps> = ({ content }) => {
  return (
    <div className={`text-block image ${content.position ?? 'left'}`}>
      <ProjectImageRenderer content={content.image} />
      <ProjectTextRenderer content={content.text} />
    </div>
  );
};
