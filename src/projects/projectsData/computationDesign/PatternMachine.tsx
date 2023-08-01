import { ProjectContext, ProjectPartnerContext, ProjectType } from '../../../enums';
import ProjectCard from '../../ProjectCard';
import ProjectMain from '../../ProjectMain';
import { ProjectData, ProjectMetaData } from '../ProjectData';
import projectImage from './assets/patternTitle.jpg';

const id = '2021-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'pattern-machine',
  name: 'Pattern Machine',
  projectType: ProjectType.Design,
  description: 'web-based pattern SDF based pattern generator for knitting',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
};

export const PatternMachine: ProjectData = {
  id,
  metaData,
  projectCard: <ProjectCard id={id} metaData={metaData} keyImage={projectImage} />,
  projectPage: <ProjectMain id={id} metaData={metaData} keyImage={projectImage} />,
  projectPageImage: projectImage,
};
