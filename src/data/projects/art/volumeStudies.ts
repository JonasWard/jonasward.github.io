import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';

import volumeStudies_0 from './asssets/volumeStudies_0.jpg?responsive';
import volumeStudies_1 from './asssets/volumeStudies_1.jpg?responsive';
import volumeStudies_2 from './asssets/volumeStudies_2.jpg?responsive';
import volumeStudies_3 from './asssets/volumeStudies_3.jpg?responsive';
import volumeStudies_5_ from './asssets/volumeStudies_5_.jpg?responsive';
import volumeStudies_5 from './asssets/volumeStudies_5.jpg?responsive';
import volumeStudies_6 from './asssets/volumeStudies_6.jpg?responsive';
import volumeStudies_7 from './asssets/volumeStudies_7.jpg?responsive';
import volumeStudies_10 from './asssets/volumeStudies_10.jpg?responsive';
import volumeStudies_11 from './asssets/volumeStudies_11.jpg?responsive';
import volumeStudies_12 from './asssets/volumeStudies_12.jpg?responsive';
import volumeStudies_13 from './asssets/volumeStudies_13.jpg?responsive';
import volumeStudies_14 from './asssets/volumeStudies_14.jpg?responsive';
import volumeStudies_15 from './asssets/volumeStudies_15.jpg?responsive';
import volumeStudies_16 from './asssets/volumeStudies_16.jpg?responsive';
import volumeStudies_17 from './asssets/volumeStudies_17.jpg?responsive';
import volumeStudies_18 from './asssets/volumeStudies_18.jpg?responsive';
import volumeStudies_19 from './asssets/volumeStudies_19.jpg?responsive';
import volumeStudies_20 from './asssets/volumeStudies_20.jpg?responsive';
import volumeStudies_21 from './asssets/volumeStudies_21.jpg?responsive';
import volumeStudies_a from './asssets/volumeStudies_a.jpg?responsive';
import volumeStudies_b from './asssets/volumeStudies_b.jpg?responsive';
import volumeStudies_c from './asssets/volumeStudies_c.jpg?responsive';
import volumeStudies_d from './asssets/volumeStudies_d.jpg?responsive';
import volumeStudies_e from './asssets/volumeStudies_e.jpg?responsive';
import volumeStudies_f from './asssets/volumeStudies_f.jpg?responsive';
import volumeStudies_g from './asssets/volumeStudies_g.jpg?responsive';
import volumeStudies_h from './asssets/volumeStudies_h.jpg?responsive';
import volumeStudies_i from './asssets/volumeStudies_i.jpg?responsive';
import volumeStudies_j from './asssets/volumeStudies_j.jpg?responsive';
import volumeStudies_k from './asssets/volumeStudies_k.jpg?responsive';
import volumeStudies_l from './asssets/volumeStudies_l.jpg?responsive';
import volumeStudies_m from './asssets/volumeStudies_m.jpg?responsive';
import volumeStudies_n from './asssets/volumeStudies_n.jpg?responsive';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';

const id = '2024-05';

const metaData: ProjectMetaData = {
  id,
  webstring: 'volume-studies',
  name: 'Volume Studies',
  projectType: ProjectCategory.Art,
  description: 'Various Volume Studies for Paper Architecture Buildings',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo
};

export const volumeStudies: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(volumeStudies_0, metaData.name),
  projectContent: [
    {
      type: ProjectContentType.ImageGrid,
      images: [volumeStudies_1, volumeStudies_2, volumeStudies_3].map((i) => createImage(i, '© R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [volumeStudies_10, volumeStudies_11].map((i) => createImage(i, '© R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [volumeStudies_5, volumeStudies_6, volumeStudies_7].map((i) => createImage(i, '© R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [volumeStudies_12, volumeStudies_13].map((i) => createImage(i, '© R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [volumeStudies_14, volumeStudies_15].map((i) => createImage(i, '© R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        volumeStudies_a,
        volumeStudies_b,
        volumeStudies_c,
        volumeStudies_d,
        volumeStudies_e,
        volumeStudies_f
      ].map((i) => createImage(i, '© R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [volumeStudies_g, volumeStudies_h, volumeStudies_i, volumeStudies_j, volumeStudies_k].map((i) =>
        createImage(i, '© R.Huber')
      )
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [volumeStudies_l, volumeStudies_m, volumeStudies_n].map((i) => createImage(i, '© R.Huber'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [volumeStudies_18, volumeStudies_19, volumeStudies_20, volumeStudies_21].map((i) =>
        createImage(i, '© R.Huber')
      )
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [volumeStudies_16, volumeStudies_17].map((i) => createImage(i, '© R.Huber'))
    }
  ]
};
