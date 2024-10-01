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
  keywords: [Keywords.ThreeDPrinting, Keywords.Product],
  projectPartners: [],
};

export const lucernaeTurici: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name, 1988, 2560),
  projectContent: [
    createText(1, [
      'Lamp Configurator',
      'This project is the culmination of a whole bunch of preceding projects. A trajectory that started of with hand cut models had an intermediate stop at 2D CAD lasercut and 3D stl print files to reaching a first POC milestone in the beginning of 2024. A configurator for my life-long companion: Architectural Lamps.',
    ]),
    {
      type: ProjectContentType.ExternalLink,
      href: 'https://jonasward.github.io/lucernae-turici/',
      alternativeName: 'you can try out the configurator on the GitHub pages deployment!',
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [projectImage, lamp1, lamp2, lamp3].map((i) => createImage(i, '©️ J.W.')),
    },

    createText(1, [
      'Initial Geometry Experiments',
      'The lamp geometries consist of two main components: the architectural geometry and the shade. The architectural geometry is defined by three base parameters: the footprint, which includes the cell count and shape; the heights, which refer to the geometry of the cell grid; and the profile of the roof, which can vary from flat to elliptical, gothic arch, nested arch, and more. The shade, on the other hand, utilizes a signed distance field to achieve its design.',
    ]),
    {
      type: ProjectContentType.ImageGrid,
      images: [group1, group2].map((i) => createImage(i, '©️ J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [form3, form4, form5, form6].map((i) => createImage(i, '©️ J.W.')),
    },
    createText(1, [
      'Post Processing',
      'As the process started to come along I decided to also try to see how far I could push the deformation of the geometries. Right now one can twist and scale the geoemtries along its z-axis',
    ]),
    {
      type: ProjectContentType.ImageGrid,
      images: [group3, group4].map((i) => createImage(i, '©️ J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [form7, form8, form9, form10, form11, form12, form13, form20, form21, form22].map((i) => createImage(i, '©️ J.W.')),
    },
    createText(1, [
      'Visualisation',
      'The whole geometry is rendered in the browser with the help of BabylonJS and a variable paramteric model (using my url-safe-bitpacking library).',
    ]),
    {
      type: ProjectContentType.ImageGrid,
      images: [config1, config2, config3, config4, config5, config6, config7, config8, config9, config10, config11, config12].map((i) =>
        createImage(i, '©️ J.W.')
      ),
    },
    createText(
      1,
      'To be sure the geometries are geometrically sound, I heavily constrain the topology of the geometries. All the cells in the end ar extruded prismas which are hollowed out. This makes it so that it is virtually impossible to have geometric inconsistenties'
    ),

    {
      type: ProjectContentType.ImageGrid,
      images: [viewa, viewb, viewc].map((i) => createImage(i, '©️ J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [print1, print2, print4, print5].map((i) => createImage(i, '©️ J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [data1, data2].map((i) => createImage(i, '©️ J.W.')),
    },
  ],
};
