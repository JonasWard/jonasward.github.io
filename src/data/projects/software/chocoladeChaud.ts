import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import projectImage from './assets/chocoladeChaud/chocoladeChaud.jpg?responsive';
import freeStyle1 from './assets/chocoladeChaud/freestyle_1.jpg?responsive';
import freeStyle2 from './assets/chocoladeChaud/freestyle_2.jpg?responsive';

import result1 from './assets/chocoladeChaud/results_1.jpg?responsive';
import result2 from './assets/chocoladeChaud/results_2.jpg?responsive';
import result3 from './assets/chocoladeChaud/results_3.jpg?responsive';
import resulta from './assets/chocoladeChaud/results_a.jpg?responsive';
import resultb from './assets/chocoladeChaud/results_b.jpg?responsive';

import positive1 from './assets/chocoladeChaud/molds_1.jpg?responsive';
import positive2 from './assets/chocoladeChaud/molds_2.jpg?responsive';
import positive3 from './assets/chocoladeChaud/molds_3.jpg?responsive';
import positive4 from './assets/chocoladeChaud/molds_4.jpg?responsive';
import negative1 from './assets/chocoladeChaud/negative_1.jpg?responsive';
import negative2 from './assets/chocoladeChaud/negative_2.jpg?responsive';
import negative3 from './assets/chocoladeChaud/negative_3.jpg?responsive';

import mosque1 from './assets/chocoladeChaud/mosque_1.jpg?responsive';
import mosque2 from './assets/chocoladeChaud/mosque_2.jpg?responsive';
import mosque3 from './assets/chocoladeChaud/mosque_3.jpg?responsive';
import mosque4 from './assets/chocoladeChaud/mosque_4.jpg?responsive';
import mosque5 from './assets/chocoladeChaud/mosque_5.jpg?responsive';
import mosque6 from './assets/chocoladeChaud/mosque_6.jpg?responsive';

import pompidou1 from './assets/chocoladeChaud/pompidou_1.jpg?responsive';
import pompidou2 from './assets/chocoladeChaud/pompidou_2.jpg?responsive';
import pompidou3 from './assets/chocoladeChaud/pompidou_3.jpg?responsive';
import pompidou4 from './assets/chocoladeChaud/pompidou_4.jpg?responsive';
import pompidou5 from './assets/chocoladeChaud/pompidou_5.jpg?responsive';
import pompidou6 from './assets/chocoladeChaud/pompidou_6.jpg?responsive';
import { Technologies } from '../../../types/keywords/technologies';

const id = '2023-04';

const metaData: ProjectMetaData = {
  id,
  webstring: 'chocolade-chaud',
  name: 'Chocolade Chaud',
  projectType: ProjectCategory.Software,
  description: 'First experiments for an online chocolate bar configurator',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [
    Keywords.Patterns,
    Keywords.ThreeDPrinting,
    Keywords.Frontend,
    Technologies.BabylonJS,
    Technologies.React,
    Technologies.FDM,
    Technologies.VacuumForming,
  ],
  projectPartners: ['Malcolm Ungers'],
};

export const chocoladeChaud: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name),
  projectContent: [
    createText(
      1,
      ['Custom Chocolate Bars', 'Chocolate bars as art project'],
      'These are some images that document the first experiments for an online chocolate bar configurator.',
      ['Process', 'This something integrated workflow']
    ),
    {
      type: ProjectContentType.ExternalLink,
      href: 'https://jonasward.github.io/chocolade-chaud/',
      description: 'try it for yourself: ',
      alternativeName: 'github pages'
    },
    {
      type: ProjectContentType.List,
      description: 'I would like to thank for their help: ',
      content: [
        ['Pyry Takala', 'for some enganging conceptual discussions and chocolate casting sessions'],
        ['Malcolm Ungers', 'for some very skilled chocolate casts and help with making modlds']
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [projectImage, freeStyle1, freeStyle2].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [result1, result2, result3, resulta, resultb].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [positive1, positive2, positive3, positive4].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [negative1, negative2, negative3].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [mosque1, mosque2, mosque3, mosque4, mosque5, mosque6].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [pompidou1, pompidou2, pompidou3, pompidou4, pompidou5, pompidou6].map((i) => createImage(i, '© J.W.'))
    }
  ]
};
