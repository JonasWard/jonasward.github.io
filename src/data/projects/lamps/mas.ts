import { ProjectCategory } from 'src/types/keywords/categoryTypes';
import { Keywords } from 'src/types/keywords/keywords';
import { ProjectContext } from 'src/types/keywords/projectContext';
import { ProjectPartnerContext } from 'src/types/keywords/projectPartnerContext';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { ProjectData } from 'src/types/projectContent/projectData';
import { ProjectMetaData } from 'src/types/projectContent/projectMetaData';
import { createTitleImage, createImage, createTextImage } from 'src/utils/projectconstructor';

import lampsMASLogo from './assets/MAS Logo.png';
import lampsMAS1 from './assets/mas800.jpg';
import lampsMAS2 from './assets/mas2.jpg';

const id = '2018-03';

const metaData: ProjectMetaData = {
  id,
  webstring: 'mas',
  name: 'MAS',
  projectType: ProjectCategory.Lamps,
  description: 'Lamp Design of the MAS by Neutelings Riedyck Architecten',
  keyImage: lampsMAS2,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.LaserCutting, Keywords.Product, Keywords.Architecture]
};

export const mas: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(lampsMAS2, metaData.name, 2048, 2048),
  projectContent: [
    createTextImage(
      lampsMASLogo,
      `The MAS is a museum of the city of Antwerp designed by Neutelings Riedyck Architecten.`,
      'NEUTELINGS-RIEDIJK ARCHITECTEN © the MAS',
      undefined,
      undefined,
      undefined,
      200
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsMAS1, lampsMAS2].map((i) => createImage(i, '© J.W.'))
    }
  ]
};
