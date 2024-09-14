import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';

import keyImage from './assets/the-city-is-art/theCityIsArt.jpg';
import image1 from './assets/the-city-is-art/4K_VSL_a_b.jpg';
import image2 from './assets/the-city-is-art/campi2muqarnas_shah.jpg';
import image3 from './assets/the-city-is-art/Carla2klee.jpg';
import image4 from './assets/the-city-is-art/Carla2klimt.jpg';
import image5 from './assets/the-city-is-art/dante2victoria.jpg';
import image6 from './assets/the-city-is-art/konstanz2pollock_34.jpg';
import image7 from './assets/the-city-is-art/konstanz2victoria.jpg';
import image8 from './assets/the-city-is-art/lodz2ishtar_gate.jpg';
import image9 from './assets/the-city-is-art/san_michele2muqarnas_shah.jpg';
import image10 from './assets/the-city-is-art/stripes2lodz.jpg';
import image11 from './assets/the-city-is-art/stripes2lodz2dogma_kgdvs_1.jpg';
import image12 from './assets/the-city-is-art/stripes2lodz2victoria-2.jpg';
import image13 from './assets/the-city-is-art/VSL-2d3d-9.jpg';
import image14 from './assets/the-city-is-art/VSL-2d3d-15.jpg';
import image15 from './assets/the-city-is-art/VSL-3d-8.jpg';
import image16 from './assets/the-city-is-art/VSL-3d-9.jpg';
import image17 from './assets/the-city-is-art/VSL-3d-10.jpg';
import image18 from './assets/the-city-is-art/VSL-3d-11.jpg';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

const id = '2020-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'the-city-is-art',
  name: 'The City is Art',
  projectType: ProjectCategory.Design,
  description: 'Digital Futures World 2020 Workshop',
  keyImage: keyImage,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
};

const maxColumnCount = 2;

export const theCityIsArt: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(keyImage, metaData.name, 1970, 2183),
  projectContent: [
    createText(
      maxColumnCount,
      [
        'neural style transfers',
        'The rise of Artificial Intelligence in recent years have posed a challenge to the architecture community. How will this novel technology impact our profession? This Workshop interrogates the rise of AI from two distinct directions: The implication for the discourse of the discipline and the technical know-how to make an impact as an architect in the emerging ecology of AI applications.',
      ],
      'In this course the basic architectural building blocks are revisited through the eyes of the machine. Working with multiple trained GANs - generative adversarial neural networks - images and features of objects are deconstructed and fused into new compositions. Instead of sticking to only typical architecture, this method also allows us to significantly expand the traditional architectural canon. To this end I tried to blend my passion for urban design with my love for modern art.',
      'Besides the city-scapes generated, this exploration also led to an exploration on the relationship between topology, geometry and their ambiguous yet often underexplored relationship with color.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
        image9,
        image10,
        image11,
        image12,
        image14,
        image16,
        image17,
        image15,
        image18,
        image13,
      ].map((image) => createImage(image, '©️ J.W.')),
    },
  ],
};
