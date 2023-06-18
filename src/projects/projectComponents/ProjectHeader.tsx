import { ProjectMetaData } from '../projectsData/ProjectData';

interface IProjectHeader {
  id: string;
  metaData: ProjectMetaData;
  keyImage: string;
}

export const ProjectHeader: React.FC<IProjectHeader> = ({ id, metaData, keyImage }) => {
  return (
    <div id={id} style={{ width: '100hw' }}>
      <img style={{ width: '100%', objectFit: 'contain', overflow: 'overlay' }} src={keyImage} alt='Red dot' />
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

export default ProjectHeader;
