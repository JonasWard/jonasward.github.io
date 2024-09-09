import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import lampsBoekentorenLogo from './assets/lamps/boekentorenLogo.png';
import lampsBoekentorenInSitu from './assets/lamps/boekentorenInSitu.jpg';
import lampsBoekentoren from './assets/lamps/boekentorenSolo.jpg';
import lampsBoekentorenvBoekentoren from './assets/lamps/boekentorenVsBoekentoren.jpg';
import lampsFrituurLogo from './assets/lamps/Futurist Logo.png';
import lampsFrituurMultiple from './assets/lamps/frituurMultiple.jpg';
import lampsFrituurSingle from './assets/lamps/frituurSingle.jpg';
import lampsMASLogo from './assets/lamps/MAS Logo.png';
import lampsMAS1 from './assets/lamps/mas800.jpg';
import lampsMAS2 from './assets/lamps/mas2.jpg';
import lampsQuadrato from './assets/lamps/quadrato.jpg';
import lampsQuadratoLogo from './assets/lamps/quadratoLogo.png';
import lampsAntikabirLogo from './assets/lamps/antikabirLogo.png';
import lampsAntikabir1 from './assets/lamps/Voor.jpg';
import lampsAntikabir2 from './assets/lamps/Zij.jpg';
import lampsAntikabir3 from './assets/lamps/Perspectief 2.jpg';
import lampsAntikabir4 from './assets/lamps/Perspectief.jpg';

const id = '2018-03';

const metaData: ProjectMetaData = {
  id,
  webstring: 'lamps',
  name: 'Lamps',
  projectType: ProjectCategory.Architecture,
  description: 'Table Lamp Designs',
  keyImage: undefined,
  projectContext: ProjectContext.Academic,
  projectPartnerContext: ProjectPartnerContext.Solo,
};

export const lamps: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(lampsBoekentoren, metaData.name, 2048, 2048),
  projectContent: [
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsBoekentorenLogo, lampsBoekentorenvBoekentoren, lampsBoekentoren, lampsBoekentorenInSitu].map((i) => createImage(i, '©️ J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsFrituurLogo, lampsFrituurSingle, lampsFrituurMultiple].map((i) => createImage(i, '©️ J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsMASLogo, lampsMAS1, lampsMAS2].map((i) => createImage(i, '©️ J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsQuadratoLogo, lampsQuadrato].map((i) => createImage(i, '©️ J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsAntikabirLogo, lampsAntikabir3, lampsAntikabir1, lampsAntikabir2, lampsAntikabir4].map((i) => createImage(i, '©️ J.W.')),
    },
  ],
};
