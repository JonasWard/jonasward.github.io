import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';
import { Technologies } from 'src/types/keywords/technologies';

import customSchema from './assets/densing/custom-scheme.webp';
import densingPaddingAndRounding from './assets/densing/densing-padding-and-rounding.svg';
import landing from './assets/densing/landing.webp';
import simpleBeam from './assets/densing/simple-beam.webp';
import withNesting from './assets/densing/with-nesting.webp';

const id = '2026-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'densing',
  name: 'Densing',
  projectType: ProjectCategory.Software,
  description: 'Library for numeric level (de)compacting of objects based on a schema',
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.Frontend, Technologies.TypeScript, Technologies.Densing]
};

export const densing: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(densingPaddingAndRounding, metaData.name, 1400, 1400),
  projectContent: [
    createText(
      2,
      [
        'Densing',
        'Library for numeric level (de)compacting of objects based on a schema. Iteration on my experience with url-safe-bitpacking, aiming for a nicer developer experience, more performance and more scalable data types.'
      ],
      'The key technical differences to url-safe-bitpacking is that reading and writing of data is done through a big-int intermediary. For programming purposes: there is the possibility to define pointers and meta object definitions, allowing for arbitrary AST definitions.'
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
        },
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://jonasward.github.io/densing-ui/',
          alternativeName: 'UI to interact with the library'
        }
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(landing, 'landing'),
        createImage(customSchema, 'Custom Schema UI'),
        createImage(simpleBeam, 'Simple Beam Definition + qr-code'),
        createImage(withNesting, 'Definition with nesting')
      ]
    }
  ]
};
