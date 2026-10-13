import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';
import { Technologies } from 'src/types/keywords/technologies';
import { densingBuilderViews } from '../densingBuilderViews';
import { aMerryFXMesh } from '../art/aMerryFXMesh';
import { svgSDF } from '../art/svgSDF';
import { glslRayMarching } from './glsl-ray-marching';
import { lucernaLecto } from './lucerna-lecto';
import { lucernaeTurici } from './lucernaeTurici';
import { paraSlimShady } from './paraSlimShady';

import builderInspector from './assets/densing/builder-inspector.webp?responsive&lossless';
import builderQr from './assets/densing/builder-qr.webp?responsive&lossless';
import builderSharedNumbers from './assets/densing/builder-shared-numbers.webp?responsive&lossless';
import builderSvgSdf from './assets/densing/builder-svg-sdf.webp?responsive&lossless';
import builderTemplates from './assets/densing/builder-templates.webp?responsive&lossless';
import densingSdf from './assets/densing/densing-sdf.webp?responsive';

const id = '2026-01';

// the settings the logo was rendered with in svg-sdf, packed with densing
const logoSettings =
  'https://jonasward.ch/svg-sdf/?s=J_AYAnMALuABg9PHqIACs6VX0b5vR-jo9P8gAHBYQPqwejv6OK2eh0xQgAPr9Q-nlgpwAHWSg3jZD2TIAChYcPEzKqJgcAAn___-847___-lNqnEA2G';

const builderLink = (href: string) => ({ href, title: 'Open this view in the Densing Builder' });

// a project that keeps its state in the url, with the link in the corner of its image
const inUse = (project: ProjectData, app?: string) => ({
  ...createImage(project.projectImage.picture, project.metaData.name),
  link: app
    ? { href: app, title: 'Open the app' }
    : { href: `#/project/${project.metaData.webstring}/`, title: 'Open the project page' }
});

const metaData: ProjectMetaData = {
  id,
  webstring: 'densing',
  name: 'Densing',
  projectType: ProjectCategory.Software,
  description: 'Library for numeric level (de)compacting of objects based on a schema',
  keyImage: densingSdf,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.Frontend, Technologies.TypeScript, Technologies.Densing]
};

export const densing: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(builderSvgSdf, metaData.name),
  projectContent: [
    createText(
      2,
      [
        'Densing',
        'Library for numeric level (de)compacting of objects based on a schema. Iteration on my experience with url-safe-bitpacking, aiming for a nicer developer experience, more performance and more scalable data types.'
      ],
      'The key technical differences to url-safe-bitpacking is that reading and writing of data is done through a big-int intermediary. For programming purposes: a shape can be defined once as a template and referenced from anywhere, even from within itself, allowing for arbitrary AST definitions. Numeric ranges can be shared in the same way, with presets (say mm and m) of which every payload picks one.',
      'Since 0.4 the schema itself can also be packed into a string, rather shorter than its JSON. The biggest trade-off of url-safe-bitpacking, namely that without the object definition the state is illegible, can therefore be sidestepped by just sending the definition along.'
    ),
    {
      type: ProjectContentType.ExternalLinkList,
      links: [
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://www.npmjs.com/package/densing',
          alternativeName: 'npm'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://github.com/JonasWard/densing',
          alternativeName: 'github'
        }
      ]
    },
    { ...createImage(densingSdf, 'Logo rendered with SVG SDF, settings packed with densing'), link: { href: logoSettings, title: 'Open these settings in the playground' } },
    {
      type: ProjectContentType.ExternalLinkList,
      links: [
        {
          type: ProjectContentType.ExternalLink,
          href: densingBuilderViews.svgSdf,
          alternativeName: 'The same settings in the Densing Builder'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/sdf-svg/',
          alternativeName: 'SVG SDF'
        }
      ]
    },
    createText(
      2,
      [
        'Densing Builder',
        'Visual schema builder for the library. A schema is put together as a tree and every field shows what it costs in bits. The ribbon on top shows every bit the preview data encodes to, grouped by the character it ends up in.'
      ],
      'No backend used at all! Schema and preview data are both stored in the link, feel free to share one with a friend.'
    ),
    {
      type: ProjectContentType.ExternalLink,
      href: 'https://jonasward.github.io/densing-ui/',
      alternativeName: 'Playground'
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        { ...createImage(builderInspector, 'Device Config - what a field costs'), link: builderLink(densingBuilderViews.deviceConfig) },
        { ...createImage(builderTemplates, 'Recursive template - (5 + 3) × 2'), link: builderLink(densingBuilderViews.expressionTree) },
        { ...createImage(builderSharedNumbers, 'Shared numbers with mm and m presets'), link: builderLink(densingBuilderViews.sharedNumbers) },
        { ...createImage(builderQr, 'CITA building definition + qr-code'), link: builderLink(densingBuilderViews.cita) }
      ]
    },
    createText(1, [
      'In Use',
      'The projects below all keep their state in the url. SVG SDF is the first one running on densing, most of the others still rely on url-safe-bitpacking.'
    ]),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        inUse(svgSDF, 'https://jonasward.github.io/svg-sdf/'),
        inUse(lucernaeTurici, 'https://jonasward.github.io/lucernae-turici/'),
        inUse(lucernaLecto, 'https://jonasward.github.io/lucerna-lecto/'),
        inUse(glslRayMarching, 'https://jonasward.github.io/glsl-ray-marching/'),
        inUse(aMerryFXMesh, 'https://jonasward.github.io/a-merry-fx-mesh/'),
        inUse(paraSlimShady)
      ]
    },
    createText(1, ['Predecessors', 'url-safe-bitpacking, and State to Function, the POC to store simple math in a url.']),
    {
      type: ProjectContentType.ExternalLinkList,
      links: [
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/url-safe-bitpacker/',
          alternativeName: 'url-safe-bitpacking'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/state-to-function/',
          alternativeName: 'State to Function'
        }
      ]
    }
  ]
};
