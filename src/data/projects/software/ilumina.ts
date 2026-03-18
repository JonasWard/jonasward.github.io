import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';
import { Technologies } from 'src/types/keywords/technologies';

import favorites from './assets/ilumina/favorites.webp';
import landing from './assets/ilumina/landing.webp';
import sliding from './assets/ilumina/sliding.webp';
import title from './assets/ilumina/title.webp';

import lamp_01 from './assets/ilumina/lamp_01.jpg';
import lamp_02 from './assets/ilumina/lamp_02.jpg';
import lamp_03 from './assets/ilumina/lamp_03.jpg';
import lamp_04 from './assets/ilumina/lamp_04.jpg';
import lamp_05 from './assets/ilumina/lamp_05.jpg';
import lamp_06 from './assets/ilumina/lamp_06.jpg';
import lamp_07 from './assets/ilumina/lamp_07.jpg';
import lamp_08 from './assets/ilumina/lamp_08.jpg';
import lamp_09 from './assets/ilumina/lamp_09.jpg';
import lamp_10 from './assets/ilumina/lamp_10.jpg';

const id = '2025-05';

const metaData: ProjectMetaData = {
  id,
  webstring: 'ilumina',
  name: 'iLumina',
  projectType: ProjectCategory.Software,
  description: 'Browser based lamp configurator',
  keyImage: title,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Keywords.Frontend, Keywords.ThreeDPrinting, Keywords.Lamps, Technologies.NextJS],
  projectPartners: ['Regula Huber']
};

export const ilumina: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(title, metaData.name, 1348, 1522),
  projectContent: [
    createText(
      2,
      [
        'Tinder like Swipe-selecting lamp configurator',
        'iLumina serves as a POC for an SDF based lamp configurator, where the pattern can be selected through a swipe-selecting interface.'
      ],
      'The lamps shown in the pictures were made with Lucerna Lecto'
    ),
    {
      type: ProjectContentType.ExternalLinkList,
      links: [
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://jonasward.github.io/ilumina/',
          alternativeName: 'GitHub Pages Deployment'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://jonasward.github.io/lucerna-lecto/',
          alternativeName: 'Lucerna Lecto Deployment'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/lucerna-lecto/',
          alternativeName: 'About Lucerna Lecto'
        }
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(sliding, 'Swipe-selecting'),
        createImage(favorites, 'Favorites'),
        createImage(landing, 'Landing page + Localisation')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [lamp_01, lamp_02, lamp_03, lamp_04, lamp_05, lamp_06, lamp_07, lamp_08, lamp_09, lamp_10].map((i) =>
        createImage(i, '© R.Huber')
      )
    }
  ]
};
