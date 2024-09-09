import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';

import projectImage from './assets/living-on-the-edge/SiteModel.jpg';

const id = '2017-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'living-on-the-edge',
  name: 'Living on the Edge',
  projectType: ProjectCategory.Architecture,
  description: 'UGent Urban Design Master Thesis',
  keyImage: undefined,
  projectContext: ProjectContext.Academic,
  projectPartnerContext: ProjectPartnerContext.Solo,
};

export const livingOnTheEdge: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name, 2943, 3890),
  projectContent: [],
};
