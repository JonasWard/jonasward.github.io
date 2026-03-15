import { ProjectCategory } from 'src/types/keywords/categoryTypes';
import { Keywords } from 'src/types/keywords/keywords';
import { ProjectContext } from 'src/types/keywords/projectContext';
import { ProjectPartnerContext } from 'src/types/keywords/projectPartnerContext';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { ProjectData } from 'src/types/projectContent/projectData';
import { ProjectMetaData } from 'src/types/projectContent/projectMetaData';
import { createTitleImage, createImage, createTextImage } from 'src/utils/projectconstructor';

const id = '2018-01';

import lampsBoekentorenLogo from './assets/boekentorenLogo.png';
import lampsBoekentorenInSitu from './assets/boekentorenInSitu.jpg';
import lampsBoekentoren from './assets/boekentorenSolo.jpg';
import lampsBoekentorenvBoekentoren from './assets/boekentorenVsBoekentoren.jpg';

const metaData: ProjectMetaData = {
  id,
  webstring: 'boekentoren',
  name: 'Boekentoren',
  projectType: ProjectCategory.Lamps,
  description: 'Lamp Design of the Boekentoren by Henry Van de Velde',
  keyImage: lampsBoekentoren,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.LaserCutting, Keywords.Product, Keywords.Architecture]
};

export const boekentoren: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(lampsBoekentoren, metaData.name, 2048, 2048),
  projectContent: [
    createTextImage(
      lampsBoekentorenLogo,
      `The Boekentoren has a very pronounced impact on the Ghentian skyline. Having lived nearly my whole live in Ghent, this masterpiece of the modern movement has had a profound impact on my appreciation for modern architecture. Even more so when I decided to study architecture at the University of Ghent and ended up spending most of my accademical career literally studying and working in the shadow of the Boekentoren.`,
      'HENRY VAN DE VELDE © the Boekentoren',
      undefined,
      undefined,
      undefined,
      200
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsBoekentorenInSitu, lampsBoekentoren, lampsBoekentorenvBoekentoren].map((i) =>
        createImage(i, '© J.W.')
      )
    }
  ]
};
