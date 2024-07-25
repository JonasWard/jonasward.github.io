import { ProjectPartnerContext } from '../../../types/projectPartnerContext';
import { ProjectContext } from '../../../types/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../helper';
import { Keywords } from '../../../types/keywords';

import projectImage from './assets/coral/test-marie.webp';
import brick1 from './assets/coral/brick-marie.webp';
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
  projectParners: ['Marie Griesmar'],
};

export const coralBricks: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name),
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
      images: [createImage(projectImage, '©️ M.Griesmar'), createImage(brick1, '©️ M.Griesmar')],
    },
  ],
};
