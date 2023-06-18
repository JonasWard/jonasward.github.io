import { ProjectContext, ProjectPartnerContext, ProjectType } from '../../../enums';
import ProjectCard from '../../ProjectCard';
import ProjectMain from '../../ProjectMain';
import { ProjectData, ProjectMetaData } from '../ProjectData';
import projectImage from './assets/SiteModel.jpg';

const id = '2017-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'livingOnTheEdge',
  name: 'Living on the Edge',
  projectType: ProjectType.Architecture,
  description: 'lorum ipsum dolor',
  keyImage: undefined,
  projectContext: ProjectContext.Academic,
  projectPartnerContext: ProjectPartnerContext.Solo,
};

export const LivingOnTheEdge: ProjectData = {
  id,
  metaData,
  projectCard: <ProjectCard id={id} metaData={metaData} keyImage={projectImage} />,
  projectPage: <ProjectMain id={id} metaData={metaData} keyImage={projectImage} />,
  projectPageImage: projectImage,
};
