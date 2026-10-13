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

import bufferDistance from './asssets/svg-sdf-concepts/buffer-distance.webp?responsive';
import bufferDirection from './asssets/svg-sdf-concepts/buffer-direction.webp?responsive';
import bufferShape from './asssets/svg-sdf-concepts/buffer-shape.webp?responsive';
import bufferPolar from './asssets/svg-sdf-concepts/buffer-polar.webp?responsive';
import distanceEuclidean from './asssets/svg-sdf-concepts/distance-euclidean.webp?responsive';
import distanceManhattan from './asssets/svg-sdf-concepts/distance-manhattan.webp?responsive';
import distanceChebyshev from './asssets/svg-sdf-concepts/distance-chebyshev.webp?responsive';
import distanceL4 from './asssets/svg-sdf-concepts/distance-l4.webp?responsive';
import distanceTriangle from './asssets/svg-sdf-concepts/distance-triangle.webp?responsive';
import distanceHexagon from './asssets/svg-sdf-concepts/distance-hexagon.webp?responsive';
import distanceRotated from './asssets/svg-sdf-concepts/distance-rotated.webp?responsive';
import distanceStretched from './asssets/svg-sdf-concepts/distance-stretched.webp?responsive';
import curvesPolylineCoarse from './asssets/svg-sdf-concepts/curves-polyline-coarse.webp?responsive';
import curvesPolylineFine from './asssets/svg-sdf-concepts/curves-polyline-fine.webp?responsive';
import curvesExact from './asssets/svg-sdf-concepts/curves-exact.webp?responsive';
import curvesDifference from './asssets/svg-sdf-concepts/curves-difference.webp?responsive';
import postHsv from './asssets/svg-sdf-concepts/post-hsv.webp?responsive';
import postOklch from './asssets/svg-sdf-concepts/post-oklch.webp?responsive';
import postTwoTone from './asssets/svg-sdf-concepts/post-two-tone.webp?responsive';
import postRadial from './asssets/svg-sdf-concepts/post-radial.webp?responsive';
import postChecker from './asssets/svg-sdf-concepts/post-checker.webp?responsive';
import postMosaic from './asssets/svg-sdf-concepts/post-mosaic.webp?responsive';
import postEmber from './asssets/svg-sdf-concepts/post-ember.webp?responsive';
import postTopography from './asssets/svg-sdf-concepts/post-topography.webp?responsive';
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
      'The SVG is parsed in the browser and turned into a buffer of distances, which is then colored in a fragment shader. Below first the ideas behind it, each with a few details zoomed in, then three countries with a whole bunch of different colorings and metrics. You can load your own SVG in the playground and export the result as a PNG or as the raw buffer, feel free to try it out!'
    ),
    {
      type: ProjectContentType.ExternalLink,
      href: 'https://jonasward.github.io/svg-sdf/',
      alternativeName: 'Playground'
    },
    createText(
      2,
      [
        'The Buffer',
        'For every pixel of a fixed-resolution buffer four numbers are stored: the signed distance to the nearest edge, the vector pointing towards that edge and the shape it belongs to.'
      ],
      'All coloring happens afterwards, so playing with the settings never recomputes the buffer. Below a detail of the Danish islands, first only the distance, then only the direction to the nearest edge, then the shapes and finally the default polar coloring, which combines all of them.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(bufferDistance, 'Distance'),
        named(bufferDirection, 'Direction'),
        named(bufferShape, 'Shape'),
        named(bufferPolar, 'Polar')
      ]
    },
    createText(
      2,
      [
        'Distances',
        'The distance does not have to be the Euclidean one. Every metric measures the distance to the nearest edge with a different unit shape: a diamond for Manhattan, a square for Chebyshev, something in between the circle and the square for Lp and a regular polygon for the polygon metric.'
      ],
      'Three dots make this quite legible. The iso-lines take the shape of the metric and the borders between the dots - where one dot stops being the nearest - move along with it. Each metric can also be rotated and stretched. Odd polygons are a bit special though: with a triangle the distance from A to B is not the same anymore as the one from B to A.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(distanceEuclidean, 'Euclidean'),
        named(distanceManhattan, 'Manhattan'),
        named(distanceChebyshev, 'Chebyshev'),
        named(distanceL4, 'L4')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(distanceTriangle, 'Triangle'),
        named(distanceHexagon, 'Hexagon'),
        named(distanceRotated, 'Rotated'),
        named(distanceStretched, 'Stretched')
      ]
    },
    createText(
      2,
      [
        'Curves',
        'In a first version all curves were flattened into polylines. Cheap, though the direction to the nearest edge is then constant along every straight piece, which shows up as bands as soon as you color by direction. Therefore curves can now also stay cubic Béziers, with the distance measured to the actual curve.'
      ],
      'The detail is a few canton borders of Switzerland, with radial lines on top to make the direction visible. First a polyline that is allowed to be 8 pixels off, then one that is a quarter of a pixel off, then the exact curves and finally the difference in distance between the coarse polyline and the exact curves, up to 4 pixels.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(curvesPolylineCoarse, 'Polyline 8 px'),
        named(curvesPolylineFine, 'Polyline 0.25 px'),
        named(curvesExact, 'Exact'),
        named(curvesDifference, 'Difference')
      ]
    },
    createText(
      2,
      [
        'Post-Processing',
        'One buffer, many images. The polar mode takes its hue from the direction to the nearest edge, out of an HSV rainbow, a perceptually even OKLCH wheel or a cyclic gradient of your own, and its strength from the distance. On top there can be radial lines, a checker or a mosaic of tiles.'
      ],
      'The ramps ignore the direction and only color by distance, with separate colors for the inside and the outside. All eight images below are the same buffer of the north of Jutland.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(postHsv, 'HSV'),
        named(postOklch, 'OKLCH'),
        named(postTwoTone, 'Two-Tone'),
        named(postRadial, 'Radial')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(postChecker, 'Checker'),
        named(postMosaic, 'Mosaic'),
        named(postEmber, 'Ember'),
        named(postTopography, 'Topography')
      ]
    },
    createText(
      2,
      [
        'Compute',
        'The buffer is computed with WebGPU, with WebGL2 or, when neither is available, on the CPU with up to 8 web workers. The CPU version is the reference, the GPU buffers match it to within about 1e-4 of a pixel.'
      ],
      'Both GPU paths run in a worker, tile by tile. Before that, the geometry is moved around the centre of the buffer, otherwise float32 is not precise enough for the coordinates of a map.'
    ),
    createText(
      1,
      'Denmark, Switzerland and Belgium, each with the same sixteen colorings and metrics.'
    ),
    createText(
      1,
      [
        'Denmark',
        'Lots of islands, so lots of edges. The outline is from simplemaps.com.'
      ]
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(dkTwilightChebyshev, 'Chebyshev'),
        named(dkTwilightManhattan, 'Manhattan'),
        named(dkTwilightEuclidean, 'Euclidean'),
        named(dkTwilightTriangle, 'Triangle')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(dkPolarHsv, 'HSV'),
        named(dkPolarOklch, 'OKLCH'),
        named(dkPolarSinebowRadial, 'Sinebow'),
        named(dkPolarTwoTone, 'Two-Tone')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(dkLp4Oklch, 'L4'),
        named(dkHexagonTopo, 'Hexagon'),
        named(dkStretchedRamp, 'Stretched'),
        named(dkMosaic, 'Mosaic')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(dkRampEmber, 'Ember'),
        named(dkRampOcean, 'Ocean'),
        named(dkTopo, 'Topography'),
        named(dkRedBlue, 'Red-Blue')
      ]
    },
    createText(
      1,
      [
        'Switzerland',
        'The only one of the three with actual curves, over 1300 cubic Béziers for the border and the cantons.'
      ]
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(chTwilightChebyshev, 'Chebyshev'),
        named(chTwilightManhattan, 'Manhattan'),
        named(chTwilightEuclidean, 'Euclidean'),
        named(chTwilightTriangle, 'Triangle')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(chPolarHsv, 'HSV'),
        named(chPolarOklch, 'OKLCH'),
        named(chPolarSinebowRadial, 'Sinebow'),
        named(chPolarTwoTone, 'Two-Tone')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(chLp4Oklch, 'L4'),
        named(chHexagonTopo, 'Hexagon'),
        named(chStretchedRamp, 'Stretched'),
        named(chMosaic, 'Mosaic')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(chRampEmber, 'Ember'),
        named(chRampOcean, 'Ocean'),
        named(chTopo, 'Topography'),
        named(chRedBlue, 'Red-Blue')
      ]
    },
    createText(
      1,
      [
        'Belgium',
        'The outline is from simplemaps.com.'
      ]
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(beTwilightChebyshev, 'Chebyshev'),
        named(beTwilightManhattan, 'Manhattan'),
        named(beTwilightEuclidean, 'Euclidean'),
        named(beTwilightTriangle, 'Triangle')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(bePolarHsv, 'HSV'),
        named(bePolarOklch, 'OKLCH'),
        named(bePolarSinebowRadial, 'Sinebow'),
        named(bePolarTwoTone, 'Two-Tone')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(beLp4Oklch, 'L4'),
        named(beHexagonTopo, 'Hexagon'),
        named(beStretchedRamp, 'Stretched'),
        named(beMosaic, 'Mosaic')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(beRampEmber, 'Ember'),
        named(beRampOcean, 'Ocean'),
        named(beTopo, 'Topography'),
        named(beRedBlue, 'Red-Blue')
      ]
    }
  ]
};
