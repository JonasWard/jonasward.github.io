import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from 'src/types/keywords/keywords';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';

import functions from './assets/state-to-function/functions.png';
import help from './assets/state-to-function/help.png';
import pdf from './assets/state-to-function/pdf.png';
import qrCode from './assets/state-to-function/qr-code.png';
import results from './assets/state-to-function/results.png';

const id = '2025-02';

const metaData: ProjectMetaData = {
  id,
  webstring: 'state-to-function',
  name: 'State to Function',
  projectType: ProjectCategory.Software,
  description: 'Tool to Store Simple Math into URL state',
  keyImage: pdf,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.Frontend, Keywords.Software]
};

export const stateToFunction: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(pdf, 'State to Function', 1038, 1451, 'black-on-white'),
  projectContent: [
    createText(
      2,
      [
        'Algorithm in URL',
        'POC to allow users to store simple math in a url. Uses url-safe-bitpacking. No backend used at all! All state is Frontend only. PDF exports also contain a QR codes that stores the url.'
      ],
      'State is stored in the url and the qr code in the pdf, feel free to share your creations with a friend!'
    ),
    {
      type: ProjectContentType.ExternalLinkList,
      links: [
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://jonasward.github.io/state-to-function/',
          alternativeName: 'GitHub Pages Deployment'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/url-safe-bitpacker/',
          alternativeName: 'url-safe-bitpacking'
        }
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(pdf, 'Output PDF'),
        createImage(functions, 'Function Definitions'),
        createImage(help, 'Help Documentation'),
        createImage(qrCode, 'QR Code for Definition'),
        createImage(results, 'Result of Definition')
      ]
    }
  ]
};
