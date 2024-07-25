import { ProjectPartnerContext } from '../../../types/projectPartnerContext';
import { ProjectContext } from '../../../types/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import projectImage from './assets/scarves/20221214_jvb_flow_7.jpeg';
import { ProjectCategory } from '../../../types/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createTitleImage } from '../../helper';

const id = '2019-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'scarves',
  name: 'SDF Scarves',
  projectType: ProjectCategory.Design,
  description: 'knitted scarves using pattern generator',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
};

export const scarves: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name),
  projectContent: [],
};
