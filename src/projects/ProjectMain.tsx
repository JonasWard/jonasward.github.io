import { Header } from '../Header';
import { ProjectMetaData } from './projectsData/ProjectData';

interface IProjectMain {
  id: string;
  metaData: ProjectMetaData;
  keyImage: string;
  otherNodes?: React.ReactNode[];
}

export const ProjectMain: React.FC<IProjectMain> = ({ id, metaData, keyImage, otherNodes = [] }) => {
  return (
    <>
      <Header />
      <div style={{ width: '100hw' }}>
        <img style={{ width: '100%', objectFit: 'contain' }} src={keyImage} alt='Red dot' />
        <h2>{metaData.name}</h2>
        <main>
          <p>{metaData.description}</p>
        </main>
        <p>{metaData.projectType}</p>
        <p>{metaData.projectContext}</p>
        <p>{metaData.projectPartnerContext}</p>
        <p>{metaData.projectParners.map((partner) => partner)}</p>
        {metaData.keywords.map((keyword) => keyword)}
      </div>
      {otherNodes}
    </>
  );
};

export default ProjectMain;
