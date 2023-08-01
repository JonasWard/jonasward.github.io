import { ProjectContext, ProjectPartnerContext, ProjectType } from '../../../enums';
import ProjectCard from '../../ProjectCard';
import ProjectMain from '../../ProjectMain';
import { ProjectData, ProjectMetaData } from '../ProjectData';
import projectImage from './assets/theCityIsArt.jpg';

const id = '2020-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'the-city-is-art',
  name: 'The City is Art',
  projectType: ProjectType.Design,
  description: 'neural style transfers',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
};

export const TheCityIsArt: ProjectData = {
  id,
  metaData,
  projectCard: <ProjectCard id={id} metaData={metaData} keyImage={projectImage} />,
  projectPage: <ProjectMain id={id} metaData={metaData} keyImage={projectImage} />,
  projectPageImage: projectImage,
};
