import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import projectImage from './assets/tiles/topViewTiles.jpg';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';

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
  projectPartners: ['Yuta Akizuka'],
  keywords: [Keywords.ThreeDPrinting, Keywords.Patterns, Keywords.DigitalFabrication],
};

export const smartBrick: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name, 2048, 2036),
  projectContent: [],
};
