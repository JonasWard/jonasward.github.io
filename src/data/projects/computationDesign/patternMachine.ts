import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import projectImage from './assets/patternGenerator/patternTitle.jpg';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createTitleImage } from '../../../utils/projectconstructor';

const id = '2021-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'pattern-machine',
  name: 'Pattern Machine',
  projectType: ProjectCategory.Design,
  description: 'web-based pattern SDF based pattern generator for knitting',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
};

export const patternMachine: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, 'Pattern Machine', 1928, 2876),
  projectContent: [],
};
