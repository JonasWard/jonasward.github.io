import { ProjectPartnerContext } from '../../../types/projectPartnerContext';
import { ProjectContext } from '../../../types/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../helper';
import { Keywords } from '../../../types/keywords';

import projectImage from './assets/scarves2023/picture_4.jpg';
import patternA from './assets/scarves2023/rawScarves.jpg';
import patternB from './assets/scarves2023/rawScarvesBlue.jpg';
import picture1 from './assets/scarves2023/picture_1.jpg';
import picture2 from './assets/scarves2023/picture_2.jpg';
import picture3 from './assets/scarves2023/picture_3.jpg';
import picture5 from './assets/scarves2023/picture_5.jpg';
import picture6 from './assets/scarves2023/picture_6.jpg';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

const id = '2023-03';

const metaData: ProjectMetaData = {
  id,
  webstring: 'winterSeason-2023',
  name: 'Winter Season 2023',
  projectType: ProjectCategory.Design,
  description: 'First commercial iteration of the pattern generator into knitware',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.Knitting, Keywords.Patterns],
};

export const scarves2023: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name, 2048, 2491),
  projectContent: [
    createText(
      2,
      ['first commerical iteration of the pattern generator into knitware', undefined],
      ['thanks a lot to Richa and Roxas for the modelling', undefined]
    ),
    { type: ProjectContentType.ImageGrid, images: [patternA, patternB].map((s) => createImage(s, '©️ JW')) },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        [picture1, '©️ S.Hild'],
        [picture2, '©️ S.Hild'],
        [picture3, '©️ S.Shein'],
        [picture5, '©️ S.Hild'],
        [projectImage, '©️ JW'],
        [picture6, '©️ JW'],
      ].map(([img, c]) => createImage(img, c)),
    },
  ],
};
