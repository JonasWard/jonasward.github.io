import { ProjectPartnerContext } from '../../../types/projectPartnerContext';
import { ProjectContext } from '../../../types/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import projectImage from './assets/patternTitle.jpg';
import { ProjectCategory } from '../../../types/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createTitleImage } from '../../helper';
import { Keywords } from '../../../types/keywords';

const id = '2019-03';

const metaData: ProjectMetaData = {
  id,
  webstring: 'coral-bricks',
  name: '3d Printed Coral Bricks',
  projectType: ProjectCategory.Design,
  description: 'first iteration of 3d printed coral bricks which later became the rrreefs project',
  keyImage: undefined,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Keywords.ThreeDPrinting, Keywords.Ecology],
  projectParners: ['Marie Griesmar'],
};

export const patternMachine: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, 'Pattern Machine'),
  projectContent: [],
};
