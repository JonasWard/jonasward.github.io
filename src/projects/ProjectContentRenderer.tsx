import { ProjectContent } from '../types/projectContent/projectContent';
import { ProjectContentType } from '../types/projectContent/projectContentType';
import { ProjectExternalLinkRenderer } from './projectComponents/ProjectExternalLinkRenderer';
import { ProjectImageRenderer } from './projectComponents/ProjectImageRenderer';
import { ProjectImagesRenderer } from './projectComponents/ProjectImagesRenderer';
import { ProjectImageTextRenderer } from './projectComponents/ProjectImageTextRenderer';
import { ProjectListRenderer } from './projectComponents/ProjectListRenderer';
import { ProjectTextRenderer } from './projectComponents/ProjectTextRenderer';
import './ProjectOverview.css';

export const ProjectContentRenderer: React.FC<{ content: ProjectContent[] }> = ({ content }) => {
  return (
    <div className='project-content fade-in'>
      {content.map((content, index) => {
        switch (content.type) {
          case ProjectContentType.Image:
            return <ProjectImageRenderer key={index} content={content} />;
          case ProjectContentType.Text:
            return <ProjectTextRenderer key={index} content={content} />;
          case ProjectContentType.ImageText:
            return <ProjectImageTextRenderer key={index} content={content} />;
          case ProjectContentType.Images:
          case ProjectContentType.ImageGrid:
            return <ProjectImagesRenderer key={index} content={content} />;
          case ProjectContentType.ExternalLink:
            return <ProjectExternalLinkRenderer key={index} content={content} />;
          case ProjectContentType.List:
            return <ProjectListRenderer key={index} content={content} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
