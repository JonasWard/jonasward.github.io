import { ProjectMetaData } from 'src/types/projectContent/projectMetaData';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';
import { ProjectChip } from './ProjectChip';
import { ProjectImage } from 'src/types/projectContent/projectImage';
import { getProjectKeywords } from 'src/utils/projectconstructor';
import { RefObject, useState } from 'react';
import { ProjectCategory } from 'src/types/keywords/categoryTypes';

import architecture from 'src/assets/hatches/architecture.svg?raw';
import software from 'src/assets/hatches/software.svg?raw';
import weaving from 'src/assets/hatches/weaving.svg?raw';
import design from 'src/assets/hatches/design.svg?raw';

const getBackgroundForProjectType = (projectType: ProjectCategory) => {
  switch (projectType) {
    case ProjectCategory.Design:
      return `url("data:image/svg+xml;utf8,${design.replaceAll('\n', '')}")`;
    case ProjectCategory.Architecture:
      return `url("data:image/svg+xml;utf8,${architecture.replaceAll('\n', '')}")`;
    case ProjectCategory.Software:
      return `url("data:image/svg+xml;utf8,${software.replaceAll('\n', '')}")`;
    default:
      return `url("data:image/svg+xml;utf8,${weaving.replaceAll('\n', '')}")`;
  }
};

interface IProjectCard {
  index: number;
  metaData: ProjectMetaData;
  keyImage: ProjectImage;
  left: number;
  top: number;
  currentCenterPosition: [number, number];
  refArray?: RefObject<(HTMLDivElement | null)[]>;
  triggerRerender: () => void;
}

export const ProjectCard: React.FC<IProjectCard> = ({ index, metaData, keyImage, left, top, refArray, triggerRerender, currentCenterPosition }) => {
  const navigate = useNavigate();
  const navigateProject = () => navigate(`/project/${metaData.webstring}`);
  const [showKeywords, setShowKeywords] = useState(false);

  return (
    <div
      ref={(element) => {
        if (refArray?.current) refArray.current[index] = element;
      }}
      className={`project-card fade-in ${metaData.projectType} ${Math.abs(currentCenterPosition[0] - left) < 115 ? 'in-focus' : ''}`}
      style={{
        left,
        top,
        zIndex: 0,
      }}
      onClick={navigateProject}
    >
      <div style={{ backgroundImage: getBackgroundForProjectType(metaData.projectType) }} className='project-card foreground' />
      <div className='project-card foreground' />
      <div
        className='project-card background'
        style={{
          backgroundImage: getBackgroundForProjectType(metaData.projectType),
        }}
      />
      <div>
        <img
          style={{
            width: '100%',
            height: `${((keyImage.imageHeigth as number) / (keyImage.imageWidth as number)) * 200}px`,
            objectFit: 'cover',
          }}
          src={keyImage.imageHref}
          alt='Red dot'
        />
        <h4>{metaData.id}</h4>
        <h2>{metaData.name}</h2>
        <main>
          <p>{metaData.description}</p>
        </main>
        <h3
          onClick={(e: any) => {
            e.stopPropagation();
            triggerRerender();
            setShowKeywords(!showKeywords);
          }}
        >
          <span>keywords </span>
          <svg
            style={{ width: 13, height: 13, transition: 'all 0.6s', transform: showKeywords ? 'scale(1, 1)' : 'scale(1, -1)' }}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 12 12'
          >
            <path d='M2 9 L6 3 L10 9' stroke='black' strokeWidth='1.4' fill='none' strokeLinecap='round' />
          </svg>
        </h3>
        <div className='keywords'>
          {getProjectKeywords(metaData).map((attribute, index) => (
            <ProjectChip key={index} name={attribute} show={showKeywords} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
