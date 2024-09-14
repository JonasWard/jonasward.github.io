import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import projectImage from './assets/smart-bricks/topViewTiles.jpg';
import image1 from './assets/smart-bricks/concept.0.B.StackedTiles.2.jpg';
import image2 from './assets/smart-bricks/concept.0.G.Tesseleation-Interlocking.jpg';
import image3 from './assets/smart-bricks/DetailStack.jpg';
import image4 from './assets/smart-bricks/PackedvsUnpacked.jpg';
import image5 from './assets/smart-bricks/PlacingDetail.jpg';
import image6 from './assets/smart-bricks/Plane.jpg';
import image7 from './assets/smart-bricks/ReactionDiffusion.png';
import image8 from './assets/smart-bricks/Screen Shot 2018-10-26 at 14.34.34.jpg';
import image9 from './assets/smart-bricks/SideDetail.jpg';

const id = '2019-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'smart-brick',
  name: 'Smart Brick',
  projectType: ProjectCategory.Design,
  description: 'packed produced tiles',
  keyImage: undefined,
  projectContext: ProjectContext.Academic,
  projectPartnerContext: ProjectPartnerContext.Team,
  projectPartners: ['Yuta Akizuka'],
  keywords: [Keywords.ThreeDPrinting, Keywords.Patterns, Keywords.DigitalFabrication],
};

export const smartBrick: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name, 2048, 2036),
  projectContent: [
    createText(1, [
      'packed produced tiles',
      'This short but intensive conceptual design project was trying to show the potential of highly compact, highly detailed, highly porous and highly versatile designs attainable when using binder-jet additive manufacturing processes. The goal was simple: try and make as large and intricate of a surface with as little material as possible. To be able to do this we opted to produce a set of tiles which fitted together like a puzzle. But rather than producing them one by one, we compacted them all into one very dense object. To be able to pack them closely, the bottom-side of the next tile in the pile always had the negative shape of the topside of the previous tile. We then printed this complex stack of tiles, which resulted in a brick shape measuring 220 x 220 x 250 mm, which was compiled of 25 individual tiles. The unpacked result was a 1.1 x 1.1 m measuring claustra informed by a reaction-diffusion pattern that continued both in the bottom as the top layer of the object creating both an aesthetically rich formal language as allowing for geometrical linking of the two layers into each other.',
    ]),
    {
      type: ProjectContentType.ImageGrid,
      images: [image1, image2, image3, image4, image5, image6, image7, image8, image9].map((i) => createImage(i, '©️ J.W.')),
    },
  ],
};
