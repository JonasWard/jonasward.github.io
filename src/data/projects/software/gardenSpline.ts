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

import logo from './assets/garden-spline/logo.webp?responsive&lossless';
import logoCard from './assets/garden-spline/logo.webp?responsive&lossless&card';

import hero from './assets/garden-spline/hero.webp?responsive&hero';
import quad from './assets/garden-spline/quad.webp?responsive';
import tri from './assets/garden-spline/tri.webp?responsive';
import hex from './assets/garden-spline/hex.webp?responsive';
import octagonal from './assets/garden-spline/octagonal.webp?responsive';
import surface from './assets/garden-spline/surface.webp?responsive';
import axis from './assets/garden-spline/axis.webp?responsive';
import faces from './assets/garden-spline/faces.webp?responsive';
import inline from './assets/garden-spline/inline.webp?responsive';
import pdf from './assets/garden-spline/pdf.webp?responsive';
import phone from './assets/garden-spline/phone.webp?responsive';

const id = '2026-06';

const APP = 'https://jonasward.github.io/garden-spline/configurator/';

// the whole shell lives in ?state=, the camera is not part of it and zooms to the shell on load
const STATE = {
  quad: 'A0YmNEJUlSDPufaWL6H0HCL6H0HCrVn2li-h9BwgvofQcIvofRLC-h9EsAvofRLC-h9EsC-h9BwgvofQcLPtaqWL6H0HCL6H0HCrVWqliMYOmV',
  tri: 'AwYohKkqQZ9z7SxfQ-g4RfQ-g4Vas-0sX0PoOEF9D6DhF9D6JYX0PolgF9D6JYX0PolgX0PoOEF9D6DhZ9rVSxfQ-g4RfQ-g4Vaq1UsRjB0yo',
  hex: 'A4YohKkqQZ9z7SxfQ-g4RfQ-g4Vas-0sX0PoOEF9D6DhF9D6JYX0PolgF9D6JYX0PolgX0PoOEF9D6DhZ9rVSxfQ-g4RfQ-g4Vaq1UsRjB0yo',
  octagonal:
    'A8YmNEJUlSDPufaWL6H0HCL6H0HCrVn2li-h9BwgvofQcIvofRLC-h9EsAvofRLC-h9EsC-h9BwgvofQcLPtaqWL6H0HCL6H0HCrVWqliMYOmV',
  surface:
    'A0YmNEJUlSDPufaWL6H0HCL6H0HCrVn2li-h9BwgvofQcIvofRLC-h9EsAvofRLC-h9EsC-h9BwgvofQcLPtaqWL6H0HCL6H0HCrVWqliMYOmN',
  axis: 'A0YmNEJUlSDPufaWL6H0HCL6H0HCrVn2li-h9BwgvofQcIvofRLC-h9EsAvofRLC-h9EsC-h9BwgvofQcLPtaqWL6H0HCL6H0HCrVWqliMYOnl',
  faces: 'A0YmNEJUlSDPufaWL6H0HCL6H0HCrVn2li-h9BwgvofQcIvofRLC-h9EsAvofRLC-h9EsC-h9BwgvofQcLPtaqWL6H0HCL6H0HCrVWqliMYOmH',
  inline: 'A0YmNEJUlSDPufaWL6H0HCL6H0HCrVn2li-h9BwgvofQcIvofRLC-h9EsAvofRLC-h9EsC-h9BwgvofQcLPtaqWL6H0HCL6H0HCrVWqlgHYdlQ'
};

const view = (picture: ResponsivePicture, caption: string, state: keyof typeof STATE) => ({
  ...createImage(picture, caption),
  link: { href: `${APP}?state=${STATE[state]}`, title: 'Open this shell in the configurator' }
});

// the svg-sdf settings the logo was rendered with, packed with densing; the svg itself is not part of the link
const logoSettings =
  'https://jonasward.github.io/svg-sdf/?s=J_AeAnMALuABg9PHqIACs6VX0b5vR-jo9P8gAHBYQPqwejv6OK2eh0xQgA3R6U-mzbvQAHV-g-jZD1--AChYcPEzKqJwcAAedmJEZwr___-lSQnEA18';

const metaData: ProjectMetaData = {
  id,
  webstring: 'garden-spline',
  name: 'Garden Spline',
  projectType: ProjectCategory.Software,
  description: 'Silly little gridshell configurator',
  keyImage: logoCard,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [
    Keywords.Frontend,
    Keywords.Geometry,
    Keywords.Timber,
    Technologies.TypeScript,
    Technologies.ReactThreeFiber,
    Technologies.NextJS,
    Technologies.Densing
  ]
};

export const gardenSpline: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(hero, metaData.name),
  projectContent: [
    createText(
      2,
      [
        'Garden Spline',
        'Silly little parametric gridshell configurator. The shape starts from a coarse grid of control points, n by m spans with a spacing in x and y, of which every point can be moved, by default only up and down. That grid is smoothed with Catmull-Clark subdivision into a reference surface.'
      ],
      'On top of it a planar pattern - triangular, quad, hex or octagonal - is drawn in the uv space of the surface and lifted onto it. Every edge of the pattern becomes a beam, either inline or stacked in a number of layers, the way the laths of a timber gridshell are. Though nothing is relaxed or checked structurally yet, the laths simply follow the surface.',
      'Entire state stored in the url, packed with densing! The PDF export has a top, front and left view, the number of beams, the overall size and a QR code back to the configuration.'
    ),
    {
      type: ProjectContentType.ExternalLinkList,
      links: [
        {
          type: ProjectContentType.ExternalLink,
          href: APP,
          alternativeName: 'GitHub Pages Deployment'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://github.com/JonasWard/garden-spline',
          alternativeName: 'github'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/densing/',
          alternativeName: 'Densing'
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
    {
      type: ProjectContentType.ImageGrid,
      images: [
        view(quad, 'Quad', 'quad'),
        view(tri, 'Triangular', 'tri'),
        view(hex, 'Hex', 'hex'),
        view(octagonal, 'Octagonal', 'octagonal')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        view(surface, 'Reference surface and its control points', 'surface'),
        view(axis, 'Pattern in uv space and lifted onto the surface', 'axis'),
        view(faces, 'Divided faces and wireframe', 'faces'),
        view(inline, 'Inline beams', 'inline')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [view(pdf, 'PDF export', 'quad'), view(phone, 'On a phone', 'quad')]
    }
  ]
};
