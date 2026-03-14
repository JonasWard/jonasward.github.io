import { ProjectExternalLink } from '../../../types/projectContent/projectExternalLink';
import './projectContent.css';
import { ProjectExternalLinkListRenderer } from './ProjectExternalLinkListRenderer';

export const ProjectExternalLinkRenderer: React.FC<{ content: ProjectExternalLink }> = ({ content }) => (
  <ProjectExternalLinkListRenderer links={[content]} />
);