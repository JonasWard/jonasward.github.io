import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { Keywords } from 'src/types/keywords/keywords';

import denmarkDistance from './asssets/denmarkDistance.png';
import denmarkPolar from './asssets/denmarkPolar.png';
import eastFlanders from './asssets/east-flanders.png';
import mountains from './asssets/mountains.png';
import mountainsBis from './asssets/mountainsBis.png';
import swissDistance from './asssets/swissDistance.png';
import swissPolar from './asssets/swissPolar.png';
import swissRadial from './asssets/swissRadial.png';
import zurich from './asssets/zurich.png';
import belgium from './asssets/belgium.png';

const id = '2025-07';

const metaData: ProjectMetaData = {
  id,
  webstring: 'sdf-svg',
  name: 'SVG SDF',
  projectType: ProjectCategory.Art,
  description: 'SVG SDFs',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.Shaders, Keywords.Patterns]
};

export const svgSDF: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(zurich, metaData.name, 938, 1010),
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
      images: [eastFlanders, belgium].map((i) => createImage(i, '© J.W.'))
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
      images: [mountains, mountainsBis].map((i) => createImage(i, '© J.W.'))
    }
  ]
};
