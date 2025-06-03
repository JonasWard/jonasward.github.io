import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';

import chocoStudies_1 from './asssets/chocoStudies_1.jpg';
import chocoStudies_2 from './asssets/chocoStudies_2.jpg';
import chocoStudies_3 from './asssets/chocoStudies_3.jpg';
import chocoStudies_4 from './asssets/chocoStudies_4.jpg';
import chocoStudies_5 from './asssets/chocoStudies_5.jpg';
import chocoStudies_6 from './asssets/chocoStudies_6.jpg';
import chocoStudies_7 from './asssets/chocoStudies_7.jpg';
import chocoStudies_8 from './asssets/chocoStudies_8.jpg';
import chocoStudies_9 from './asssets/chocoStudies_9.jpg';
import chocoStudies_10 from './asssets/chocoStudies_10.jpg';
import chocoStudies_11 from './asssets/chocoStudies_11.jpg';
import chocoStudies_12 from './asssets/chocoStudies_12.jpg';
import chocoStudies_13 from './asssets/chocoStudies_13.jpg';
import chocoStudies_14 from './asssets/chocoStudies_14.jpg';
import chocoStudies_15 from './asssets/chocoStudies_15.jpg';
import chocoStudies_16 from './asssets/chocoStudies_16.jpg';
import chocoStudies_17 from './asssets/chocoStudies_17.jpg';
import chocoStudies_18 from './asssets/chocoStudies_18.jpg';
import chocoStudies_19 from './asssets/chocoStudies_19.jpg';
import chocoStudies_20 from './asssets/chocoStudies_20.jpg';
import chocoStudies_21 from './asssets/chocoStudies_21.jpg';
import chocoStudies_22 from './asssets/chocoStudies_22.jpg';
import chocoStudies_23 from './asssets/chocoStudies_23.jpg';
import chocoStudies_24 from './asssets/chocoStudies_24.jpg';
import chocoStudies_25 from './asssets/chocoStudies_25.jpg';
import chocoStudies_26 from './asssets/chocoStudies_26.jpg';
import chocoStudies_27 from './asssets/chocoStudies_27.jpg';
import chocoStudies_28 from './asssets/chocoStudies_28.jpg';
import chocoStudies_Front from './asssets/chocoStudies_Front.jpg';

const id = '2023-06';

const metaData: ProjectMetaData = {
  id,
  webstring: 'choco-studies',
  name: 'Choco Studies',
  projectType: ProjectCategory.Art,
  description: 'Using SDF for Chocoforming',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo
};

export const chocoStudies: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(chocoStudies_Front, metaData.name, 2981, 5117),
  projectContent: [
    {
      type: ProjectContentType.ImageGrid,
      images: [
        chocoStudies_1,
        chocoStudies_2,
        chocoStudies_3,
        chocoStudies_4,
        chocoStudies_5,
        chocoStudies_6,
        chocoStudies_7,
        chocoStudies_8,
        chocoStudies_9,
        chocoStudies_10,
        chocoStudies_11
      ].map((i) => createImage(i, '©️ R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [chocoStudies_12, chocoStudies_13, chocoStudies_14].map((i) => createImage(i, '©️ R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [chocoStudies_12, chocoStudies_13, chocoStudies_14].map((i) => createImage(i, '©️ R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [chocoStudies_15, chocoStudies_16, chocoStudies_17].map((i) => createImage(i, '©️ R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        chocoStudies_18,
        chocoStudies_19,
        chocoStudies_20,
        chocoStudies_21,
        chocoStudies_22,
        chocoStudies_23,
        chocoStudies_24
      ].map((i) => createImage(i, '©️ R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [chocoStudies_25, chocoStudies_26, chocoStudies_27, chocoStudies_28].map((i) =>
        createImage(i, '©️ R.Huber')
      )
    }
  ]
};
