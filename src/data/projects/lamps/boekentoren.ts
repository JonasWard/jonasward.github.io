import { ProjectCategory } from 'src/types/keywords/categoryTypes';
import { Keywords } from 'src/types/keywords/keywords';
import { ProjectContext } from 'src/types/keywords/projectContext';
import { ProjectPartnerContext } from 'src/types/keywords/projectPartnerContext';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { ProjectData } from 'src/types/projectContent/projectData';
import { ProjectMetaData } from 'src/types/projectContent/projectMetaData';
import { createTitleImage, createImage } from 'src/utils/projectconstructor';

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
  keywords: [Keywords.LaserCutting, Keywords.Product]
};

export const boekentoren: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(lampsBoekentoren, metaData.name, 2048, 2048),
  projectContent: [
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsBoekentorenLogo, lampsBoekentoren].map((i) => createImage(i, '© J.W.'))
    }
  ]
};
