import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { ResponsivePicture } from '../../../types/projectContent/projectImage';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { Keywords } from 'src/types/keywords/keywords';
import { Technologies } from 'src/types/keywords/technologies';

import dkTwilightChebyshev from './asssets/svg-sdf-countries/dk-twilight-chebyshev.webp?responsive';
import dkTwilightManhattan from './asssets/svg-sdf-countries/dk-twilight-manhattan.webp?responsive';
import dkTwilightEuclidean from './asssets/svg-sdf-countries/dk-twilight-euclidean.webp?responsive';
import dkTwilightTriangle from './asssets/svg-sdf-countries/dk-twilight-triangle.webp?responsive';
import dkPolarHsv from './asssets/svg-sdf-countries/dk-polar-hsv.webp?responsive';
import dkPolarOklch from './asssets/svg-sdf-countries/dk-polar-oklch.webp?responsive';
import dkPolarSinebowRadial from './asssets/svg-sdf-countries/dk-polar-sinebow-radial.webp?responsive';
import dkPolarTwoTone from './asssets/svg-sdf-countries/dk-polar-two-tone.webp?responsive';
import dkLp4Oklch from './asssets/svg-sdf-countries/dk-lp4-oklch.webp?responsive';
import dkHexagonTopo from './asssets/svg-sdf-countries/dk-hexagon-topo.webp?responsive';
import dkStretchedRamp from './asssets/svg-sdf-countries/dk-stretched-ramp.webp?responsive';
import dkMosaic from './asssets/svg-sdf-countries/dk-mosaic.webp?responsive';
import dkRampEmber from './asssets/svg-sdf-countries/dk-ramp-ember.webp?responsive';
import dkRampOcean from './asssets/svg-sdf-countries/dk-ramp-ocean.webp?responsive';
import dkTopo from './asssets/svg-sdf-countries/dk-topo.webp?responsive';
import dkRedBlue from './asssets/svg-sdf-countries/dk-red-blue.webp?responsive';
import chTwilightChebyshev from './asssets/svg-sdf-countries/ch-twilight-chebyshev.webp?responsive';
import chTwilightManhattan from './asssets/svg-sdf-countries/ch-twilight-manhattan.webp?responsive';
import chTwilightEuclidean from './asssets/svg-sdf-countries/ch-twilight-euclidean.webp?responsive';
import chTwilightTriangle from './asssets/svg-sdf-countries/ch-twilight-triangle.webp?responsive';
import chPolarHsv from './asssets/svg-sdf-countries/ch-polar-hsv.webp?responsive';
import chPolarOklch from './asssets/svg-sdf-countries/ch-polar-oklch.webp?responsive';
import chPolarSinebowRadial from './asssets/svg-sdf-countries/ch-polar-sinebow-radial.webp?responsive';
import chPolarTwoTone from './asssets/svg-sdf-countries/ch-polar-two-tone.webp?responsive';
import chLp4Oklch from './asssets/svg-sdf-countries/ch-lp4-oklch.webp?responsive';
import chHexagonTopo from './asssets/svg-sdf-countries/ch-hexagon-topo.webp?responsive';
import chStretchedRamp from './asssets/svg-sdf-countries/ch-stretched-ramp.webp?responsive';
import chMosaic from './asssets/svg-sdf-countries/ch-mosaic.webp?responsive';
import chRampEmber from './asssets/svg-sdf-countries/ch-ramp-ember.webp?responsive';
import chRampOcean from './asssets/svg-sdf-countries/ch-ramp-ocean.webp?responsive';
import chTopo from './asssets/svg-sdf-countries/ch-topo.webp?responsive';
import chRedBlue from './asssets/svg-sdf-countries/ch-red-blue.webp?responsive';
import beTwilightChebyshev from './asssets/svg-sdf-countries/be-twilight-chebyshev.webp?responsive';
import beTwilightManhattan from './asssets/svg-sdf-countries/be-twilight-manhattan.webp?responsive';
import beTwilightEuclidean from './asssets/svg-sdf-countries/be-twilight-euclidean.webp?responsive';
import beTwilightTriangle from './asssets/svg-sdf-countries/be-twilight-triangle.webp?responsive';
import bePolarHsv from './asssets/svg-sdf-countries/be-polar-hsv.webp?responsive';
import bePolarOklch from './asssets/svg-sdf-countries/be-polar-oklch.webp?responsive';
import bePolarSinebowRadial from './asssets/svg-sdf-countries/be-polar-sinebow-radial.webp?responsive';
import bePolarTwoTone from './asssets/svg-sdf-countries/be-polar-two-tone.webp?responsive';
import beLp4Oklch from './asssets/svg-sdf-countries/be-lp4-oklch.webp?responsive';
import beHexagonTopo from './asssets/svg-sdf-countries/be-hexagon-topo.webp?responsive';
import beStretchedRamp from './asssets/svg-sdf-countries/be-stretched-ramp.webp?responsive';
import beMosaic from './asssets/svg-sdf-countries/be-mosaic.webp?responsive';
import beRampEmber from './asssets/svg-sdf-countries/be-ramp-ember.webp?responsive';
import beRampOcean from './asssets/svg-sdf-countries/be-ramp-ocean.webp?responsive';
import beTopo from './asssets/svg-sdf-countries/be-topo.webp?responsive';
import beRedBlue from './asssets/svg-sdf-countries/be-red-blue.webp?responsive';

