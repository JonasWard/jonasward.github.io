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

import logo from './assets/vibed-reused-tiled/logo.webp?responsive&lossless';
import logoCard from './assets/vibed-reused-tiled/logo.webp?responsive&lossless&card';

import landing from './assets/vibed-reused-tiled/landing.webp?responsive';
import project from './assets/vibed-reused-tiled/project.webp?responsive';
import tiles from './assets/vibed-reused-tiled/tiles.webp?responsive';
import materials from './assets/vibed-reused-tiled/materials.webp?responsive';
import stock from './assets/vibed-reused-tiled/stock.webp?responsive';
import tileSchema from './assets/vibed-reused-tiled/tile-schema.webp?responsive';
import boundaries from './assets/vibed-reused-tiled/boundaries.webp?responsive';
import solve from './assets/vibed-reused-tiled/solve.webp?responsive';
import view2d from './assets/vibed-reused-tiled/view-2d.webp?responsive';
import tileStockSampler from './assets/vibed-reused-tiled/tile-stock-sampler.webp?responsive';
import tilePatterns from './assets/vibed-reused-tiled/tile-patterns.webp?responsive';
import tilingBlockAndCourse from './assets/vibed-reused-tiled/tiling-block-and-course.webp?responsive';
import tilingBasketweave from './assets/vibed-reused-tiled/tiling-basketweave.webp?responsive';
import tilingStaircase from './assets/vibed-reused-tiled/tiling-staircase.webp?responsive';
import tilingChecker from './assets/vibed-reused-tiled/tiling-checker.webp?responsive';

const id = '2026-08';

const SITE = 'https://repurposed-ch.github.io/vibed-reused-tiled/';

const view = (picture: ResponsivePicture, caption: string, path: string) => ({
  ...createImage(picture, caption),
  link: { href: `${SITE}${path}`, title: 'Open this view' }
});

// the svg-sdf settings the logo was rendered with, packed with densing; the svg itself is not part of the link
const logoSettings =
  'https://jonasward.ch/svg-sdf/?s=J_AeInM1LMABg9vTvIACs6VX0b5vR-jo9P8gAHBYQPqwejv6OK2eh0xQgA9Ggw-ndfxweL2ShLhZD1--AChYcPEzKqJgcAAn____kwr___-laQnEA1m';

const metaData: ProjectMetaData = {
  id,
  webstring: 'vibed-reused-tiled',
  name: 'Vibed · Reused · Tiled',
  projectType: ProjectCategory.Software,
  description: 'Design families for an uncertain reused tile stock',
  keyImage: logoCard,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [
    Keywords.Frontend,
    Keywords.Reuse,
    Keywords.Hackathon,
    Technologies.TypeScript,
    Technologies.ReactThreeFiber,
    Technologies.AI
  ],
  projectPartners: ['Harrison Hildebrandt', 'Moritz Funck']
};

export const vibedReusedTiled: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(tilingBlockAndCourse, metaData.name),
  projectContent: [
    createText(
      2,
      [
        'Vibed · Reused · Tiled',
        'Industrial materials are calibrated to demand, reused ones are not. A reused tile stock is only known roughly: rough dimensions, rough properties and a rough idea of how many of each kind there will be. So rather than drawing one fixed layout, the designer describes an intention - a vibe - as a design family. Made at the DMS 2026 hackathon.'
      ],
      'The app walks through six steps: tiles and materials, the stock as exact counts or as distributions, the design family as a repeating schema, the boundaries that have to be tiled, a solve that samples the stock and fills the boundary, and finally a 2D view for print and a 3D view with GLB and USDZ export for AR. Optionally an LLM drafts the design family, its answer has to validate as JSON before it is applied.',
      'Two example projects grew out of the same hackathon: the Tile Stock Image Sampler by Harrison Hildebrandt, which counts a tile stock from a photo with Python and OpenCV, and Tile Patterns by Moritz Funck, a generator that fills an area with two or three tile formats by area share.'
    ),
    {
      type: ProjectContentType.ExternalLinkList,
      links: [
        {
          type: ProjectContentType.ExternalLink,
          href: SITE,
          alternativeName: 'GitHub Pages Deployment'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://github.com/repurposed-ch/vibed-reused-tiled',
          alternativeName: 'github'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/repurposed/',
          alternativeName: 'Repurposed'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/sdf-svg/',
          alternativeName: 'SVG SDF'
        }
      ]
    },
    {
      ...createImage(logo, 'Logo rendered with SVG SDF © J.W.'),
      link: { href: logoSettings, title: 'Open these settings in the playground' }
    },
    createText(1, [
      'Example tilings',
      'A few red and blue projects made in the app, each from one of its pattern presets, with terracotta, zellige, azulejo and encaustic materials. Rendered in the 3D view.'
    ]),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        view(tilingBlockAndCourse, 'Block and course', 'app/#/view/3d'),
        view(tilingBasketweave, 'Basketweave', 'app/#/view/3d'),
        view(tilingStaircase, 'Staircase', 'app/#/view/3d'),
        view(tilingChecker, 'Checker', 'app/#/view/3d')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        view(project, 'Project overview', 'app/#/'),
        view(tiles, '1 - Tile definitions', 'app/#/tiles'),
        view(materials, '1 - Materials, trees of SDF operations', 'app/#/materials'),
        view(stock, '2 - Stock as distributions', 'app/#/stock'),
        view(tileSchema, '3 - Design family as a tile schema', 'app/#/tile-schema'),
        view(boundaries, '4 - Boundaries', 'app/#/boundaries'),
        view(solve, '5 - Solve', 'app/#/solve'),
        view(view2d, '6 - 2D view', 'app/#/view/2d')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        view(landing, 'Landing page', ''),
        view(tileStockSampler, 'Tile Stock Image Sampler - Harrison Hildebrandt', 'examples/tile-stock-sampler/'),
        view(tilePatterns, 'Tile Patterns - Moritz Funck', 'examples/tile-patterns/')
      ]
    }
  ]
};
