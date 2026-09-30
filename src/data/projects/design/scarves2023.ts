import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ResponsivePicture } from '../../../types/projectContent/projectImage';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';

import projectImage from './assets/scarves2023/picture_4.jpg?responsive';
import patternA from './assets/scarves2023/rawScarves.jpg?responsive';
import patternB from './assets/scarves2023/rawScarvesBlue.jpg?responsive';
import picture1 from './assets/scarves2023/picture_1.jpg?responsive';
import picture2 from './assets/scarves2023/picture_2.jpg?responsive';
import picture3 from './assets/scarves2023/picture_3.jpg?responsive';
import picture5 from './assets/scarves2023/picture_5.jpg?responsive';
import picture6 from './assets/scarves2023/picture_6.jpg?responsive';
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
  projectImage: createTitleImage(projectImage, metaData.name),
  projectContent: [
    createText(
      2,
      'first commerical iteration of the pattern generator into knitware',
      'thanks a lot to Richa and Roxas for the modelling'
    ),
    { type: ProjectContentType.ImageGrid, images: [patternA, patternB].map((s) => createImage(s, '© JW')) },
    {
      type: ProjectContentType.ImageGrid,
      images: (
        [
          [picture1, '© S.Hild'],
          [picture2, '© S.Hild'],
          [picture3, '© S.Shein'],
          [picture5, '© S.Hild'],
          [projectImage, '© JW'],
          [picture6, '© JW']
        ] as [ResponsivePicture, string][]
      ).map(([img, c]) => createImage(img, c))
    }
  ]
};
