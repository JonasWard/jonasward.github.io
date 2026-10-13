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
import dkPolarOklch from './asssets/svg-sdf-countries/dk-polar-oklch.webp?responsive';
import dkPolarTwilight from './asssets/svg-sdf-countries/dk-polar-twilight.webp?responsive';
import dkRampEmber from './asssets/svg-sdf-countries/dk-ramp-ember.webp?responsive';
import dkRampOcean from './asssets/svg-sdf-countries/dk-ramp-ocean.webp?responsive';
import chPolarHsv from './asssets/svg-sdf-countries/ch-polar-hsv.webp?responsive';
import chPolarSinebowRadial from './asssets/svg-sdf-countries/ch-polar-sinebow-radial.webp?responsive';
import chTopo from './asssets/svg-sdf-countries/ch-topo.webp?responsive';
import chRampEmber from './asssets/svg-sdf-countries/ch-ramp-ember.webp?responsive';
import dkTwilightChebyshev from './asssets/svg-sdf-countries/dk-twilight-chebyshev.webp?responsive';
import dkTwilightManhattan from './asssets/svg-sdf-countries/dk-twilight-manhattan.webp?responsive';
import dkTwilightEuclidean from './asssets/svg-sdf-countries/dk-twilight-euclidean.webp?responsive';
import dkTwilightTriangle from './asssets/svg-sdf-countries/dk-twilight-triangle.webp?responsive';
import chTwilightChebyshev from './asssets/svg-sdf-countries/ch-twilight-chebyshev.webp?responsive';
import chTwilightManhattan from './asssets/svg-sdf-countries/ch-twilight-manhattan.webp?responsive';
import chTwilightEuclidean from './asssets/svg-sdf-countries/ch-twilight-euclidean.webp?responsive';
import chTwilightTriangle from './asssets/svg-sdf-countries/ch-twilight-triangle.webp?responsive';
import beTwilightChebyshev from './asssets/svg-sdf-countries/be-twilight-chebyshev.webp?responsive';
import beTwilightManhattan from './asssets/svg-sdf-countries/be-twilight-manhattan.webp?responsive';
import beTwilightEuclidean from './asssets/svg-sdf-countries/be-twilight-euclidean.webp?responsive';
import beTwilightTriangle from './asssets/svg-sdf-countries/be-twilight-triangle.webp?responsive';
import bePolarOklch from './asssets/svg-sdf-countries/be-polar-oklch.webp?responsive';
import bePolarTwilight from './asssets/svg-sdf-countries/be-polar-twilight.webp?responsive';
import beRampEmber from './asssets/svg-sdf-countries/be-ramp-ember.webp?responsive';
import beRampOcean from './asssets/svg-sdf-countries/be-ramp-ocean.webp?responsive';

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
  keywords: [Keywords.Shaders, Keywords.Patterns, Technologies.ReactThreeFiber, Technologies.SVG]
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
    {
      type: ProjectContentType.ImageGrid,
      images: [denmarkPolar, denmarkDistance].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [mountains, mountainsBis, shape, france].map((i) => createImage(i, '© J.W.'))
    },
    createText(
      1,
      'Denmark, Switzerland and Belgium, each with a whole bunch of different colorings and metrics. The outlines of Denmark and Belgium are from simplemaps.com.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [dkTwilightChebyshev, dkTwilightManhattan, dkTwilightEuclidean, dkTwilightTriangle].map((i) =>
        createImage(i, '© J.W.')
      )
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [dkPolarOklch, dkPolarTwilight, dkRampEmber, dkRampOcean].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [chTwilightChebyshev, chTwilightManhattan, chTwilightEuclidean, chTwilightTriangle].map((i) =>
        createImage(i, '© J.W.')
      )
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [chPolarHsv, chPolarSinebowRadial, chTopo, chRampEmber].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [beTwilightChebyshev, beTwilightManhattan, beTwilightEuclidean, beTwilightTriangle].map((i) =>
        createImage(i, '© J.W.')
      )
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [bePolarOklch, bePolarTwilight, beRampEmber, beRampOcean].map((i) => createImage(i, '© J.W.'))
    }
  ]
};
