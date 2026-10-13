import { ProjectExternalLinkList } from '../../../types/projectContent/projectExternalLink';
import './projectContent.css';

export const ProjectExternalLinkListRenderer: React.FC<{ links: ProjectExternalLinkList['links'] }> = ({ links }) => (
  <div className="text-block link-list">
    {links.map(({ description, href, alternativeName }) => (
      <div key={href}>
        {description ? <p>{description}</p> : null}
        <a href={href}>{alternativeName ?? href}</a>
      </div>
    ))}
  </div>
);
