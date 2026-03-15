import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { Keywords } from 'src/types/keywords/keywords';

import sdfLamps_Front from './assets/sdfLamps_Front.jpg';
import sdfLamps_1 from './assets/sdfLamps_1.jpg';
import sdfLamps_2 from './assets/sdfLamps_2.jpg';
import sdfLamps_3 from './assets/sdfLamps_3.jpg';
import sdfLamps_5 from './assets/sdfLamps_5.jpg';
import sdfLamps_6 from './assets/sdfLamps_6.jpg';
import sdfLamps_7 from './assets/sdfLamps_7.jpg';
import sdfLamps_8 from './assets/sdfLamps_8.jpg';
import sdfLamps_9 from './assets/sdfLamps_9.jpg';
import sdfLamps_10 from './assets/sdfLamps_10.jpg';
import sdfLamps_11 from './assets/sdfLamps_11.jpg';
import sdfLamps_12 from './assets/sdfLamps_12.jpg';
import sdfLamps_13 from './assets/sdfLamps_13.jpg';
import sdfLamps_14 from './assets/sdfLamps_14.jpg';
import sdfLamps_15 from './assets/sdfLamps_15.jpg';
import sdfLamps_16 from './assets/sdfLamps_16.jpg';
import sdfLamps_17 from './assets/sdfLamps_17.jpg';
import sdfLamps_18 from './assets/sdfLamps_18.jpg';
import sdfLamps_19 from './assets/sdfLamps_19.jpg';
import sdfLamps_20 from './assets/sdfLamps_20.jpg';
import sdfLamps_21 from './assets/sdfLamps_21.jpg';
import sdfLamps_22 from './assets/sdfLamps_22.jpg';
import sdfLamps_23 from './assets/sdfLamps_23.jpg';
import sdfLamps_24 from './assets/sdfLamps_24.jpg';
import sdfLamps_25 from './assets/sdfLamps_25.jpg';
import sdfLamps_26 from './assets/sdfLamps_26.jpg';
import sdfLamps_27 from './assets/sdfLamps_27.jpg';
import sdfLamps_28 from './assets/sdfLamps_28.jpg';
import sdfLamps_29 from './assets/sdfLamps_29.jpg';
import sdfLamps_30 from './assets/sdfLamps_30.jpg';
import sdfLamps_31 from './assets/sdfLamps_31.jpg';
import sdfLamps_32 from './assets/sdfLamps_32.jpg';
import sdfLamps_33 from './assets/sdfLamps_33.jpg';
import sdfLamps_34 from './assets/sdfLamps_34.jpg';
import sdfLamps_35 from './assets/sdfLamps_35.jpg';

const id = '2024-06';

const metaData: ProjectMetaData = {
  id,
  webstring: 'sdf-lamps',
  name: 'SDF Lamps',
  projectType: ProjectCategory.Lamps,
  description: 'Lamp Topologies with SDFs',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.DigitalFabrication, Keywords.Product, Keywords.ThreeDPrinting, Keywords.Patterns]
};

export const sdfLamps: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(sdfLamps_Front, metaData.name, 3268, 6075, 'black-on-white'),
  projectContent: [
    {
      type: ProjectContentType.ImageGrid,
      images: [
        sdfLamps_28,
        sdfLamps_29,
        sdfLamps_30,
        sdfLamps_31,
        sdfLamps_32,
        sdfLamps_33,
        sdfLamps_34,
        sdfLamps_35,
        sdfLamps_1
      ].map((i) => createImage(i, '© R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [sdfLamps_16, sdfLamps_17, sdfLamps_18].map((i) => createImage(i, '© R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [sdfLamps_14, sdfLamps_15].map((i) => createImage(i, '© R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        sdfLamps_19,
        sdfLamps_20,
        sdfLamps_21,
        sdfLamps_22,
        sdfLamps_23,
        sdfLamps_24,
        sdfLamps_25,
        sdfLamps_26,
        sdfLamps_2,
        sdfLamps_3,
        sdfLamps_27
      ].map((i) => createImage(i, '© R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [sdfLamps_5, sdfLamps_6, sdfLamps_7, sdfLamps_8].map((i) => createImage(i, '© R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [sdfLamps_9, sdfLamps_10, sdfLamps_11, sdfLamps_12, sdfLamps_13].map((i) => createImage(i, '© R.Huber'))
    }
  ]
};
