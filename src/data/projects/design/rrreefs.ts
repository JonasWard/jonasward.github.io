import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';

import image1 from './assets/coral/Brick_Marie_Griesmar_BeneathTheSea_41.jpg';
import image3 from './assets/coral/CoralesdePaz1-600x338-1.jpg';
import image4 from './assets/coral/CoralesdePaz2-600x338-1.jpg';
import image5 from './assets/coral/Cube-4-detail-scaled-1600x4800.jpg';
import image6 from './assets/coral/Griesmar_rrreefs_CAN_21_@Marie¨.Griesmar-scaled-800x4800.jpg';
import image7 from './assets/coral/IMG_20200116_162142556.jpg';
import image9 from './assets/coral/IMG_20200121_161629807.jpg';
import image10 from './assets/coral/IMG_20200121_164508772.jpg';
import image11 from './assets/coral/IMG_20200121_172709710.jpg';
import image12 from './assets/coral/Marie_Griesmar_BeneathTheSea_2020_brick_clay_1.jpg';
import image13 from './assets/coral/Marie_Griesmar_BTS_BrickSystem_2_1.jpg';
import image14 from './assets/coral/Marie_Griesmar_clay_Prototypes_2019.jpg';
import image15 from './assets/coral/Marie_Griesmar_claytiles_2019.jpg';
import image16 from './assets/coral/rehabilitation-of-coral-reefs-01-01-01.jpg';
import image17 from './assets/coral/test-marie.webp';
import image18 from './assets/coral/Tiles_Maldives_April21_©MaRHE-scaled-800x4800.jpg';
import image19 from './assets/coral/WEB_template_1920x1080px_rrreefs_12-scaled.jpg.webp';

import projectImage from './assets/coral/rrreefs_low.jpg';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

const id = '2019-03';

const metaData: ProjectMetaData = {
  id,
  webstring: 'coral-bricks',
  name: 'Modules for Coral Reefs',
  projectType: ProjectCategory.Design,
  description: 'First iteration of 3d printed coral bricks which later became the rrreefs project',
  keyImage: undefined,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Keywords.ThreeDPrinting, Keywords.Ecology],
  projectPartners: ['Marie Griesmar'],
};

export const coralBricks: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name, 898, 1273),
  projectContent: [
    createText(
      2,
      [
        'Corals around the world are facing tough times. One hand they are suffering from their own beauty, having become a tourist attraction suffering the many drivers who want to take home a piece. Though the more existential problem is climate change. Rising sea levels, acidification and more intense storms having been hammering away at the most biodiverse and biologically active aquatic biomes on earth. Besides beautiful and rich in flora and fauna, coral reefs also function as a huge carbon sink. Combating their further demise is therefore one of the big challenges we are facing in the 21st century.',
        'Corals from Clay',
      ],
      [
        'This project, initialized by ceramist Marie Griesmar and marine biologist Ulrike Pfreudt tries to create artificial reef bases for clay polyps - seeds - to nest in. To this end additive manufacturing strategies are used to create the geometrical vocabulary needed. By playing with patterns and geometry on multiple levels, combined with material research this project aims at creating the ideal environment for young pollipse to hatch. A workflow is developed to quickly iterate through multiple pattern designs in an infinitely complex possibility space to be able to narrow down which work best. Specific path optimizations were implemented to print the whole construction in one go, saving time and reducing local weaknesses. The in the end selected clay - G-ton - shrinks rather violently and upto 15% during the drying stage. Because of the many mircracks in its surface very well suited for pollipse, many of the first bricks printed had issues with drying homogeneously. To this end different infill strategies were iterated to allow for an as equal as possible drying process, reducing the internal stresses in the structure while drying.',
        undefined,
      ]
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        image19,
        image1,
        image9,
        image7,
        image10,
        image11,
        image14,
        image15,
        image17,
        image5,
        image6,
        image18,
        image12,
        image13,
        image4,
        image3,
        image16,
      ].map((i) => createImage(i, '©️ M.Griesmar')),
    },
  ],
};
