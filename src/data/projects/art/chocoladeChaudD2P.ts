import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { Keywords } from 'src/types/keywords/keywords';
import { Technologies } from 'src/types/keywords/technologies';

import chocoladeChaudD2P_1 from './asssets/chocoladeChaudD2P_1.jpg?responsive';
import chocoladeChaudD2P_2 from './asssets/chocoladeChaudD2P_2.jpg?responsive';
import chocoladeChaudD2P_3 from './asssets/chocoladeChaudD2P_3.jpg?responsive';
import chocoladeChaudD2P_4 from './asssets/chocoladeChaudD2P_4.jpg?responsive';
import chocoladeChaudD2P_5 from './asssets/chocoladeChaudD2P_5.jpg?responsive';
import chocoladeChaudD2P_6 from './asssets/chocoladeChaudD2P_6.jpg?responsive';
import chocoladeChaudD2P_7 from './asssets/chocoladeChaudD2P_7.jpg?responsive';
import chocoladeChaudD2P_8 from './asssets/chocoladeChaudD2P_8.jpg?responsive';
import chocoladeChaudD2P_9 from './asssets/chocoladeChaudD2P_9.jpg?responsive';
import chocoladeChaudD2P_10 from './asssets/chocoladeChaudD2P_10.jpg?responsive';
import chocoladeChaudD2P_11 from './asssets/chocoladeChaudD2P_11.jpg?responsive';
import chocoladeChaudD2P_12 from './asssets/chocoladeChaudD2P_12.jpg?responsive';
import chocoladeChaudD2P_13 from './asssets/chocoladeChaudD2P_13.jpg?responsive';
import chocoladeChaudD2P_14 from './asssets/chocoladeChaudD2P_14.jpg?responsive';
import chocoladeChaudD2P_15 from './asssets/chocoladeChaudD2P_15.jpg?responsive';
import chocoladeChaudD2P_16 from './asssets/chocoladeChaudD2P_16.jpg?responsive';
import chocoladeChaudD2P_SwatchBar from './asssets/chocoladeChaudD2P_SwatchBar.jpg?responsive';

const id = '2023-07';

const metaData: ProjectMetaData = {
  id,
  webstring: 'chocolade-chaud-d2p',
  name: 'D2P xMas gifts',
  projectType: ProjectCategory.Art,
  description: 'Using Chocolade Chaud to create xMas gifts',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [
    Keywords.DigitalFabrication,
    Keywords.ThreeDPrinting,
    Keywords.Patterns,
    Technologies.BabylonJS,
    Technologies.React,
    Technologies.SVG,
    Technologies.GLSL
  ]
};

export const chocoladeChaudD2P: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(chocoladeChaudD2P_SwatchBar, metaData.name),
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
      ].map((i) => createImage(i, '© R.Huber'))
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
      ].map((i) => createImage(i, '© R.Huber'))
    }
  ]
};
