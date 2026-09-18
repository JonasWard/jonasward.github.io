import { ProjectMetaData } from 'src/types/projectContent/projectMetaData';
import { Link } from 'react-router-dom';
import './ProjectCard.css';
import { ProjectImage } from 'src/types/projectContent/projectImage';
import { getProjectKeywords } from 'src/utils/projectconstructor';
import { forwardRef, useState } from 'react';

import logo from '../../../assets/jonasward_logo_elong.png';
import { KeywordButton } from './KeywordButton';
import { paperOffsetFor } from './paperTexture';

/** what a card falls back to when a project carries no image dimensions */
const FALLBACK_ASPECT_RATIO = 4 / 3;

const aspectRatioOf = ({ imageWidth, imageHeigth }: ProjectImage): number =>
  imageWidth && imageHeigth ? imageWidth / imageHeigth : FALLBACK_ASPECT_RATIO;

interface IProjectCard {
  metaData: ProjectMetaData;
  keyImage: ProjectImage;
  /** the card sitting under the centre of the mobile carousel */
  isInFocus?: boolean;
  /** where the packer put this card, as --card-x / --card-y */
  style?: React.CSSProperties;
}

export const ProjectCard = forwardRef<HTMLElement, IProjectCard>(
  ({ metaData, keyImage, isInFocus = false, style }, ref) => {
    const [showKeywords, setShowKeywords] = useState(false);

    return (
      <article
        ref={ref}
        className={`project-card fade-in ${metaData.projectType}${isInFocus ? ' in-focus' : ''}`}
        style={{ ...style, backgroundPosition: paperOffsetFor(metaData.webstring) }}
      >
        <Link className="project-card-link" to={`/project/${metaData.webstring}`}>
          <img
            className="project-card-image"
            style={{ aspectRatio: aspectRatioOf(keyImage) }}
            src={keyImage.imageHref || logo}
            width={keyImage.imageWidth}
            height={keyImage.imageHeigth}
            loading="lazy"
            decoding="async"
            alt={metaData.name}
          />
          <span className="project-card-body">
            <span className="project-card-id">{metaData.id}</span>
            <h2 className="project-card-name">{metaData.name}</h2>
            <span className="project-card-description">{metaData.description}</span>
          </span>
        </Link>

        <button
          type="button"
          className="project-card-keywords-toggle"
          aria-expanded={showKeywords}
          onClick={() => setShowKeywords(!showKeywords)}
        >
          <span>keywords</span>
          <svg
            aria-hidden="true"
            style={{
              width: 10,
              height: 10,
              transition: 'transform 0.6s',
              transform: showKeywords ? 'rotate(0deg)' : 'rotate(180deg)'
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
          >
            <path d="M2 9 L6 3 L10 9" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </svg>
        </button>

        <div className={`keywords${showKeywords ? '' : ' keywords-hidden'}`} aria-hidden={!showKeywords}>
          {getProjectKeywords(metaData).map((attribute, i) => (
            <KeywordButton key={i} keyword={attribute} show={showKeywords} />
          ))}
        </div>
      </article>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
