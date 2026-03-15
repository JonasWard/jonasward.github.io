import { ProjectMetaData } from 'src/types/projectContent/projectMetaData';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';
import { ProjectImage } from 'src/types/projectContent/projectImage';
import { getProjectKeywords } from 'src/utils/projectconstructor';
import { useRef, useState } from 'react';

import logo from '../../../assets/jonasward_logo_elong.png';
import { KeywordButton } from './KeywordButton';

interface IProjectCard {
  index: number;
  metaData: ProjectMetaData;
  keyImage: ProjectImage;
  currentCenterPosition: [number, number];
}

export const ProjectCard: React.FC<IProjectCard> = ({ metaData, keyImage, currentCenterPosition }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const navigateProject = () => navigate(`/project/${metaData.webstring}`);
  const [showKeywords, setShowKeywords] = useState(false);

  return (
    <div
      ref={cardRef}
      className={`project-card fade-in ${metaData.projectType} ${
        cardRef.current && (Math.abs(currentCenterPosition[0] - cardRef.current!.offsetLeft) < 115 ? 'in-focus' : '')
      }`}
      onClick={navigateProject}
    >
      <div>
        <img
          style={{
            width: '100%',
            height: `${((keyImage.imageHeigth as number) / (keyImage.imageWidth as number)) * 200}px`,
            objectFit: 'cover'
          }}
          src={keyImage.imageHref || logo}
          alt={metaData.name}
        />
        <div className="project-card-content">
          <h4>{metaData.id}</h4>
          <h2>{metaData.name}</h2>
          <main>
            <p>{metaData.description}</p>
          </main>
          <h3
            onClick={(e: any) => {
              e.stopPropagation();
              setShowKeywords(!showKeywords);
            }}
          >
            <span>keywords </span>
            <svg
              style={{
                width: 10,
                height: 10,
                transition: 'all 0.6s',
                transform: showKeywords ? 'rotate(0deg)' : 'rotate(180deg)'
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 12"
            >
              <path d="M2 9 L6 3 L10 9" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </svg>
          </h3>
          <div className={`keywords${showKeywords ? '' : ' keywords-hidden'}`}>
            {getProjectKeywords(metaData).map((attribute) => (
              <KeywordButton key={attribute} keyword={attribute} show={showKeywords} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
