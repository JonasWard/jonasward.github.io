import { ProjectContent } from '../types/projectContent/projectContent';
import { ProjectContentType } from '../types/projectContent/projectContentType';
import { ProjectImageRenderer } from './projectComponents/ProjectImageRenderer';
import { ProjectImageTextRenderer } from './projectComponents/ProjectImageTextRenderer';
import { ProjectTextRenderer } from './projectComponents/ProjectTextRenderer';
import './ProjectOverview.css';

export const ProjectContentRenderer: React.FC<{ content: ProjectContent[] }> = ({ content }) => {
  return (
    <div className='project-content'>
      {content.map((content, index) => {
        switch (content.type) {
          case ProjectContentType.Image:
            return <ProjectImageRenderer key={index} content={content} />;
          case ProjectContentType.Text:
            return <ProjectTextRenderer key={index} content={content} />;
          case ProjectContentType.ImageText:
            return <ProjectImageTextRenderer key={index} content={content} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
