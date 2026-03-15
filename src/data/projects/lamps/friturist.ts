import { ProjectCategory } from 'src/types/keywords/categoryTypes';
import { Keywords } from 'src/types/keywords/keywords';
import { ProjectContext } from 'src/types/keywords/projectContext';
import { ProjectPartnerContext } from 'src/types/keywords/projectPartnerContext';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { ProjectData } from 'src/types/projectContent/projectData';
import { ProjectMetaData } from 'src/types/projectContent/projectMetaData';
import { createTitleImage, createImage, createTextImage } from 'src/utils/projectconstructor';

import lampsFrituurLogo from './assets/Futurist Logo.png';
import lampsFrituurMultiple from './assets/frituurMultiple.jpg';
import lampsFrituurSingle from './assets/frituurSingle.jpg';

const id = '2018-05';

const metaData: ProjectMetaData = {
  id,
  webstring: 'friturist-lamp',
  name: 'Frituur Futurist Lamp',
  projectType: ProjectCategory.Lamps,
  description: 'the Frituur Futurist Lamp',
  keyImage: lampsFrituurSingle,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.LaserCutting, Keywords.Product, Keywords.Architecture]
};

export const frituristLamp: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(lampsFrituurSingle, metaData.name, 1508, 2048),
  projectContent: [
    createTextImage(
      lampsFrituurLogo,
      `This beautiful though controversial building is one of the many architectural marvels built in Mussolinis Italy. The centerpiece of what was supposed to be the 1942 Esposizione Universale Roma - the modern-day 12th quarter of Rome - ended up being vacant for decades. The intended program for the building - a museum on the origin of Italy and it's relationship with Fascism - became obsolete when the second World War concluded and with it the Fascist state. Nonetheless is the building both an ode to simplicity as pre-modern architecture.`,
      'DOMINIQUE GIROLAMI JAN VERSTRAETE JONAS WARD ©    the Frituur Futurist',
      undefined,
      undefined,
      undefined,
      200
    ),
    {
      type: ProjectContentType.ExternalLink,
      href: '#/project/futurist',
      alternativeName: 'Frituur Futurist'
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsFrituurMultiple, lampsFrituurSingle].map((i) => createImage(i, '© J.W.'))
    }
  ]
};
