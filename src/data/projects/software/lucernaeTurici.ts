import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import projectImage from './assets/lucernae-turici/lucernae-turici.jpg';
import lamp1 from './assets/lucernae-turici/lamp_1.jpg';
import lamp2 from './assets/lucernae-turici/lamp_2.jpg';
import lamp3 from './assets/lucernae-turici/lamp_3.jpg';

import group1 from './assets/lucernae-turici/group_1.jpg';
import group2 from './assets/lucernae-turici/group_2.jpg';
import group3 from './assets/lucernae-turici/group_3.jpg';
import group4 from './assets/lucernae-turici/group_4.jpg';

import form3 from './assets/lucernae-turici/form_3.jpg';
import form4 from './assets/lucernae-turici/form_4.jpg';
import form5 from './assets/lucernae-turici/form_5.jpg';
import form6 from './assets/lucernae-turici/form_6.jpg';
import form7 from './assets/lucernae-turici/form_7.jpg';
import form8 from './assets/lucernae-turici/form_8.jpg';
import form9 from './assets/lucernae-turici/form_9.jpg';
import form10 from './assets/lucernae-turici/form_10.jpg';
import form11 from './assets/lucernae-turici/form_11.jpg';
import form12 from './assets/lucernae-turici/form_12.jpg';
import form13 from './assets/lucernae-turici/form_13.jpg';
import form20 from './assets/lucernae-turici/form_20.jpg';
import form21 from './assets/lucernae-turici/form_21.jpg';
import form22 from './assets/lucernae-turici/form_22.jpg';

import print1 from './assets/lucernae-turici/print_1.jpg';
import print2 from './assets/lucernae-turici/print_2.jpg';
import print4 from './assets/lucernae-turici/print_4.jpg';
import print5 from './assets/lucernae-turici/print_5.jpg';

import config1 from './assets/lucernae-turici/config_1.png';
import config2 from './assets/lucernae-turici/config_2.png';
import config3 from './assets/lucernae-turici/config_3.png';
import config4 from './assets/lucernae-turici/config_4.png';
import config5 from './assets/lucernae-turici/config_5.jpg';
import config6 from './assets/lucernae-turici/config_6.png';
import config7 from './assets/lucernae-turici/config_7.png';
import config8 from './assets/lucernae-turici/config_8.png';
import config9 from './assets/lucernae-turici/config_9.png';
import config10 from './assets/lucernae-turici/config_10.png';
import config11 from './assets/lucernae-turici/config_11.png';
import config12 from './assets/lucernae-turici/config_12.png';

import data1 from './assets/lucernae-turici/data_1.png';
import data2 from './assets/lucernae-turici/data_2.png';

import viewa from './assets/lucernae-turici/view_a.png';
import viewb from './assets/lucernae-turici/view_b.png';
import viewc from './assets/lucernae-turici/view_c.png';

const id = '2024-03';

const metaData: ProjectMetaData = {
  id,
  webstring: 'lucernae-turici',
  name: 'Home Lamp Configurator',
  projectType: ProjectCategory.Software,
  description: 'POC and WIP lamp configurator',
  keyImage: undefined,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.ThreeDPrinting],
  projectPartners: [],
};

export const lucernaeTurici: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name, 1988, 2560),
  projectContent: [
    createText(
      2,
      ['Boiler Plate Lamp configurator text', 'Lamp Configurator'],
      ['A bit more about the configurator', undefined],
      ['A bit more about the printing', undefined]
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [projectImage, lamp1, lamp2, lamp3].map((i) => createImage(i, '©️ J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [group1, group2, group3, group4].map((i) => createImage(i, '©️ J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [form3, form4, form5, form6, form7, form8, form9, form10, form11, form12, form13, form20, form21, form22].map((i) => createImage(i, '©️ J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [config1, config2, config3, config4, config5, config6, config7, config8, config9, config10, config11, config12].map((i) =>
        createImage(i, '©️ J.W.')
      ),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [print1, print2, print4, print5].map((i) => createImage(i, '©️ J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [viewa, viewb, viewc].map((i) => createImage(i, '©️ J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [data1, data2].map((i) => createImage(i, '©️ J.W.')),
    },
  ],
};
