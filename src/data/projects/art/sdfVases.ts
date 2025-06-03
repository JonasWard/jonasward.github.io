import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';

import sdfVases_Front from './asssets/sdfVases_Front.jpg';
import sdfVases_1 from './asssets/sdfVases_1.jpg';
import sdfVases_2 from './asssets/sdfVases_2.jpg';
import sdfVases_3 from './asssets/sdfVases_3.jpg';
import sdfVases_4 from './asssets/sdfVases_4.jpg';
import sdfVases_6 from './asssets/sdfVases_6.jpg';
import sdfVases_7 from './asssets/sdfVases_7.jpg';
import sdfVases_8 from './asssets/sdfVases_8.jpg';
import sdfVases_9 from './asssets/sdfVases_9.jpg';
import sdfVases_10 from './asssets/sdfVases_10.jpg';
import sdfVases_12 from './asssets/sdfVases_12.jpg';
import sdfVases_13 from './asssets/sdfVases_13.jpg';
import sdfVases_14 from './asssets/sdfVases_14.jpg';
import sdfVases_15 from './asssets/sdfVases_15.jpg';
import sdfVases_16 from './asssets/sdfVases_16.jpg';
import sdfVases_17 from './asssets/sdfVases_17.jpg';
import sdfVases_18 from './asssets/sdfVases_18.jpg';

const id = '2023-05';

const metaData: ProjectMetaData = {
  id,
  webstring: 'sdf-vases',
  name: 'SDF Vases',
  projectType: ProjectCategory.Art,
  description: 'Vase Topologies with SDFs',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo
};

export const sdfVases: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(sdfVases_Front, metaData.name, 2955, 4672),
  projectContent: [
    {
      type: ProjectContentType.ImageGrid,
      images: [sdfVases_16, sdfVases_17, sdfVases_18].map((i) => createImage(i, '©️ R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [sdfVases_1, sdfVases_2, sdfVases_3, sdfVases_4].map((i) => createImage(i, '©️ R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [sdfVases_6, sdfVases_7, sdfVases_8, sdfVases_9, sdfVases_10].map((i) => createImage(i, '©️ R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [sdfVases_12, sdfVases_13, sdfVases_14, sdfVases_15].map((i) => createImage(i, '©️ R.Huber'))
    }
  ]
};
