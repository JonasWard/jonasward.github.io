import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';
import { ProjectChip } from './ProjectChip';
import { ProjectImage } from '../../../types/projectContent/projectImage';
import { getProjectKeywords } from '../../../utils/projectconstructor';
import { RefObject, useState } from 'react';

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
        position: 'absolute',
        width: '200px',
        left,
        top,
      }}
      onClick={navigateProject}
    >
      <img
        style={{
          width: '100%',
          height: `${((keyImage.imageHeigth as number) / (keyImage.imageWidth as number)) * 200}px`,
          objectFit: 'cover',
        }}
        src={keyImage.imageHref}
        alt='Red dot'
      />
      <h2>{metaData.name}</h2>
      <main>
        <p>{metaData.description}</p>
      </main>
      <div className='keywords'>
        {getProjectKeywords(metaData).map((attribute, index) => (
          <ProjectChip key={index} name={attribute} show={showKeywords} />
        ))}
      </div>
      <div className='keywords'>
        <ProjectChip
          key={'show keywords trigger'}
          name={'Keywords +'}
          onClick={(e: Event) => {
            e.stopPropagation();
            triggerRerender();
            setShowKeywords(true);
          }}
          show={!showKeywords}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
