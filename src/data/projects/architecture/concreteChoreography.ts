import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import image1 from './assets/concrete-choreography/makingDetails.jpg';
import image2 from './assets/concrete-choreography/inAction_2.png';
import image3 from './assets/concrete-choreography/inAction_1.png';
import image4 from './assets/concrete-choreography/fabrication-setup-1.jpg';
import image5 from './assets/concrete-choreography/edit02_260A3586.jpg';
import keyImage from './assets/concrete-choreography/columnView.jpg';
import overviewNight from './assets/concrete-choreography/byNight.jpg';
import overviewDay from './assets/concrete-choreography/byDay.jpg';

const id = '2019-03';

const metaData: ProjectMetaData = {
  id,
  webstring: 'concrete-choreography',
  name: 'Concrete Choreography',
  projectType: ProjectCategory.Design,
  description: 'Concrete Printing',
  keyImage: keyImage,
  projectContext: ProjectContext.Academic,
  projectPartnerContext: ProjectPartnerContext.Team,
};

const maxColumnCount = 2;

export const concreteChoreography: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(keyImage, metaData.name, 1280, 1707),
  projectContent: [
    createText(
      maxColumnCount,
      [
        'From ancient civilizations to the present day, columns have served as elements of architecture particularly tied to the harmony, balance and proportion of architectural orders – so much so that they have come to be recognised as works of art in their own right. What could the contemporary design of a new column order enabled by emerging digital technologies be like?',
        'utopian columns',
      ],
      'In collaboration with the Origen Festival in Riom, Switzerland the installation Concrete Choreography consists of nine, individually designed, 2.7m tall columns. Each column is concrete 3D printed at full height in 2.5 hours with the process developed at ETH Zürich.',
      'Students of the Master of Advanced Studies in Digital Fabrication and Architecture explore the unique possibilities of layered extrusion printing, demonstrating the potential of computational design and digital fabrication for future concrete construction.',
      'This novel fabrication process allows the production of concrete elements without the need for any form work. In addition, one-of-a-kind designs with complex geometries can be fabricated in a fully automated manner. Hollow concrete structures are printed in a way where the material can be strategically used only where needed, allowing a more sustainable approach to concrete architecture.',
      'Framing and informing the dance performances of the 2019 summer season in Riom, the project showcases how technological advancements can bring efficient and novel expressions to concrete architecture.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [image1, image2, image3, image4, image5, keyImage, overviewNight, overviewDay].map((image) => createImage(image, '©️ J.W.')),
    },
  ],
};
