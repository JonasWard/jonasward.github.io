import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createText, createTitleImage, svgPicture } from '../../../utils/projectconstructor';
import { ResponsivePicture } from '../../../types/projectContent/projectImage';
import { ProjectImageText } from '../../../types/projectContent/projectImageText';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { Keywords } from 'src/types/keywords/keywords';
import { Technologies } from 'src/types/keywords/technologies';

import computeMetrics from './asssets/svg-sdf-concepts/compute-metrics.svg';
import computeSizes from './asssets/svg-sdf-concepts/compute-sizes.svg';
import introTopography from './asssets/svg-sdf-concepts/intro-topography.webp?responsive&lossless';
import bufferInput from './asssets/svg-sdf-concepts/buffer-input.webp?responsive&lossless';
import distancePentagon from './asssets/svg-sdf-concepts/distance-pentagon.webp?responsive&lossless';
import curvesPolylineMedium from './asssets/svg-sdf-concepts/curves-polyline-medium.webp?responsive&lossless';
import postSinebow from './asssets/svg-sdf-concepts/post-sinebow.webp?responsive&lossless';
import bufferDistance from './asssets/svg-sdf-concepts/buffer-distance.webp?responsive&lossless';
import bufferDirection from './asssets/svg-sdf-concepts/buffer-direction.webp?responsive&lossless';
import bufferShape from './asssets/svg-sdf-concepts/buffer-shape.webp?responsive&lossless';
import bufferPolar from './asssets/svg-sdf-concepts/buffer-polar.webp?responsive&lossless';
import distanceEuclidean from './asssets/svg-sdf-concepts/distance-euclidean.webp?responsive&lossless';
import distanceManhattan from './asssets/svg-sdf-concepts/distance-manhattan.webp?responsive&lossless';
import distanceChebyshev from './asssets/svg-sdf-concepts/distance-chebyshev.webp?responsive&lossless';
import distanceL4 from './asssets/svg-sdf-concepts/distance-l4.webp?responsive&lossless';
import distanceTriangle from './asssets/svg-sdf-concepts/distance-triangle.webp?responsive&lossless';
import distanceHexagon from './asssets/svg-sdf-concepts/distance-hexagon.webp?responsive&lossless';
import distanceRotated from './asssets/svg-sdf-concepts/distance-rotated.webp?responsive&lossless';
import distanceStretched from './asssets/svg-sdf-concepts/distance-stretched.webp?responsive&lossless';
import curvesPolylineCoarse from './asssets/svg-sdf-concepts/curves-polyline-coarse.webp?responsive&lossless';
import curvesPolylineFine from './asssets/svg-sdf-concepts/curves-polyline-fine.webp?responsive&lossless';
import curvesExact from './asssets/svg-sdf-concepts/curves-exact.webp?responsive&lossless';
import curvesDifference from './asssets/svg-sdf-concepts/curves-difference.webp?responsive&lossless';
import postHsv from './asssets/svg-sdf-concepts/post-hsv.webp?responsive&lossless';
import postOklch from './asssets/svg-sdf-concepts/post-oklch.webp?responsive&lossless';
import postTwoTone from './asssets/svg-sdf-concepts/post-two-tone.webp?responsive&lossless';
import postRadial from './asssets/svg-sdf-concepts/post-radial.webp?responsive&lossless';
import postChecker from './asssets/svg-sdf-concepts/post-checker.webp?responsive&lossless';
import postMosaic from './asssets/svg-sdf-concepts/post-mosaic.webp?responsive&lossless';
import postEmber from './asssets/svg-sdf-concepts/post-ember.webp?responsive&lossless';
import postTopography from './asssets/svg-sdf-concepts/post-topography.webp?responsive&lossless';
import dkTwilightChebyshev from './asssets/svg-sdf-countries/dk-twilight-chebyshev.webp?responsive&lossless';
import dkTwilightManhattan from './asssets/svg-sdf-countries/dk-twilight-manhattan.webp?responsive&lossless';
import dkTwilightEuclidean from './asssets/svg-sdf-countries/dk-twilight-euclidean.webp?responsive&lossless';
import dkTwilightTriangle from './asssets/svg-sdf-countries/dk-twilight-triangle.webp?responsive&lossless';
import dkPolarHsv from './asssets/svg-sdf-countries/dk-polar-hsv.webp?responsive&lossless';
import dkPolarOklch from './asssets/svg-sdf-countries/dk-polar-oklch.webp?responsive&lossless';
import dkPolarSinebowRadial from './asssets/svg-sdf-countries/dk-polar-sinebow-radial.webp?responsive&lossless';
import dkPolarTwoTone from './asssets/svg-sdf-countries/dk-polar-two-tone.webp?responsive&lossless';
import dkInk from './asssets/svg-sdf-countries/dk-ink.webp?responsive&lossless';
import dkHexagonTopo from './asssets/svg-sdf-countries/dk-hexagon-topo.webp?responsive&lossless';
import dkRegions from './asssets/svg-sdf-countries/dk-regions.webp?responsive&lossless';
import dkMosaic from './asssets/svg-sdf-countries/dk-mosaic.webp?responsive&lossless';
import dkRampEmber from './asssets/svg-sdf-countries/dk-ramp-ember.webp?responsive&lossless';
import dkRampOcean from './asssets/svg-sdf-countries/dk-ramp-ocean.webp?responsive&lossless';
import dkTopo from './asssets/svg-sdf-countries/dk-topo.webp?responsive&lossless';
import dkRedBlue from './asssets/svg-sdf-countries/dk-red-blue.webp?responsive&lossless';
import chTwilightChebyshev from './asssets/svg-sdf-countries/ch-twilight-chebyshev.webp?responsive&lossless';
import chTwilightManhattan from './asssets/svg-sdf-countries/ch-twilight-manhattan.webp?responsive&lossless';
import chTwilightEuclidean from './asssets/svg-sdf-countries/ch-twilight-euclidean.webp?responsive&lossless';
import chTwilightTriangle from './asssets/svg-sdf-countries/ch-twilight-triangle.webp?responsive&lossless';
import chPolarHsv from './asssets/svg-sdf-countries/ch-polar-hsv.webp?responsive&lossless';
import chPolarOklch from './asssets/svg-sdf-countries/ch-polar-oklch.webp?responsive&lossless';
import chPolarSinebowRadial from './asssets/svg-sdf-countries/ch-polar-sinebow-radial.webp?responsive&lossless';
import chPolarTwoTone from './asssets/svg-sdf-countries/ch-polar-two-tone.webp?responsive&lossless';
import chInk from './asssets/svg-sdf-countries/ch-ink.webp?responsive&lossless';
import chHexagonTopo from './asssets/svg-sdf-countries/ch-hexagon-topo.webp?responsive&lossless';
import chRegions from './asssets/svg-sdf-countries/ch-regions.webp?responsive&lossless';
import chMosaic from './asssets/svg-sdf-countries/ch-mosaic.webp?responsive&lossless';
import chRampEmber from './asssets/svg-sdf-countries/ch-ramp-ember.webp?responsive&lossless';
import chRampOcean from './asssets/svg-sdf-countries/ch-ramp-ocean.webp?responsive&lossless';
import chTopo from './asssets/svg-sdf-countries/ch-topo.webp?responsive&lossless';
import chRedBlue from './asssets/svg-sdf-countries/ch-red-blue.webp?responsive&lossless';
import beTwilightChebyshev from './asssets/svg-sdf-countries/be-twilight-chebyshev.webp?responsive&lossless';
import beTwilightManhattan from './asssets/svg-sdf-countries/be-twilight-manhattan.webp?responsive&lossless';
import beTwilightEuclidean from './asssets/svg-sdf-countries/be-twilight-euclidean.webp?responsive&lossless';
import beTwilightTriangle from './asssets/svg-sdf-countries/be-twilight-triangle.webp?responsive&lossless';
import bePolarHsv from './asssets/svg-sdf-countries/be-polar-hsv.webp?responsive&lossless';
import bePolarOklch from './asssets/svg-sdf-countries/be-polar-oklch.webp?responsive&lossless';
import bePolarSinebowRadial from './asssets/svg-sdf-countries/be-polar-sinebow-radial.webp?responsive&lossless';
import bePolarTwoTone from './asssets/svg-sdf-countries/be-polar-two-tone.webp?responsive&lossless';
import beInk from './asssets/svg-sdf-countries/be-ink.webp?responsive&lossless';
import beHexagonTopo from './asssets/svg-sdf-countries/be-hexagon-topo.webp?responsive&lossless';
import beRegions from './asssets/svg-sdf-countries/be-regions.webp?responsive&lossless';
import beMosaic from './asssets/svg-sdf-countries/be-mosaic.webp?responsive&lossless';
import beRampEmber from './asssets/svg-sdf-countries/be-ramp-ember.webp?responsive&lossless';
import beRampOcean from './asssets/svg-sdf-countries/be-ramp-ocean.webp?responsive&lossless';
import beTopo from './asssets/svg-sdf-countries/be-topo.webp?responsive&lossless';
import beRedBlue from './asssets/svg-sdf-countries/be-red-blue.webp?responsive&lossless';

