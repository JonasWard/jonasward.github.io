import { ProjectImageText } from '../../../types/projectContent/projectImageText';
import './projectContent.css';
import { ProjectImageRenderer } from './ProjectImageRenderer';
import { ProjectTextRenderer } from './ProjectTextRenderer';

interface IProjectImageTextRendererProps {
  content: ProjectImageText;
}

export const ProjectImageTextRenderer: React.FC<IProjectImageTextRendererProps> = ({ content }) => {
  return (
    <div className={`image-text-block ${content.position ?? 'left'}`}>
      <ProjectImageRenderer
        content={content.image}
        maxHeight={content.maxImageHeight}
        maxWidth={content.maxImageWidth}
      />
      <ProjectTextRenderer content={content.text} />
    </div>
  );
};
