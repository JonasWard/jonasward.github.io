import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';

import chocoladeChaudD2P_1 from './asssets/chocoladeChaudD2P_1.jpg';
import chocoladeChaudD2P_2 from './asssets/chocoladeChaudD2P_2.jpg';
import chocoladeChaudD2P_3 from './asssets/chocoladeChaudD2P_3.jpg';
import chocoladeChaudD2P_4 from './asssets/chocoladeChaudD2P_4.jpg';
import chocoladeChaudD2P_5 from './asssets/chocoladeChaudD2P_5.jpg';
import chocoladeChaudD2P_6 from './asssets/chocoladeChaudD2P_6.jpg';
import chocoladeChaudD2P_7 from './asssets/chocoladeChaudD2P_7.jpg';
import chocoladeChaudD2P_8 from './asssets/chocoladeChaudD2P_8.jpg';
import chocoladeChaudD2P_9 from './asssets/chocoladeChaudD2P_9.jpg';
import chocoladeChaudD2P_10 from './asssets/chocoladeChaudD2P_10.jpg';
import chocoladeChaudD2P_11 from './asssets/chocoladeChaudD2P_11.jpg';
import chocoladeChaudD2P_12 from './asssets/chocoladeChaudD2P_12.jpg';
import chocoladeChaudD2P_13 from './asssets/chocoladeChaudD2P_13.jpg';
import chocoladeChaudD2P_14 from './asssets/chocoladeChaudD2P_14.jpg';
import chocoladeChaudD2P_15 from './asssets/chocoladeChaudD2P_15.jpg';
import chocoladeChaudD2P_16 from './asssets/chocoladeChaudD2P_16.jpg';
import chocoladeChaudD2P_SwatchBar from './asssets/chocoladeChaudD2P_SwatchBar.jpg';

const id = '2023-07';

const metaData: ProjectMetaData = {
  id,
  webstring: 'chocolade-chaud-d2p',
  name: 'D2P xMas gifts',
  projectType: ProjectCategory.Art,
  description: 'Using Chocolade Chaud to create xMas gifts',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo
};

export const chocoladeChaudD2P: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(chocoladeChaudD2P_SwatchBar, metaData.name, 4364, 5420),
  projectContent: [
    {
      type: ProjectContentType.ImageGrid,
      images: [
        chocoladeChaudD2P_10,
        chocoladeChaudD2P_11,
        chocoladeChaudD2P_12,
        chocoladeChaudD2P_13,
        chocoladeChaudD2P_14,
        chocoladeChaudD2P_15,
        chocoladeChaudD2P_16
      ].map((i) => createImage(i, '©️ R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        chocoladeChaudD2P_1,
        chocoladeChaudD2P_2,
        chocoladeChaudD2P_3,
        chocoladeChaudD2P_4,
        chocoladeChaudD2P_5,
        chocoladeChaudD2P_6,
        chocoladeChaudD2P_7,
        chocoladeChaudD2P_8,
        chocoladeChaudD2P_9
      ].map((i) => createImage(i, '©️ R.Huber'))
    }
  ]
};
