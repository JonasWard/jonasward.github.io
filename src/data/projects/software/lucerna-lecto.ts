import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';
import { Technologies } from 'src/types/keywords/technologies';

import example from './assets/lucerna-lecto/example.webp';
import mandelbrot from './assets/lucerna-lecto/mandelbrot.webp';
import patternA from './assets/lucerna-lecto/pattern-a.webp';
import patternB from './assets/lucerna-lecto/pattern-b.webp';
import patternC from './assets/lucerna-lecto/pattern-c.webp';

const id = '2025-03';

const metaData: ProjectMetaData = {
  id,
  webstring: 'lucerna-lecto',
  name: 'Lucerna Lecto',
  projectType: ProjectCategory.Software,
  description: '3D printing configurator tool for Table Lamps',
  keyImage: example,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [
    Keywords.Frontend,
    Keywords.ThreeDPrinting,
    Keywords.Lamps,
    Keywords.Shaders,
    Keywords.Patterns,
    Technologies.ReactThreeFiber
  ]
};

export const lucernaLecto: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(example, metaData.name, 1348, 1522),
  projectContent: [
    createText(
      2,
      [
        'Table Lamp configurator for 3D printing',
        'Lucerna Lecto serves as a configurator for 3D printing table lamps. It allows you to select a lamp design and configure it to your liking. The configurator is built with React Three Fiber.'
      ],
      'State is stored in the url, feel free to share your creations with a friend!'
    ),
    {
      type: ProjectContentType.ExternalLinkList,
      links: [
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://jonasward.github.io/lucerna-lecto/',
          alternativeName: 'GitHub Pages Deployment'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/ilumina/',
          alternativeName: '3D Printed Lamp Printers'
        }
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [example, mandelbrot, patternA, patternB, patternC].map((i) => createImage(i, '© J.W.'))
    }
  ]
};
