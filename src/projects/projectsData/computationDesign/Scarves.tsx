import { ProjectContext, ProjectPartnerContext, ProjectType } from '../../../enums';
import ProjectCard from '../../ProjectCard';
import ProjectMain from '../../ProjectMain';
import { ProjectData, ProjectMetaData } from '../ProjectData';
import projectImage from './assets/scarves/20221214_jvb_flow_7.jpeg';

const id = '2019-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'scarves',
  name: 'SDF Scarves',
  projectType: ProjectType.Design,
  description: 'knitted scarves using pattern generator',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
};

export const Scarves: ProjectData = {
  id,
  metaData,
  projectCard: <ProjectCard id={id} metaData={metaData} keyImage={projectImage} />,
  projectPage: <ProjectMain id={id} metaData={metaData} keyImage={projectImage} />,
  projectPageImage: projectImage,
};
