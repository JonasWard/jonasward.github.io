import { ProjectPartnerContext } from '../../../types/projectPartnerContext';
import { ProjectContext } from '../../../types/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import projectImage from './assets/patternTitle.jpg';
import { ProjectCategory } from '../../../types/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createTitleImage } from '../../helper';

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
  projectImage: createTitleImage(projectImage, 'Pattern Machine'),
  projectContent: [],
};
