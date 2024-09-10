import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import image1 from './assets/impact-clay/BaseBulgeRange.jpg';
import image2 from './assets/impact-clay/Bulging.jpg';
import image3 from './assets/impact-clay/ComplicatedDots.jpg';
import image4 from './assets/impact-clay/DotDistance.jpg';
import image5 from './assets/impact-clay/Dragon.jpg';
import image6 from './assets/impact-clay/ImpactClay_BaselineTests.jpg';
import image7 from './assets/impact-clay/Pressing.jpg';
import keyImage from './assets/impact-clay/Ray.jpg';
import image9 from './assets/impact-clay/SetUp.jpg';
import image10 from './assets/impact-clay/SetUp2.jpg';
import image11 from './assets/impact-clay/Stacking.jpg';
import image12 from './assets/impact-clay/Tiles.png';

const id = '2018-03';

const metaData: ProjectMetaData = {
  id,
  webstring: 'impact-clay',
  name: 'Impact Clay',
  projectType: ProjectCategory.Design,
  description: 'roboticly deposited clay artefacts',
  keyImage: keyImage,
  projectContext: ProjectContext.Academic,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Keywords.Knitting, Keywords.Patterns],
  projectPartners: ['Nik Eftekar', 'Rahul Girish'],
};

export const impactClay: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(keyImage, metaData.name, 2048, 2048),
  projectContent: [
    createText(
      2,
      [
        'Impact clay was a four-week design and build assignment investigating a novel fabrication process for highly viscous materials. The setup consists of a small-scale six-axis robotic arm manipulating an end-effector that allows to cut out projectiles of different sizes, position them, and press them into their respective shapes by linear pneumatic actuation. Through iterations of empiric testing, design simulation, and physical prototyping different typologies of the technique were explored.',
        'varied impressions',
      ],
      [
        'From a conceptual perspective we decided very quickly to try and develop a workflow that allowed for the production of 2D surface elements. But rather than playing with informed geometries, we opted to delve deeper in one specific aspect of clay namely it’s malleability. Even though this process knows many parameters, we opted to only variate one. Namely the distance between a new bullet to be placed and the once preceding them. By variating only this we were able to introduce a unique expression in our objects which were both of aesthetic as structural relevance. By reducing the distance (what we called the pressure depth) one locally reduces the weight of the detailing while increasing the thickness of the structure. This idea also helped improve the interlocking behavior of the projectiles and made us able to considerably improve the robustness and speed of the fabrication process.',
        undefined,
      ]
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [image1, image2, image3, image4, image5, image6, image7, image9, image10, image11, image12].map((i) => createImage(i, '©️J.W.')),
    },
  ],
};
