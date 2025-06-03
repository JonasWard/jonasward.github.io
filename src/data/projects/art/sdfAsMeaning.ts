import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';

import sdfAsMeaning_front from './asssets/sdfAsMeaning_front.jpg';
import sdfAsMeaning_1 from './asssets/sdfAsMeaning_1.jpg';
import sdfAsMeaning_2 from './asssets/sdfAsMeaning_2.jpg';
import sdfAsMeaning_3 from './asssets/sdfAsMeaning_3.jpg';
import sdfAsMeaning_4 from './asssets/sdfAsMeaning_4.jpg';
import sdfAsMeaning_5 from './asssets/sdfAsMeaning_5.jpg';
import sdfAsMeaning_6 from './asssets/sdfAsMeaning_6.jpg';
import sdfAsMeaning_7 from './asssets/sdfAsMeaning_7.jpg';
import sdfAsMeaning_8 from './asssets/sdfAsMeaning_8.jpg';
import sdfAsMeaning_9 from './asssets/sdfAsMeaning_9.jpg';
import sdfAsMeaning_10 from './asssets/sdfAsMeaning_10.jpg';
import sdfAsMeaning_11 from './asssets/sdfAsMeaning_11.jpg';
import sdfAsMeaning_12 from './asssets/sdfAsMeaning_12.jpg';

import { ProjectContentType } from 'src/types/projectContent/projectContentType';

const id = '2023-05';

const metaData: ProjectMetaData = {
  id,
  webstring: 'sdf-as-meaning',
  name: 'SDF with Meaning',
  projectType: ProjectCategory.Art,
  description: 'Using text as data to feed SDF',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo
};

export const sdfAsMeaning: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(sdfAsMeaning_front, metaData.name, 3775, 3066),
  projectContent: [
    {
      type: ProjectContentType.ImageGrid,
      images: [
        sdfAsMeaning_6,
        sdfAsMeaning_7,
        sdfAsMeaning_8,
        sdfAsMeaning_9,
        sdfAsMeaning_10,
        sdfAsMeaning_11,
        sdfAsMeaning_12
      ].map((i) => createImage(i, '©️ R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [sdfAsMeaning_1, sdfAsMeaning_2, sdfAsMeaning_3, sdfAsMeaning_4, sdfAsMeaning_5].map((i) =>
        createImage(i, '©️ R.Huber')
      )
    }
  ]
};