const id = '2025-07';

const named = (picture: ResponsivePicture, name: string) => createImage(picture, `${name} © J.W.`);

// text beside its key image, the heading on the first paragraph
const section = (
  picture: ResponsivePicture,
  caption: string,
  position: 'left' | 'right',
  title: string | null,
  ...paragraphs: string[]
): ProjectImageText => ({
  type: ProjectContentType.ImageText,
  image: named(picture, caption),
  text: {
    type: ProjectContentType.Text,
    maxColumnCount: 1,
    content: title ? [[title, paragraphs[0]], ...paragraphs.slice(1)] : paragraphs
  },
  position
});

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
    section(
      introTopography,
      'Topography',
      'left',
      'SVG SDFs',
      'Little proof of concept to render SVGs with SDFs to get smooth and continuous distance fields for arbitrary shapes.',
      'Signed distance fields keep popping up in my projects - lamps, vases, knitting patterns. The appeal is that a distance field turns a line into a landscape: every point in the plane suddenly knows how far away the drawing is and in which direction it lies. Here the drawing is an SVG - a logo, a sketch or the outline of a country - and that landscape is what gets colored. Everything on this page can be played with in the playground, load your own SVG and export the result as a PNG or as the raw buffer!'
    ),
    {
      type: ProjectContentType.ExternalLink,
      href: 'https://jonasward.github.io/svg-sdf/',
      alternativeName: 'Playground'
    },
    section(
      bufferInput,
      'Input',
      'right',
      'The Buffer',
      'Every pixel of a fixed-resolution buffer stores four numbers: the signed distance to the nearest edge, the direction towards it and the shape it belongs to. That is the whole raw material, computed once.',
      'Zoomed in on the gap between a square and a circle there is already quite a bit to see. The distance alone reads like a terrain, with a ridge running exactly halfway between the two. The direction cuts the plane into facets: flat bands along the straight sides, a fan around the corner and a sharp seam where the nearest edge jumps from one shape to the other. All coloring happens afterwards, so this is where the actual image making starts.'
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
    section(
      distanceTriangle,
      'Triangle',
      'left',
      'Distances',
      'Euclidean distance is the obvious choice, but by no means the only one. Swapping the metric swaps the unit shape the distance is measured with: a diamond for Manhattan, a square for Chebyshev, anything in between the circle and the square for Lp and a regular polygon for the polygon metric.',
      'Formally this changes quite a lot. Close to a shape the lines still follow its outline, further out they take over the formal language of the metric: soft and round for Euclidean, crystalline for Manhattan and Chebyshev, and rather wind-swept for the triangle and the pentagon, where the distance from A to B is not the same anymore as the one from B to A. Every metric can also be rotated and stretched, a stretched circle draws much like a slanted pen.'
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
        named(distanceHexagon, 'Hexagon'),
        named(distancePentagon, 'Pentagon'),
        named(distanceRotated, 'Rotated'),
        named(distanceStretched, 'Stretched')
      ]
    },
    section(
      curvesDifference,
      'Difference',
      'right',
      'Curves',
      'Curves can be flattened into polylines or kept as cubic Béziers, with the distance measured to the actual curve. Flattening is cheap, though the direction to the nearest edge is then constant along every straight piece, which shows up as hard bands as soon as you color by direction.',
      'Though the bands are not only an error, they are a texture of their own. On the ellipse below the hue goes round six times per turn: a polyline that may be 8 pixels off gives faceted fans, 2 pixels gives finer ones, a quarter of a pixel is almost smooth and the exact curve completely so. The image next to this text only shows the difference in distance between the coarse polyline and the exact curve - an error map basically - and it turned out to be the prettiest image of the lot.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        named(curvesPolylineCoarse, 'Polyline 8 px'),
        named(curvesPolylineMedium, 'Polyline 2 px'),
        named(curvesPolylineFine, 'Polyline 0.25 px'),
        named(curvesExact, 'Exact')
      ]
    },
    section(
      postSinebow,
      'Sinebow',
      'left',
      'Post-Processing',
      'One buffer, a whole bunch of images. The polar mode reads the field like a compass: the hue comes from the direction to the nearest edge, its strength from the distance. The hues come from an HSV rainbow, a perceptually even OKLCH wheel or a cyclic gradient of your own, with radial lines, a checker or a mosaic of tiles on top.',
      'The ramps forget about direction and only color by distance, which gives the more familiar look of a contour map. All nine images are the very same buffer of the north of Jutland, only the reading changes - which is pretty much the point of keeping the computation and the coloring apart.'
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
    section(
      svgPicture(computeMetrics, 1280, 880),
      'Metrics',
      'right',
      'Compute',
      'Changing the coloring is instant, changing the metric or the resolution means computing the buffer again. That search runs on WebGPU as a compute shader, on WebGL2 as a fragment shader, or on the CPU with up to 8 web workers. The CPU is the reference, the GPU buffers match it to within about 1e-4 of a pixel.'
    ),
    section(
      svgPicture(computeSizes, 1280, 880),
      'Buffer Size',
      'left',
      null,
      'On a MacBook Air with an M4, in Chrome and with the Swiss outline, both GPU paths need 50 to 73 ms for a 2048 px buffer, the CPU workers between 289 ms and 1.2 s. That is the difference between trying out a metric and waiting for one. WebGPU and WebGL2 end up pretty much equally fast. Also precision needed some care: map coordinates are large numbers and float32 does not like large numbers, so the geometry is first moved around the centre of the buffer.'
    ),
    createText(
      1,
      'Denmark, Switzerland and Belgium, each with the same sixteen colorings and metrics. Borders make for rather good drawings to start from. They are found lines, drawn by history rather than by a designer, full of islands, enclaves and coasts that never run straight. Run through a distance field they turn into landscapes, with the ridges on the lines furthest away from any border.'
    ),
    createText(
      1,
      [
        'Denmark',
        'Lots of islands, and every one of them pulls on the field around it, so the sea in between turns into a maze of seams. The outline is from simplemaps.com.'
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
        named(dkInk, 'Ink'),
        named(dkHexagonTopo, 'Hexagon'),
        named(dkRegions, 'Regions'),
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
        'The only one of the three drawn with actual curves, over 1300 cubic Béziers. The cantons are all one single path, so to give each its own color they first had to be split up.'
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
        named(chInk, 'Ink'),
        named(chHexagonTopo, 'Hexagon'),
        named(chRegions, 'Regions'),
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
        'Three regions - Flanders, Wallonia and Brussels - and not a single curve, so every coloring by direction comes out in flat facets. The outline is from simplemaps.com.'
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
        named(beInk, 'Ink'),
        named(beHexagonTopo, 'Hexagon'),
        named(beRegions, 'Regions'),
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