const id = '2025-07';

const named = (picture: ResponsivePicture, name: string) => createImage(picture, `${name} © J.W.`);

const metaData: ProjectMetaData = {
  id,
  webstring: 'sdf-svg',
  name: 'SVG SDF',
  projectType: ProjectCategory.Art,
  description: 'Signed Distance Fields from SVGs',
  keyImage: chRampEmber,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.Shaders, Keywords.Patterns, Technologies.ReactThreeFiber, Technologies.SVG]
};

export const svgSDF: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(chRampEmber, metaData.name),
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
    createText(
      1,
      'Denmark, Switzerland and Belgium, each with a whole bunch of different colorings and metrics. The outlines of Denmark and Belgium are from simplemaps.com.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(dkTwilightChebyshev, 'Denmark - Chebyshev'),
        named(dkTwilightManhattan, 'Denmark - Manhattan'),
        named(dkTwilightEuclidean, 'Denmark - Euclidean'),
        named(dkTwilightTriangle, 'Denmark - Triangle')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(dkPolarHsv, 'Denmark - HSV'),
        named(dkPolarOklch, 'Denmark - OKLCH'),
        named(dkPolarSinebowRadial, 'Denmark - Sinebow'),
        named(dkPolarTwoTone, 'Denmark - Two-Tone')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(dkLp4Oklch, 'Denmark - L4'),
        named(dkHexagonTopo, 'Denmark - Hexagon'),
        named(dkStretchedRamp, 'Denmark - Stretched'),
        named(dkMosaic, 'Denmark - Mosaic')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(dkRampEmber, 'Denmark - Ember'),
        named(dkRampOcean, 'Denmark - Ocean'),
        named(dkTopo, 'Denmark - Topography'),
        named(dkRedBlue, 'Denmark - Red-Blue')
      ]
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
      images: [
        named(chTwilightChebyshev, 'Switzerland - Chebyshev'),
        named(chTwilightManhattan, 'Switzerland - Manhattan'),
        named(chTwilightEuclidean, 'Switzerland - Euclidean'),
        named(chTwilightTriangle, 'Switzerland - Triangle')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(chPolarHsv, 'Switzerland - HSV'),
        named(chPolarOklch, 'Switzerland - OKLCH'),
        named(chPolarSinebowRadial, 'Switzerland - Sinebow'),
        named(chPolarTwoTone, 'Switzerland - Two-Tone')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(chLp4Oklch, 'Switzerland - L4'),
        named(chHexagonTopo, 'Switzerland - Hexagon'),
        named(chStretchedRamp, 'Switzerland - Stretched'),
        named(chMosaic, 'Switzerland - Mosaic')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(chRampEmber, 'Switzerland - Ember'),
        named(chRampOcean, 'Switzerland - Ocean'),
        named(chTopo, 'Switzerland - Topography'),
        named(chRedBlue, 'Switzerland - Red-Blue')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(beTwilightChebyshev, 'Belgium - Chebyshev'),
        named(beTwilightManhattan, 'Belgium - Manhattan'),
        named(beTwilightEuclidean, 'Belgium - Euclidean'),
        named(beTwilightTriangle, 'Belgium - Triangle')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(bePolarHsv, 'Belgium - HSV'),
        named(bePolarOklch, 'Belgium - OKLCH'),
        named(bePolarSinebowRadial, 'Belgium - Sinebow'),
        named(bePolarTwoTone, 'Belgium - Two-Tone')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(beLp4Oklch, 'Belgium - L4'),
        named(beHexagonTopo, 'Belgium - Hexagon'),
        named(beStretchedRamp, 'Belgium - Stretched'),
        named(beMosaic, 'Belgium - Mosaic')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(beRampEmber, 'Belgium - Ember'),
        named(beRampOcean, 'Belgium - Ocean'),
        named(beTopo, 'Belgium - Topography'),
        named(beRedBlue, 'Belgium - Red-Blue')
      ]
    }
  ]
};
