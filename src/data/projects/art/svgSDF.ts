import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { Keywords } from 'src/types/keywords/keywords';
import { Technologies } from 'src/types/keywords/technologies';

import denmarkDistance from './asssets/denmarkDistance.png?responsive';
import denmarkPolar from './asssets/denmarkPolar.png?responsive';
import mountains from './asssets/mountains.png?responsive';
import mountainsBis from './asssets/mountainsBis.png?responsive';
import swissDistance from './asssets/swissDistance.png?responsive';
import swissPolar from './asssets/swissPolar.png?responsive';
import swissRadial from './asssets/swissRadial.png?responsive';
import zurich from './asssets/zurich.png?responsive';
import belgium from './asssets/belgium.png?responsive';
import shape from './asssets/shape.webp?responsive';
import france from './asssets/france.webp?responsive';
import eastFlandersDistance from './asssets/east-flanders-distance.webp?responsive';
import eastFlandersHSV from './asssets/east-flanders-hsv.webp?responsive';
import eastFlandersRedBlue from './asssets/east-flanders-red-blue.webp?responsive';

const id = '2025-07';

const metaData: ProjectMetaData = {
  id,
  webstring: 'sdf-svg',
  name: 'SVG SDF',
  projectType: ProjectCategory.Art,
  description: 'SVG SDFs',
  keyImage: eastFlandersHSV,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.Shaders, Keywords.Patterns, Technologies.ReactThreeFiber, Technologies.SVG]
};

export const svgSDF: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(eastFlandersHSV, metaData.name),
  projectContent: [
    createText(2, [
      'SVG SDFs',
      'Little proof of concept to render SVGs with SDFs to get smooth and continuous distance fields for arbitrary shapes.'
    ]),
    {
      type: ProjectContentType.ExternalLink,
      href: 'https://jonasward.github.io/repurposed/#naked-app',
      alternativeName: 'Example App'
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [eastFlandersDistance, eastFlandersHSV, eastFlandersRedBlue, belgium].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [swissRadial, swissPolar, swissDistance, zurich].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [denmarkPolar, denmarkDistance].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [mountains, mountainsBis, shape, france].map((i) => createImage(i, '© J.W.'))
    }
  ]
};
