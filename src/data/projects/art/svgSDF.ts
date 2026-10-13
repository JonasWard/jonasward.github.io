import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { Keywords } from 'src/types/keywords/keywords';
import { Technologies } from 'src/types/keywords/technologies';
import { densingBuilderViews } from '../densingBuilderViews';

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
import builderSvgSdf from '../software/assets/densing/builder-svg-sdf.webp?responsive&lossless';

const id = '2025-07';

const metaData: ProjectMetaData = {
  id,
  webstring: 'sdf-svg',
  name: 'SVG SDF',
  projectType: ProjectCategory.Art,
  description: 'Signed Distance Fields from SVGs',
  keyImage: eastFlandersHSV,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.Shaders, Keywords.Patterns, Technologies.ReactThreeFiber, Technologies.SVG, Technologies.Densing]
};

export const svgSDF: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(eastFlandersHSV, metaData.name),
  projectContent: [
    createText(
      2,
      [
        'SVG SDFs',
        'Little proof of concept to render SVGs with SDFs to get smooth and continuous distance fields for arbitrary shapes.'
      ],
      'The SVG is parsed in the browser and for every pixel of a fixed-resolution buffer four numbers are stored: the signed distance to the nearest edge, the vector pointing towards it and the shape it belongs to. All coloring happens afterwards in a fragment shader - hue from the direction, strength from the distance, contour lines on top - so playing with the settings never recomputes the buffer.'
    ),
    {
      type: ProjectContentType.ExternalLink,
      href: 'https://jonasward.github.io/svg-sdf/',
      alternativeName: 'Playground'
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [eastFlandersDistance, eastFlandersHSV, eastFlandersRedBlue, belgium].map((i) => createImage(i, '© J.W.'))
    },
    createText(
      2,
      [
        'Curves and Metrics',
        'In a first version all curves were flattened into polylines. Cheap, though the direction to the nearest edge is then constant along every straight piece, which shows up as bands as soon as you color by direction. Therefore curves can now also stay cubic Béziers, with the distance measured to the actual curve.'
      ],
      'Also the distance itself does not have to be the Euclidean one. Manhattan, Chebyshev, Lp and polygon metrics are implemented as well, each of which can be rotated and stretched.',
      [
        'Compute',
        'The buffer is computed with WebGPU, with WebGL2 or, when neither is available, on the CPU with up to 8 web workers. The CPU version is the reference, the GPU buffers match it to within about 1e-4 of a pixel.'
      ],
      'You can load your own SVG and export the result as a PNG or as the raw buffer, feel free to try it out!'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [swissRadial, swissPolar, swissDistance, zurich].map((i) => createImage(i, '© J.W.'))
    },
    createText(1, [
      'State in URL',
      'Settings and view are kept in the url, packed with densing into about a hundred characters, so a link reopens the same picture. The SVG itself is not part of it.'
    ]),
    { ...createImage(builderSvgSdf, 'The settings schema in the Densing Builder'), href: densingBuilderViews.svgSdf },
    {
      type: ProjectContentType.ExternalLink,
      href: '#/project/densing/',
      alternativeName: 'densing'
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
