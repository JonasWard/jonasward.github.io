import { useEffect } from 'react';
import { Header } from '../Header';
import ProjectHeader from './projectComponents/ProjectHeader';
import { ProjectMetaData } from './projectsData/ProjectData';

interface IProjectMain {
  id: string;
  metaData: ProjectMetaData;
  keyImage: string;
  otherNodes?: React.ReactNode[];
}

export const ProjectMain: React.FC<IProjectMain> = ({ id, metaData, keyImage, otherNodes = [] }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Header />
      <ProjectHeader id={id} metaData={metaData} keyImage={keyImage} />
      {otherNodes}
    </>
  );
};

export default ProjectMain;
