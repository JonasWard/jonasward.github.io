import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import projectImage1 from './assets/urlSafeBitpacker/bitpacker.png';
import projectImage2 from './assets/urlSafeBitpacker/lerp.png';

const id = '2024-04';

const metaData: ProjectMetaData = {
  id,
  webstring: 'url-safe-bitpacker',
  name: 'url-safe-bitpacker',
  projectType: ProjectCategory.Software,
  description: 'Library for creating serializing parametric models with minimal foot-print',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.Frontend, Keywords.Development],
};

export const urlSafeBitpacker: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage1, metaData.name, 1988, 2560),
  projectContent: [
    createText(
      2,
      [
        'Parametric Obejct Bit-Packing',
        'For many of my projects I have faced the problem of having a relatively simple, yet variable in definition parametric model. In the cloud based web, one would store those data models in a database. However this is quite a bit of additional overhead for simple configurators. In true web-3 (and GDPR compliancy) I aimed at storing the whole parametric model in a single string that could be stored in the url.',
      ],
      'The goal of this library is to offer a flexible, minimal and, variable object definition that can be stored in the browser URL. It relies heavily relies on the bitpacking of custom bitwidth numeric values. Because of that, the biggest trade-off for this library is legibility. Without the related object definition, it would be impossible to reconstruct the state. The big advantage though is the ability to store rather many variables in a very condensed URL, allowing to store all information in rather short urls which then can be used for qr code generation.',
      'you can check out the source code on github or use the package with npm.'
    ),
    {
      type: ProjectContentType.ExternalLink,
      href: 'https://github.com/jonasward/url-safe-bitpacker',
      alternativeName: 'github rep',
    },
    {
      type: ProjectContentType.ExternalLink,
      href: 'https://www.npmjs.com/package/url-safe-bitpacking',
      alternativeName: 'npm',
    },
    createText(
      2,
      [
        'Sampling',
        'One of the majoral hurdles, that hasn\t been fully dealt with yet, is the wish to be able to walk through as many states of the parametric model with as few possible sliders. Basically interpreting the whole of the parametric model as a single multidmensional spline',
      ],
      'A POC with a visualisation has been implemented, but it isn\t yet able to deal with discontinuties in the parametric model.'
    ),
    createImage(projectImage2, '©️ J.W.'),
  ],
};
