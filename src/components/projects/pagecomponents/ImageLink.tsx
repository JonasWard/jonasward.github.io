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
    {/* an svg rather than ↗, which every platform font draws differently */}
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" aria-hidden="true">
      <path d="M2.5 9.5 L9.5 2.5 M4 2.5 H9.5 V8" />
    </svg>
  </a>
);
