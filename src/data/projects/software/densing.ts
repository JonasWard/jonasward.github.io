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
    { ...createImage(densingSdf, 'Logo rendered with SVG SDF, settings packed with densing'), href: logoSettings },
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
        { ...createImage(builderInspector, 'Device Config - what a field costs'), href: densingBuilderViews.deviceConfig },
        { ...createImage(builderTemplates, 'Recursive template - (5 + 3) × 2'), href: densingBuilderViews.expressionTree },
        { ...createImage(builderSharedNumbers, 'Shared numbers with mm and m presets'), href: densingBuilderViews.sharedNumbers },
        { ...createImage(builderQr, 'CITA building definition + qr-code'), href: densingBuilderViews.cita }
      ]
    }
  ]
};
