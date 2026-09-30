import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Technologies } from '../../../types/keywords/technologies';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import luchtfoto from './assets/kwatrecht/1.1.A luchtfoto.jpg?responsive';
import water from './assets/kwatrecht/1.2.B water.jpg?responsive';
import reliëf from './assets/kwatrecht/1.3.B reliëf.jpg?responsive';
import verticaalgroen from './assets/kwatrecht/1.4.B verticaal groen.jpg?responsive';
import horizontaalgroen from './assets/kwatrecht/1.5.B horizontaal groen.jpg?responsive';
import wegen from './assets/kwatrecht/1.6.B wegen.jpg?responsive';
import bebouwing from './assets/kwatrecht/1.7.B bebouwing.jpg?responsive';
import combinatiekaart from './assets/kwatrecht/1.8.B combinatiekaart.jpg?responsive';
import historischwegen from './assets/kwatrecht/2.B historisch wegen.jpg?responsive';
import historischoverzicht from './assets/kwatrecht/2.D historisch overzicht.jpg?responsive';
import mobiliteit from './assets/kwatrecht/3.B mobiliteit.jpg?responsive';
import typomorfologie from './assets/kwatrecht/4.B typo-morfologie.jpg?responsive';
import functies from './assets/kwatrecht/5.B functies.jpg?responsive';
import ledeberg from './assets/kwatrecht/6.B ledeberg.jpg?responsive';
import synthese from './assets/kwatrecht/7.A synthese.jpg?responsive';
import agrarischBeeld from './assets/kwatrecht/8.B agrarisch Beeld.jpg?responsive';
import agrarischvoor from './assets/kwatrecht/8.C agrarisch voor.jpg?responsive';
import agrarischna from './assets/kwatrecht/8.D agrarisch na.jpg?responsive';
import woondrukbeeld from './assets/kwatrecht/9.B woondruk beeld.jpg?responsive';
import woondrukvoor from './assets/kwatrecht/9.C woondruk voor.jpg?responsive';
import woondrukna from './assets/kwatrecht/9.D woondruk na.jpg?responsive';
import industriebeeld from './assets/kwatrecht/10.B industrie beeld.jpg?responsive';
import industrievoor from './assets/kwatrecht/10.C industrie voor.jpg?responsive';
import industriena from './assets/kwatrecht/10.D industrie na.jpg?responsive';
import sociaalbeeld from './assets/kwatrecht/11.B sociaal beeld.jpg?responsive';
import sociaalvoor from './assets/kwatrecht/11.C sociaal voor.jpg?responsive';
import sociaalna from './assets/kwatrecht/11.D sociaal na.jpg?responsive';
import visueelbeeld from './assets/kwatrecht/12.B visueel beeld.jpg?responsive';
import visueelvoor from './assets/kwatrecht/12.C visueel voor.jpg?responsive';
import visueelna from './assets/kwatrecht/12.D visueel na.jpg?responsive';
import RISK from './assets/kwatrecht/13.B RISK.jpg?responsive';

const id = '2013-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'kwatrecht',
  name: 'Kwatrecht Under Pressure',
  projectType: ProjectCategory.Urbanism,
  description: 'Urban development analysis of Kwatrecht',
  keyImage: RISK,
  projectContext: ProjectContext.Academic,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Technologies.QGis, Technologies.Illustrator, Technologies.AutoCAD],
  projectPartners: [
    'Kristiaan Borret',
    'Peter Vanden Abeele',
    'Luce Beeckmans',
    'An Bogaert',
    'Peter De Vlieger',
    'Dominique Girolami',
    'Sarah Nys',
    'Els Vernimmen',
    'Jan Verstraete'
  ]
};

export const kwatrecht: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(RISK, metaData.name),
  projectContent: [
    createText(2, ['Analysing Kwatrecht', 'Group Project in Urbanism in Bachelor IR Architecture']),
    createImage(luchtfoto, 'aerial photography'),
    createText(1, 'initial deconstructing of different landscape features'),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(water, 'water'),
        createImage(reliëf, 'topography'),
        createImage(verticaalgroen, 'vertical green'),
        createImage(horizontaalgroen, 'horizontal green'),
        createImage(wegen, 'roads'),
        createImage(bebouwing, 'buildings'),
      ],
    },
    createImage(combinatiekaart, 'combination map'),
    createText(1, 'historical aspects'),
    {
      type: ProjectContentType.ImageGrid,
      images: [createImage(historischwegen, 'historical roads'), createImage(historischoverzicht, 'historical map')],
    },
    createText(1, 'site-specific aspects'),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(mobiliteit, 'mobility'),
        createImage(typomorfologie, 'typo-morphology'),
        createImage(functies, 'functions'),
        createImage(ledeberg, 'comparison'),
      ],
    },
    createImage(synthese, 'synthesis'),
    createText(
      1,
      'analysis of different morphological features and there projected development patterns in case of them being prioritized from an urban development perspective'
    ),
    createImage(agrarischBeeld, 'agrarian'),
    {
      type: ProjectContentType.ImageGrid,
      images: [createImage(agrarischvoor, 'current'), createImage(agrarischna, 'pressure')],
    },
    createImage(woondrukbeeld, 'living'),
    {
      type: ProjectContentType.ImageGrid,
      images: [createImage(woondrukvoor, 'current'), createImage(woondrukna, 'pressure')],
    },
    createImage(industriebeeld, 'industry'),
    {
      type: ProjectContentType.ImageGrid,
      images: [createImage(industrievoor, 'current'), createImage(industriena, 'pressure')],
    },
    createImage(sociaalbeeld, 'social'),
    {
      type: ProjectContentType.ImageGrid,
      images: [createImage(sociaalvoor, 'current'), createImage(sociaalna, 'pressure')],
    },
    createImage(visueelbeeld, 'visual (dis)continuity'),
    {
      type: ProjectContentType.ImageGrid,
      images: [createImage(visueelvoor, 'current'), createImage(visueelna, 'pressure')],
    },
  ],
};
