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
import { densingBuilderViews } from '../densingBuilderViews';

import logo from './assets/state-to-function-2/logo.webp?responsive&lossless';
import builderBase64url from './assets/state-to-function-2/builder-base64url.webp?responsive&lossless';
import builderBase45 from './assets/state-to-function-2/builder-base45.webp?responsive&lossless';

import definitions from './assets/state-to-function-2/definitions.webp?responsive';
import settings from './assets/state-to-function-2/settings.webp?responsive';
import formulas from './assets/state-to-function-2/formulas.webp?responsive';
import autocomplete from './assets/state-to-function-2/autocomplete.webp?responsive';
import applet from './assets/state-to-function-2/applet.webp?responsive';
import help from './assets/state-to-function-2/help.webp?responsive';
import pdf from './assets/state-to-function-2/pdf.webp?responsive';

const id = '2026-07';

const APP = 'https://jw-s2f.onrender.com/';
// the default example definition, and its applet with w = 250
const DEFINITION =
  'ARJQGTVE67-6AH0gnEPoSBgAqtPw6PQA-kE4h9CQIQGRQyJjh6AH0gnEPoSAoAKaAGe6zQwGUhAhABFUAiq18iGAgWyEKIAFJIDv3_oodUwQgRAAKARVa-UKnm1pGDAgwgJFQGLIe10OiICI';
const APPLET = 'BKOBftASjg';

const view = (picture: ResponsivePicture, caption: string, hash: string) => ({
  ...createImage(picture, caption),
  link: { href: `${APP}#/${hash}`, title: 'Open this view in the app' }
});

const builderLink = { href: densingBuilderViews.stateToFunction, title: 'Open this view in the Densing Builder' };

// the svg-sdf settings the logo was rendered with, packed with densing; the svg itself is not part of the link
const logoSettings =
  'https://jonasward.github.io/svg-sdf/?s=J_AeAnMALuABg9u_mIAFwTCn0uDIf-jwim4gA____ZD249j6NmkjwdFQgB6WDi-gaFXohCtZXfv0gF--AChYcPEzKqJgWAAeuCYUewpcEwo';

const metaData: ProjectMetaData = {
  id,
  webstring: 'state-to-function-2',
  name: 'State to Function 2',
  projectType: ProjectCategory.Software,
  description: 'Simple math stored in the url, now with densing',
  keyImage: logo,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.Frontend, Keywords.Software, Technologies.Densing, Technologies.React, Technologies.TypeScript]
};

export const stateToFunction2: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(definitions, metaData.name, 'black-on-white'),
  projectContent: [
    createText(
      2,
      [
        'State to Function 2',
        'Second iteration of State to Function, the POC to store simple math in a url. Cleaner UI without antd, and the state is now packed with densing instead of url-safe-bitpacking.'
      ],
      'Inputs and methods are put together on the Definitions page, either by clicking terms together or by typing them as formulas, with autocomplete. The Applet turns the definition into a small calculator, which can be exported as CSV or as a PDF with a QR code.',
      'Links from the first version still work. They are recognised by their version byte, decoded with url-safe-bitpacking and rewritten in the new format. Still no backend used at all!'
    ),
    {
      type: ProjectContentType.ExternalLinkList,
      links: [
        {
          type: ProjectContentType.ExternalLink,
          href: APP,
          alternativeName: 'Render Deployment'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://github.com/JonasWard/state-to-function',
          alternativeName: 'github'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/state-to-function/',
          alternativeName: 'State to Function'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/densing/',
          alternativeName: 'densing'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/sdf-svg/',
          alternativeName: 'SVG SDF'
        }
      ]
    },
    {
      ...createImage(logo, 'Logo rendered with SVG SDF © J.W.'),
      link: { href: logoSettings, title: 'Open these settings in the playground' }
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        view(definitions, 'Definitions', `edit/${DEFINITION}`),
        view(applet, 'Applet', `applet/${DEFINITION}/${APPLET}`),
        view(formulas, 'Methods typed as formulas', `edit/${DEFINITION}`),
        view(autocomplete, 'Formula autocomplete', `edit/${DEFINITION}`),
        view(settings, 'Settings', `edit/${DEFINITION}`),
        view(help, 'Help', `help/${DEFINITION}`)
      ]
    },
    createText(
      2,
      [
        'QR codes and base45',
        'A QR code can store text in a few modes. Byte mode costs 8 bits per character. Alphanumeric mode only knows 45 characters - digits, capitals, space and $%*+-./: - but packs two of them in 11 bits, so 5.5 bits per character. base64url needs lowercase letters, so its QR code always ends up in byte mode, spending 8 bits on every 6 bits of data.'
      ],
      'densing can therefore also write the QR alphabet. It is called base45, though it only uses the url safe part of those 45 characters: digits, capitals, - and the dot. The string gets a bit longer, but every character only costs 5.5 bits in the code. The link in the QR code of the PDF is written in it, entirely in capitals, so that the whole url stays alphanumeric.',
      'For the example definition with one changed input: the normal link is 192 characters and needs a 49 x 49 QR code (version 8), the QR link is 207 characters and fits in 45 x 45 (version 7).'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        { ...createImage(builderBase64url, 'Definition schema, 428 bits as 72 base64url characters, 576 bits in a QR code'), link: builderLink },
        { ...createImage(builderBase45, 'The same data as 82 base45 characters, 451 bits in a QR code'), link: builderLink },
        view(pdf, 'PDF export, the QR code holds the base45 link', `applet/${DEFINITION}/${APPLET}`)
      ]
    }
  ]
};
