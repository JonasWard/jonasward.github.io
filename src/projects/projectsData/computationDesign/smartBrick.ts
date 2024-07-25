import { ProjectPartnerContext } from '../../../types/projectPartnerContext';
import { ProjectContext } from '../../../types/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import projectImage from './assets/topViewTiles.jpg';
import { ProjectCategory } from '../../../types/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createTitleImage } from '../../helper';

const id = '2019-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'smart-brick',
  name: 'Smart Brick',
  projectType: ProjectCategory.Design,
  description: 'packed produced tiles',
  keyImage: undefined,
  projectContext: ProjectContext.Academic,
  projectPartnerContext: ProjectPartnerContext.Team,
  projectParners: ['Yuta Akizuka'],
};

export const smartBrick: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name),
  projectContent: [],
};
