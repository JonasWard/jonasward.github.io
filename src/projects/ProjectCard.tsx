import { ProjectMetaData } from '../types/projectContent/projectMetaData';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';
import { ProjectChip } from './ProjectChip';

interface IProjectNameCard {
  id: string;
  metaData: ProjectMetaData;
  keyImage: string;
}

export const ProjectCard: React.FC<IProjectNameCard> = ({ id, metaData, keyImage }) => {
  const navigate = useNavigate();
  const navigateProject = () => navigate(`/project/${metaData.webstring}`);

  return (
    <div
      className={`project-card ${metaData.projectType}`}
      style={{
        width: '200px',
      }}
      onClick={navigateProject}
    >
      <img style={{ width: '100%', minHeight: '100px', maxHeight: '250px', objectFit: 'cover' }} src={keyImage} alt='Red dot' />
      <h2>{metaData.name}</h2>
      <main>
        <p>{metaData.description}</p>
      </main>
      <div className='keywords'>
        <ProjectChip name={metaData.projectType} />
        <ProjectChip name={metaData.projectContext} />
        <ProjectChip name={metaData.projectPartnerContext} />
        {metaData.projectParners && metaData.projectParners.map((partner) => <ProjectChip name={partner} />)}
        {metaData.keywords && metaData.keywords.map((keyword) => <ProjectChip name={keyword} />)}
      </div>
    </div>
  );
};

export default ProjectCard;
