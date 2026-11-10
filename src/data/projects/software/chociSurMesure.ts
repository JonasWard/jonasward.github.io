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

import logo from './assets/choci-sur-mesure/logo.webp?responsive&lossless';
import logoCard from './assets/choci-sur-mesure/logo.webp?responsive&lossless&card';

import hero from './assets/choci-sur-mesure/hero.webp?responsive&hero';
import ripples from './assets/choci-sur-mesure/ripples.webp?responsive';
import gyroid from './assets/choci-sur-mesure/gyroid.webp?responsive';
import dimples from './assets/choci-sur-mesure/dimples.webp?responsive';
import echo from './assets/choci-sur-mesure/echo.webp?responsive';
import spiral from './assets/choci-sur-mesure/spiral.webp?responsive';
import stars from './assets/choci-sur-mesure/stars.webp?responsive';
import oneDesign from './assets/choci-sur-mesure/one-design.webp?responsive';
import repeat from './assets/choci-sur-mesure/repeat.webp?responsive';
import unique from './assets/choci-sur-mesure/unique.webp?responsive';
import rotateText from './assets/choci-sur-mesure/rotate-text.webp?responsive';
import expert from './assets/choci-sur-mesure/expert.webp?responsive';
import phone from './assets/choci-sur-mesure/phone.webp?responsive';

const id = '2026-09';

const APP = 'https://jonasward.github.io/chocolade-chaud/';

// the whole bar lives in ?s=, the camera and expert mode are not part of it
const STATE = {
  nameOnAGyroid:
    'CzOBhGU8jA2su5Xgu4FJxATiAnEBGUAK_ZMTEqcQpBAABAjgJ6YCTiFIIBQBDAGgAYQB1AGQUAOYAwgDcAOYAWgDmAMoA5ADSAMyG1gACcQE4gOEAHgDyBQCWA',
  ripples: 'CzOBhGU8jA2su5Xgu4BJxATiAnEBGUAK_ZMTFScQndAgTiFIIYG5akEI',
  gyroid: 'CzOBhGU8jA2su5Xgu4JJxATiAnEBGUAK_ZMTECOAoPA',
  dimples: 'CzOBhGU8jA2su5Xgu4HJxATiAnEBGUAK_ZMTECRaoPB',
  echo: 'CzOBhGU8jA2su5Xgu4LJxATiAnEBGUAK_ZMTEqcQpBAABGnEKQRAYCWARwgAASTiFIIBQBDAGgAYQB1AGQUAOYAwgDcAOYAWgDmAMoA5ADSAMyG1gACcQE4gOEAAC7gAAAAEnEKQQCgCGANAAwgDqAMgoAcwBhAG4AcwAtAHMAZQByAGkAZkNrAAE4gJxAcIAPAHkBQA8',
  spiral:
    'CzOBhGU8jA2su5Xgu4PJxATiAnEBGUAK_ZMTEqcQpBAABGnEKQRAYDICRwgKARTiFIIAJYCcQE4gAAAAAAAAAAAFOIUggAlgJxATiAAAA8AeQFADw',
  stars: 'CzOBhGU8jA2su5Xgu4NJxATiAnEBGUAK_ZMTEqcQpBAABInEKQQxEoKcQpBAAeATiAnEAMgBkAygPAfQ',
  oneDesign:
    'C3OBhGU8jA2su5Xgu4DJxATiAnEBGUAK_ZMTEqcQpBAABGnEKQRAYDICRwgKARTiFIIAJYCcQE4gAAAAAAAAAAAFOIUggAlgJxATiAAAA8AeQFADw',
  repeat: 'C3OBhGU8jA2su5Xgu4FgASjgXcAnEBOICcQEZQAr9kxMSpxCkEAAEicQpBDESgpxCkEAB4BOICcQAyAGQDKA8B9A',
  unique:
    'C3OBhGU8jA2su5Xgu4LwASjgXcAnEBOICcQEZQAr9kxMSpxCkEAAECOAnpgJOIUggFAEMAaABhAHUAZBQA5gDCANwA5gBaAOYAygDkANIAzIbWAAJxATiA4QAeAPIFAJY',
  expert: 'CzOBhGU8jA2su5Xgu4DJxATiAnEBGUAK_ZMTFScQndAgTiFIIYG5akEI',
  phone:
    'CzOBhGU8jA2su5Xgu4DJxATiAnEBGUAK_ZMTEqcQpBAABAjgJ6YCTiFIIBQBDAGgAYQB1AGQUAOYAwgDcAOYAWgDmAMoA5ADSAMyG1gACcQE4gOEAHgDyBQCWA'
};

