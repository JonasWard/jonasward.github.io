import { ProjectContext, ProjectPartnerContext, ProjectType } from '../../../enums';
import ProjectCard from '../../ProjectCard';
import ProjectMain from '../../ProjectMain';
import { ProjectData, ProjectMetaData } from '../ProjectData';
import projectImage from './assets/topViewTiles.jpg';

const id = '2019-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'smart-brick',
  name: 'Smart Brick',
  projectType: ProjectType.Design,
  description: 'packed produced tiles',
  keyImage: undefined,
  projectContext: ProjectContext.Academic,
  projectPartnerContext: ProjectPartnerContext.Team,
  projectParners: ['Yuta Akizuka'],
};

export const SmartBrick: ProjectData = {
  id,
  metaData,
  projectCard: <ProjectCard id={id} metaData={metaData} keyImage={projectImage} />,
  projectPage: <ProjectMain id={id} metaData={metaData} keyImage={projectImage} />,
  projectPageImage: projectImage,
};
