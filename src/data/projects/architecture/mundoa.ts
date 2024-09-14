import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import mundoA1 from './assets/mundo-A/ilse_liekens-mundo_A.jpg';
import mundoA2 from './assets/mundo-A/lucid-mundo_A-interieur_2.jpg';
import mundoA3 from './assets/mundo-A/lucid-mundo_A-interieur.jpg';
import projectImage from './assets/mundo-A/lucid-mundo_A.jpg';

const id = '2016-02';

const metaData: ProjectMetaData = {
  id,
  webstring: 'mundo-a',
  name: 'Mundo A',
  projectType: ProjectCategory.Architecture,
  description: 'Timber Truss Office Building',
  keyImage: undefined,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Team,
};

export const mundoA: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name, 1400, 1034),
  projectContent: [
    {
      type: ProjectContentType.ImageGrid,
      images: [createImage(mundoA1, '©️ Ilse Liekens'), createImage(mundoA3, '©️ lucid'), createImage(mundoA2, '©️ lucid')],
    },
  ],
};