const view = (picture: ResponsivePicture, caption: string, state: keyof typeof STATE) => ({
  ...createImage(picture, caption),
  link: { href: `${APP}?s=${STATE[state]}`, title: 'Open this bar in the configurator' }
});

const metaData: ProjectMetaData = {
  id,
  webstring: 'choci-sur-mesure',
  name: 'Choci sur Mesure',
  projectType: ProjectCategory.Software,
  description: 'Configurator for patterned chocolate bars and their moulds',
  keyImage: logoCard,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [
    Keywords.Frontend,
    Keywords.Patterns,
    Keywords.ThreeDPrinting,
    Keywords.Geometry,
    Keywords.Shaders,
    Technologies.TypeScript,
    Technologies.ReactThreeFiber,
    Technologies.GLSL,
    Technologies.Densing
  ]
};

export const chociSurMesure: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(hero, metaData.name),
  projectContent: [
    createText(
      2,
      [
        'Choci sur Mesure',
        'Second go at an online chocolate bar configurator, rebuilt from scratch three years after Chocolade Chaud. Pick a tablet and its chocolate, stack a few implicit surfaces - gyroid, Schwarz P and D, Neovius - into a pattern, and export the bar as STL or OBJ to 3D print a mould.'
      ],
      'The pattern is a tree of distance functions, its output is how far the top of the bar moves, in mm. Besides the methods there are SVG shapes, text on a straight line or along a curve, and waves that turn the distance of whatever they hold into ripples, so a wave around a text echoes its outline. A combined tablet fills the 6 x 2 units of a whole 150 x 70 mm bar with smaller pieces, picked from all 30 ways to fill it, which share one design, each repeat it, or differ from it piece by piece.',
      'The preview bakes the pattern on the GPU into a top surface. The exported mesh is made in a web worker instead: closed, tilted on its side and with an internal support structure for printing. Entire state stored in the url, packed with densing! Though an uploaded SVG does not fit in a link, it only lives in the browser it was uploaded in.'
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
          href: 'https://github.com/JonasWard/chocolade-chaud',
          alternativeName: 'github'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/chocolade-chaud/',
          alternativeName: 'Chocolade Chaud'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/choco-studies/',
          alternativeName: 'Choco Studies'
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
    createImage(logo, 'Logo rendered with SVG SDF © J.W.'),
    createText(1, ['Starting points', 'The patterns a bar can start from in simple mode, each in another chocolate.']),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        view(ripples, 'Ripples - Dark 85%', 'ripples'),
        view(gyroid, 'Gyroid - Ruby', 'gyroid'),
        view(dimples, 'Dimples - White', 'dimples'),
        view(echo, 'Echo - Blond', 'echo'),
        view(spiral, 'Spiral - Matcha', 'spiral'),
        view(stars, 'Stars - Gianduja', 'stars')
      ]
    },
    createText(1, [
      'Combined tablets',
      'One of the 30 ways to fill the whole tablet, with the pattern as one design, repeated on every piece, or unique per piece.'
    ]),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        view(oneDesign, 'One design', 'oneDesign'),
        view(repeat, 'Repeat', 'repeat'),
        view(unique, 'Unique', 'unique')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        view(rotateText, 'Turning a text from above', 'nameOnAGyroid'),
        view(expert, 'Expert mode, the pattern as a formula', 'expert'),
        view(phone, 'On a phone', 'phone')
      ]
    }
  ]
};
