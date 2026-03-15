import { ProjectCategory } from 'src/types/keywords/categoryTypes';
import { Keywords } from 'src/types/keywords/keywords';
import { ProjectContext } from 'src/types/keywords/projectContext';
import { ProjectPartnerContext } from 'src/types/keywords/projectPartnerContext';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { ProjectData } from 'src/types/projectContent/projectData';
import { ProjectMetaData } from 'src/types/projectContent/projectMetaData';
import { createTitleImage, createImage, createTextImage } from 'src/utils/projectconstructor';

import lampsQuadrato from './assets/quadrato.jpg';
import lampsQuadratoLogo from './assets/quadratoLogo.png';

const id = '2018-04';

const metaData: ProjectMetaData = {
  id,
  webstring: 'quadrato',
  name: 'Palazzo della Civiltà',
  projectType: ProjectCategory.Lamps,
  description: 'the Palazzo della Civiltà Italiana',
  keyImage: lampsQuadrato,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.LaserCutting, Keywords.Product, Keywords.Architecture]
};

export const quadrato: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(lampsQuadrato, metaData.name, 2048, 2048),
  projectContent: [
    createTextImage(
      lampsQuadratoLogo,
      `This beautiful though controversial building is one of the many architectural marvels built in Mussolinis Italy. The centerpiece of what was supposed to be the 1942 Esposizione Universale Roma - the modern-day 12th quarter of Rome - ended up being vacant for decades. The intended program for the building - a museum on the origin of Italy and it's relationship with Fascism - became obsolete when the second World War concluded and with it the Fascist state. Nonetheless is the building both an ode to simplicity as pre-modern architecture.`,
      'Giovanni Guerrini, Ernesto Lapadula & Mario Romano ©   the Palazzo della Civiltà Italiana',
      undefined,
      undefined,
      undefined,
      200
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsQuadrato].map((i) => createImage(i, '© J.W.'))
    }
  ]
};
