import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import tinderSliding from './assets/circrete-marketplace/tinder-sliding.webp';
import favorites from './assets/circrete-marketplace/favorites.webp';
import multiLingual from './assets/circrete-marketplace/multi-lingual.webp';
import overviewElements from './assets/circrete-marketplace/overview-elements.webp';
import swiping from './assets/circrete-marketplace/swiping.webp';

const id = '2025-06';

const metaData: ProjectMetaData = {
  id,
  webstring: 'circrete-marketplace',
  name: 'circrete Marketplace',
  projectType: ProjectCategory.Software,
  description: 'POC Marketplace for circrete Concrete Elements',
  keyImage: overviewElements,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.Frontend, Keywords.Development, Keywords.Ecology, Keywords.Reuse]
};

export const circreteMarketplace: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(overviewElements, metaData.name, 3024, 2634, 'black-on-white'),
  projectContent: [
    createText(
      2,
      [
        'Giving Structural Elements a place to find their new Home',
        'circrete Marketplace serves as a POC for a marketplace for Structural Elements. Using different interfaces, users can get an overview of the available elements to use in their projects. There is quite some fuzziness.'
      ],
      'This project is a static frontend page, using next.js, while also allowing for multiple languages.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(favorites, 'Favorites'),
        createImage(multiLingual, 'Multi-lingual'),
        createImage(overviewElements, 'Overview'),
        createImage(tinderSliding, 'Tinder Sliding'),
        createImage(swiping, 'Swiping')
      ]
    }
  ]
};
