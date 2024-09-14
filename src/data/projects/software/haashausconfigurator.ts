import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import screenshot1 from './assets/haas-haus-configurator/221031_HFB_Screenshot_jvb_1.png';
import screenshot2 from './assets/haas-haus-configurator/221031_HFB_Screenshot_jvb_2.png';
import screenshot3 from './assets/haas-haus-configurator/221031_HFB_Screenshot_jvb_3.png';
import screenshot4 from './assets/haas-haus-configurator/221031_HFB_Screenshot_jvb_4.png';
import screenshot5 from './assets/haas-haus-configurator/221031_HFB_Screenshot_jvb_5.png';
import projectImage from './assets/haas-haus-configurator/haasCover.png';
import image1 from './assets/haas-haus-configurator/overview.png';
import image2 from './assets/haas-haus-configurator/searsCatalogue.jpg';

const id = '2022-02';

const metaData: ProjectMetaData = {
  id,
  webstring: 'haas-haus-configurator',
  name: 'Haas Haus Configurator',
  projectType: ProjectCategory.Software,
  description: 'End-user Catalogue Configurator',
  keyImage: projectImage,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Keywords.Frontend, Keywords.Development, Keywords.Timber],
  projectPartners: [],
};

export const haasHausConfigurator: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name, 1602, 1729),
  projectContent: [
    createText(
      2,
      [
        'Web application for digital building process',
        'The Haas House Configurator was developed by Design-to-Production for Haas Fertigbau. It is a cloud-based application that allows prospective clients to give shape to their dream house using a 2D/3D editor directly in their web browser.',
      ],
      'In a first step, a series of filters allows to find the best match in a collection of pre-configured houses of various sizes, floor levels, and typologies. After having picked one, the user can adapt the house to their desire . Possible changes range from architectural level (draw walls, join or split rooms, add balconies, garages, or annexes, pick the roof shape, change size and position of doors and windows) via technical configuration (heating, insulation, photovoltaics) to appearance and materialisation of every element.',
      'Every change is applied in real-time and visualised using 2D and 3D models of the building, accompanied by a live cost estimation. After a house has been contracted, Haas staff can export the 3D model into Revit and eventually Cadwork, forming a continuous digital chain from design to fabrication.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [createImage(image2, 'Sears Catalogue')],
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [image1, screenshot1, screenshot2, screenshot3, screenshot4, screenshot5].map((i) => createImage(i, '©️ J.W.')),
    },
  ],
};
