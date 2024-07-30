import { ProjectPartnerContext } from '../../../types/projectPartnerContext';
import { ProjectContext } from '../../../types/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import projectImage from './assets/SiteModel.jpg';
import { ProjectCategory } from '../../../types/categoryTypes';
import { createTitleImage } from '../../helper';
import { ProjectData } from '../../../types/projectContent/projectData';

const id = '2017-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'living-on-the-edge',
  name: 'Living on the Edge',
  projectType: ProjectCategory.Architecture,
  description: 'lorum ipsum dolor',
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
