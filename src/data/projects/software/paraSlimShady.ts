import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';

import projectImage from './assets/paraSlimShady/babylon_2.jpg';
import babylon3 from './assets/paraSlimShady/babylon_3.jpg';
import babylon4 from './assets/paraSlimShady/babylon_4.jpg';

import julierTurm1 from './assets/paraSlimShady/julierTurm_1.jpg';
import julierTurm2 from './assets/paraSlimShady/julierTurm_2.jpg';
import julierTurm3 from './assets/paraSlimShady/julierTurm_3.jpg';
import julierTurm4 from './assets/paraSlimShady/julierTurm_4.jpg';

import references1 from './assets/paraSlimShady/references_1.jpg';
import references2 from './assets/paraSlimShady/references_2.png';
import references3 from './assets/paraSlimShady/references_3.jpg';
import references4 from './assets/paraSlimShady/references_4.jpg';

import { ProjectContentType } from '../../../types/projectContent/projectContentType';

const id = '2024-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'para-slim-shady',
  name: 'Santini at Home',
  projectType: ProjectCategory.Software,
  description: 'POC for a browser based lamp configurator',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Keywords.ThreeDPrinting],
  projectPartners: ['Malcolm Ungers'],
};

export const paraSlimShady: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name, 2048, 1273),
  projectContent: [
    createText(
      2,
      ['AEC Hackathon 2024', 'This project was developed together during the AEC Hackathon 2024 in Zürich.'],
      "A derivative of a prototype based on the 'Julierturm' that I made for a friend back in 2023"
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [projectImage, babylon3, babylon4].map((i) => createImage(i, '©️J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [julierTurm1, julierTurm2, julierTurm3, julierTurm4].map((i) => createImage(i, '©️J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [references1, references2, references3, references4].map((i) => createImage(i, '©️J.W.')),
    },
  ],
};
