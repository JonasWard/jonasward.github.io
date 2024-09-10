import { ProjectMetaData } from 'src/types/projectContent/projectMetaData';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';
import { ProjectChip } from './ProjectChip';
import { ProjectImage } from 'src/types/projectContent/projectImage';
import { getProjectKeywords } from 'src/utils/projectconstructor';
import { RefObject, useState } from 'react';
import { ProjectCategory } from 'src/types/keywords/categoryTypes';

import architecture from '/resources/hatches/architecture.svg';
import software from '/resources/hatches/software.svg';
import weaving from '/resources/hatches/weaving.svg';
import design from '/resources/hatches/design.svg';

const getBackgroundForProjectType = (projectType: ProjectCategory) => {
  switch (projectType) {
    case ProjectCategory.Design:
      return design;
    case ProjectCategory.Architecture:
      return architecture;
    case ProjectCategory.Software:
      return software;
    default:
      return weaving;
  }
};

interface IProjectNameCard {
  index: number;
  metaData: ProjectMetaData;
  keyImage: ProjectImage;
  left: number;
  top: number;
  refArray?: RefObject<(HTMLDivElement | null)[]>;
  triggerRerender: () => void;
}

export const ProjectCard: React.FC<IProjectNameCard> = ({ index, metaData, keyImage, left, top, refArray, triggerRerender }) => {
  const navigate = useNavigate();
  const navigateProject = () => navigate(`/project/${metaData.webstring}`);
  const [showKeywords, setShowKeywords] = useState(false);

  return (
    <div
      ref={(element) => {
        if (refArray?.current) refArray.current[index] = element;
      }}
      className={`project-card fade-in ${metaData.projectType}`}
      style={{
        left,
        top,
        backgroundImage: `url(${getBackgroundForProjectType(metaData.projectType)})`,
      }}
      onClick={navigateProject}
    >
      <div className='project-card foreground' />
      <div
        className='project-card background'
        style={{
          backgroundImage: `url(${getBackgroundForProjectType(metaData.projectType)})`,
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
