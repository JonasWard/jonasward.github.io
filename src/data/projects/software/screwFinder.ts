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

import screw from './assets/screw-finder/screw.webp?responsive&lossless';

import home from './assets/screw-finder/home.webp?responsive';
import table from './assets/screw-finder/table.webp?responsive';
import tableSearch from './assets/screw-finder/table-search.webp?responsive';
import cards from './assets/screw-finder/cards.webp?responsive';
import cardsSearch from './assets/screw-finder/cards-search.webp?responsive';
import fullcard from './assets/screw-finder/fullcard.webp?responsive';
import fullcardFull from './assets/screw-finder/fullcard-full.webp?responsive';
import pdfPage1 from './assets/screw-finder/pdf-page-1.webp?responsive';
import pdfPage2 from './assets/screw-finder/pdf-page-2.webp?responsive';
import pdfSpread from './assets/screw-finder/pdf-spread.webp?responsive';

const id = '2026-04';

const APP = 'https://design-to-production.github.io/screw-finder/';

const view = (picture: ResponsivePicture, caption: string, path: string) => ({
  ...createImage(picture, caption),
  link: { href: `${APP}${path}`, title: 'Open this view in the app' }
});

// the svg-sdf settings the logo was rendered with, packed with densing; the svg itself is not part of the link
const logoSettings =
  'https://jonasward.github.io/svg-sdf/?s=J_AeAnMALuABg9u_mIAFwTCn0uDIf-jwim4gA____ZD249j6NmkjwdFQgB5TKK-l6FBQhHWRRftZBUHIAChYcPEzKqJgWAAeuCYUe4pcEwo';

const metaData: ProjectMetaData = {
  id,
  webstring: 'screw-finder',
  name: 'Screw Finder',
  projectType: ProjectCategory.Software,
  description: 'Searchable screw catalog with printable cards',
  keyImage: screw,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Keywords.Frontend, Keywords.Timber, Keywords.Hackathon, Technologies.NextJS, Technologies.TypeScript, Technologies.ReactThreeFiber],
  client: 'Design-to-Production'
};

export const screwFinder: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(home, metaData.name, 'black-on-white'),
  projectContent: [
    createText(
      2,
      [
        'Screw Finder',
        'POC to browse screw catalogs, either as a sortable table or as visual cards. For now 538 screws from Rothoblaas and SPAX, with a fuzzy search over all of them.'
      ],
      'Every screw has its own full card with the whole catalog record and a geometry preview, rendered in the browser with react-three-fiber. The card can also be downloaded as a PDF.',
      'Static Next.js page, no backend used at all! The logo was rendered with SVG SDF.'
    ),
    {
      type: ProjectContentType.ExternalLinkList,
      links: [
        {
          type: ProjectContentType.ExternalLink,
          href: `${APP}cards/`,
          alternativeName: 'GitHub Pages Deployment'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://github.com/design-to-production/screw-finder',
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
      ...createImage(screw, 'Logo rendered with SVG SDF © J.W.'),
      link: { href: logoSettings, title: 'Open these settings in the playground' }
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        view(table, 'Table', 'table/'),
        view(tableSearch, 'Table, searching for washer heads', 'table/'),
        view(cards, 'Cards', 'cards/'),
        view(cardsSearch, 'Cards, searching for washer heads', 'cards/')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [view(fullcard, 'Full card', 'fullcard/70/'), view(fullcardFull, 'Full card, catalog record', 'fullcard/70/')]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        view(pdfPage1, 'PDF export, page 1', 'fullcard/70/'),
        view(pdfPage2, 'PDF export, page 2', 'fullcard/70/'),
        view(pdfSpread, 'PDF export, both pages', 'fullcard/70/')
      ]
    }
  ]
};
