import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ResponsivePicture } from '../../../types/projectContent/projectImage';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';
import { Technologies } from 'src/types/keywords/technologies';

import alpenglow from './assets/hut-viewer/alpenglow.webp?responsive&lossless';

import allHuts from './assets/hut-viewer/all-huts.webp?responsive';
import freeBeds from './assets/hut-viewer/free-beds.webp?responsive';
import completelyFree from './assets/hut-viewer/completely-free.webp?responsive';
import area from './assets/hut-viewer/area.webp?responsive';
import areaCompletelyFree from './assets/hut-viewer/area-completely-free.webp?responsive';
import hoverCard from './assets/hut-viewer/hover-card.webp?responsive';
import hoverMarker from './assets/hut-viewer/hover-marker.webp?responsive';
import selected from './assets/hut-viewer/selected.webp?responsive';

const id = '2026-05';

const APP = 'https://hut-viewer.vercel.app/';
// the filters live in the url; without a date the app opens on today
const AREA = 'area=46.21785%2C7.62451%2C47.03269%2C9.01978';

const view = (picture: ResponsivePicture, caption: string, query: string) => ({
  ...createImage(picture, caption),
  link: { href: query ? `${APP}?${query}` : APP, title: 'Open this view in the app' }
});

// the svg-sdf settings the logo was rendered with, packed with densing; the svg itself is not part of the link
const logoSettings =
  'https://jonasward.github.io/svg-sdf/?s=J_AeAnMALuABgHRQwIACs6VX0b5vR-jo9P8gAHBYQPqwejv6OK2eh0xRAB_2kUpXkzxVKNafQAAdZKCNlkeZG4AKFhw8TMqonBYAB____6PCv___w';

const metaData: ProjectMetaData = {
  id,
  webstring: 'hut-viewer',
  name: 'Hut Viewer',
  projectType: ProjectCategory.Software,
  description: 'Map of Swiss Alpine Club huts and their free beds',
  keyImage: alpenglow,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Keywords.Frontend, Technologies.React, Technologies.TypeScript],
  projectPartners: ['Daniel Christev']
};

export const hutViewer: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(allHuts, metaData.name, 'black-on-white'),
  projectContent: [
    createText(
      2,
      [
        'Hut Viewer',
        'Map and list of the Swiss Alpine Club huts, with filters, area selection and the beds that are still free. Made together with Daniel Christev.'
      ],
      'The availability comes from hut-reservation.org, through a small edge proxy on Vercel that caches the answers for five minutes. Besides that it is a static frontend, React with a Leaflet map.',
      'Filters and the selected area are kept in the url, every screenshot below opens the same view for today. The logo was rendered with SVG SDF.'
    ),
    {
      type: ProjectContentType.ExternalLinkList,
      links: [
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://hut-viewer.vercel.app/',
          alternativeName: 'Vercel Deployment'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://github.com/bulgos/HutViewer',
          alternativeName: 'github'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/sdf-svg/',
          alternativeName: 'SVG SDF'
        }
      ]
    },
    {
      ...createImage(alpenglow, 'Logo rendered with SVG SDF © J.W.'),
      link: { href: logoSettings, title: 'Open these settings in the playground' }
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        view(allHuts, 'All huts', ''),
        view(freeBeds, 'At least one free bed', 'availability=min&minBeds=1'),
        view(completelyFree, 'Completely free', 'availability=free'),
        view(area, 'Area selection', AREA),
        view(areaCompletelyFree, 'Area selection, completely free', `${AREA}&availability=free`),
        view(hoverCard, 'Hovering a card', AREA),
        view(hoverMarker, 'Hovering a marker', AREA),
        view(selected, 'Selected hut, availability per night', AREA)
      ]
    },
  ]
};
