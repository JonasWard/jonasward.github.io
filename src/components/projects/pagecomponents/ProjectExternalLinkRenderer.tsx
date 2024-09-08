import { ProjectExternalLink } from '../../../types/projectContent/projectExternalLink';
import './projectContent.css';

export const ProjectExternalLinkRenderer: React.FC<{ content: ProjectExternalLink }> = ({ content }) => (
  <div className='text-block link-block'>
    {content.description ? <p>{content.description}</p> : null}
    <a href={content.href}>{content.alternativeName ?? content.href}</a>
  </div>
);
