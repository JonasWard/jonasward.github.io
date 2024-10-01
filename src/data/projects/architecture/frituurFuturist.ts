import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import frituurOrtho1 from './assets/frituur-futurist/frituurOrtho1.png';
import frituurOrtho2 from './assets/frituur-futurist/frituurOrtho2.png';
import frituurOrtho3 from './assets/frituur-futurist/frituurOrtho3.png';
import frituurOrtho4 from './assets/frituur-futurist/frituurOrtho4.png';
import frituurOrtho5 from './assets/frituur-futurist/frituurOrtho5.png';
import frituurRender from './assets/frituur-futurist/frituurRender.jpg';
import futuristBelgie from './assets/frituur-futurist/futuristBelgie.png';
import futuristCharlesDemeer from './assets/frituur-futurist/futuristCharlesDemeer.png';
import futuristEeuwfeestlaan from './assets/frituur-futurist/futuristEeuwfeestlaan.png';
import futuristExpo58 from './assets/frituur-futurist/futuristExpo58.png';
import futuristLakenstraat from './assets/frituur-futurist/futuristLakenstraat.png';
import futuristLogo from './assets/frituur-futurist/futuristLogo.png';
import futuristReferences from './assets/frituur-futurist/futuristReferences.jpg';
import futuristTitle from './assets/frituur-futurist/futuristTitle.png';
import frituurReferences from './assets/frituur-futurist/frituurReferences.jpg';

const id = '2017-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'futurist',
  name: 'Frituur Futurist',
  projectType: ProjectCategory.Design,
  description: 'Competion Entry for Contemporary Frying House Brussels',
  keyImage: futuristTitle,
  projectContext: ProjectContext.Academic,
  projectPartnerContext: ProjectPartnerContext.Team,
  projectPartners: ['Jan Verstraete', 'Dominque Girolami'],
};

const maxColumnCount = 1;

export const frituurFuturist: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(futuristTitle, metaData.name, 1350, 1362),
  projectContent: [
    createText(maxColumnCount, [
      'frituur futurist',
      'This competition invited designers from all over Belgium to develop a new - iconic - model for the languishing fritkot typology. We approached it as such. The frying house as an icon for the Belgian zeitgeist of the today, yesterday and tomorrow, heavily influenced by the work of the "French Fries Professor" Paul Illegems.',
    ]),
    {
      type: ProjectContentType.ImageGrid,
      images: [futuristBelgie].map((image) => createImage(image, '©️ J.W.')),
    },
    createText(
      maxColumnCount,
      'Although Brussels is a multicultural hub, an administrative powerhouse and a cultural incubator very few of the architecture realisations of the past five decades are iconic or actually even noteworthy ... Though there are plenty of inspiring examples of architectural marvels to find in the post-war (re)development boom upto the sixties. A prime example was the World Fair of 1958 organised in Brussels.'
    ),
    createImage(futuristExpo58, '©️ J.W.'),
    createText(maxColumnCount, [
      'EXPO 58 - Iconic Brussels',
      'Although Brussels is a multicultural hub, an administrative powerhouse and a cultural incubator very few of the architecture realisations of the past five decades are iconic or actually even noteworthy ... Though there are plenty of inspiring examples of architectural marvels to find in the post-war (re)development boom upto the sixties. A prime example was the World Fair of 1958 organised in Brussels.',
    ]),
    createImage(frituurReferences, '©️ J.W.'),
    createText(maxColumnCount, [
      'The Frituur / Fritkot / Friterie',
      'Besides what is on offering, nothing about the Frituur is iconic. The most important thing they all have in common is the high degree of bricolage they seem to feature. Though it is possible to distinguish to a certain degree few distinct typologies, none of those typologies would be recognisable in their bareform. All Friteries are depending on eye-catchers to make themselves legible. Often using sigs - with or without bright neon lights - but nearly always using upscaled models of the typical conical paper bag in which Belgian french-fries are served.',
    ]),
    createImage(futuristLogo, '©️ J.W.'),
    createText(
      maxColumnCount,
      ['The Iconic Frituur', 'After some form-finding we came up with an upscaled version of the iconic conical fry packaging.'],
      'Though we also had a socio-economical aspect to our design. The typical freestanding frying houses as a typology is slowly falling out of favour for more typical restaurant/internalised typologies. As is the menu. Originally only serving french fries with a large area of sauces and some small extras, modern fastfood joints offer a plethora of options to choose from, with french-fries becoming an optional extra. We concluded that the only way the frituur could somehow remain the same was to ally itself to another function. The resulting gestalt typology would enable it to remain a relevant and justified feature of the ever more gentrified Belgian cityscapes, without having to compromise its original function namely: selling French fries.'
    ),
    createImage(futuristReferences, '©️ J.W.'),
    createText(maxColumnCount, ['Plans & Sections', '']),
    {
      type: ProjectContentType.ImageGrid,
      images: [frituurOrtho1, frituurOrtho2, frituurOrtho3, frituurOrtho4, frituurOrtho5].map((image) => createImage(image)),
    },
    createText(maxColumnCount, ['Visualizations', '']),
    {
      type: ProjectContentType.ImageGrid,
      images: [frituurRender, futuristCharlesDemeer, futuristEeuwfeestlaan, futuristLakenstraat].map((image) => createImage(image)),
    },
  ],
};
