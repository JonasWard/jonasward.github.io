import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';
import { Keywords } from '../../../types/keywords/keywords';

import lampsBoekentorenLogo from './assets/lamps/boekentorenLogo.png?responsive';
import lampsBoekentorenInSitu from './assets/lamps/boekentorenInSitu.jpg?responsive';
import lampsBoekentoren from './assets/lamps/boekentorenSolo.jpg?responsive';
import lampsBoekentorenvBoekentoren from './assets/lamps/boekentorenVsBoekentoren.jpg?responsive';
import lampsFrituurLogo from './assets/lamps/Futurist Logo.png?responsive';
import lampsFrituurMultiple from './assets/lamps/frituurMultiple.jpg?responsive';
import lampsFrituurSingle from './assets/lamps/frituurSingle.jpg?responsive';
import lampsMASLogo from './assets/lamps/MAS Logo.png?responsive';

import lampsMAS1 from './assets/lamps/mas800.jpg?responsive';
import lampsMAS2 from './assets/lamps/mas2.jpg?responsive';
import lampsQuadrato from './assets/lamps/quadrato.jpg?responsive';
import lampsQuadratoLogo from './assets/lamps/quadratoLogo.png?responsive';
import lampsAntikabirLogo from './assets/lamps/antikabirLogo.png?responsive';
import lampsAntikabir1 from './assets/lamps/Voor.jpg?responsive';
import lampsAntikabir2 from './assets/lamps/Zij.jpg?responsive';
import lampsAntikabir3 from './assets/lamps/Perspectief 2.jpg?responsive';
import lampsAntikabir4 from './assets/lamps/Perspectief.jpg?responsive';

const id = '2018-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'lamps',
  name: 'Lamps',
  projectType: ProjectCategory.Architecture,
  description: 'Table Lamp Designs',
  keyImage: lampsBoekentoren,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.DigitalFabrication, Keywords.Product, Keywords.Patterns]
};

export const lamps: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(lampsBoekentoren, metaData.name),
  projectContent: [
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsBoekentorenLogo, lampsBoekentoren].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsBoekentorenvBoekentoren, lampsBoekentorenInSitu].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsFrituurLogo, lampsFrituurSingle].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsFrituurMultiple].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsMASLogo, lampsMAS1].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsMAS2].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsQuadratoLogo, lampsQuadrato].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsAntikabirLogo, lampsAntikabir3].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsAntikabir1, lampsAntikabir2, lampsAntikabir4].map((i) => createImage(i, '© J.W.'))
    }
  ]
};
