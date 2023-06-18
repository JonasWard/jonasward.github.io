import { ProjectMetaData } from './projectsData/ProjectData';
import { useNavigate } from 'react-router-dom';

interface IProjectNameCard {
  id: string;
  metaData: ProjectMetaData;
  keyImage: string;
}

export const ProjectCard: React.FC<IProjectNameCard> = ({ id, metaData, keyImage }) => {
  const navigate = useNavigate();

  const navigateProject = () => navigate(`/project/${metaData.webstring}`);

  return (
    <div style={{ width: '200px' }} onClick={navigateProject}>
      <img style={{ width: '100%', objectFit: 'contain' }} src={keyImage} alt='Red dot' />
      <h2>{metaData.name}</h2>
      <main>
        <p>{metaData.description}</p>
      </main>
      <p>{metaData.projectType}</p>
      <p>{metaData.projectContext}</p>
      <p>{metaData.projectPartnerContext}</p>
      <p>{metaData.projectParners && metaData.projectParners.map((partner) => partner)}</p>
      {metaData.keywords && metaData.keywords.map((keyword) => keyword)}
    </div>
  );
};

export default ProjectCard;
