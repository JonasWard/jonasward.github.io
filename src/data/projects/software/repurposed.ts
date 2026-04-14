import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';
import { Technologies } from 'src/types/keywords/technologies';

import addTileView from './assets/repurposed/add-tile-view.png';
import add from './assets/repurposed/add.png';
import areaSearcher from './assets/repurposed/area-searcher.webp';
import detailed3d from './assets/repurposed/detailed-3d.png';
import detailedPdf from './assets/repurposed/detailed-pdf.png';
import landing from './assets/repurposed/landing.png';
import marketplaceOverview from './assets/repurposed/marketplace-overview.webp';
import slides from './assets/repurposed/slides.webp';
import tableView from './assets/repurposed/table-view.png';
import repurposedMorePadding from './assets/repurposed/repurposed-more-padding.svg';

const id = '2026-02';

const metaData: ProjectMetaData = {
  id,
  webstring: 'repurposed',
  name: 'Repurposed',
  projectType: ProjectCategory.Software,
  description: 'POC Marketplace for reuse Marketplaces',
  keyImage: repurposedMorePadding,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [
    Keywords.Frontend,
    Keywords.Ecology,
    Keywords.Reuse,
    Keywords.Hackathon,
    Technologies.TypeScript,
    Technologies.Convex,
    Technologies.AI
  ],
  projectPartners: ['Amir Hossein Rezaei Cherati', 'Edyta Baran', 'Vishwajeet Mane']
};

export const repurposed: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(repurposedMorePadding, metaData.name, 1400, 1400),
  projectContent: [
    createText(
      2,
      [
        'Repurposed is a POC for a general purpose marketplace for reuse construction elements.',
        'From Idea to Prototype in 24 hours. Leveraging AI to populate data from images, cad interface for visualising (partial) inputs.'
      ],
      'This project is a static frontend page, using next.js, convex backend.'
    ),
    {
      type: ProjectContentType.ExternalLinkList,
      links: [
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://docs.google.com/presentation/d/1lFfRR2D0_vmYPDhMb7PvIsVMYlRNOBuqEcVvR35ao3s/edit?usp=sharing',
          alternativeName: 'Google Slides Presentation'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://jonasward.github.io/repurposed/',
          alternativeName: 'Deployment'
        }
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(landing, 'landing'),
        createImage(marketplaceOverview, 'Overview'),
        createImage(detailed3d, 'detailed - 3d view'),
        createImage(detailedPdf, 'detailed - pdf view'),
        createImage(add, 'adding elements'),
        createImage(addTileView, 'adding tile'),
        createImage(areaSearcher, 'area searcher'),
        createImage(slides, 'Tinder Sliding'),
        createImage(tableView, 'table view')
      ]
    }
  ]
};
