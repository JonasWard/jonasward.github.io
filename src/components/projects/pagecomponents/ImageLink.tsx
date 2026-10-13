import { ProjectImage } from '../../../types/projectContent/projectImage';

/** the small corner link of an image, opens in a new tab */
export const ImageLink: React.FC<{ link: NonNullable<ProjectImage['link']> }> = ({ link }) => (
  <a
    className="image-link font-small"
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    title={link.title}
    aria-label={link.title}
  >
    ↗
  </a>
);
