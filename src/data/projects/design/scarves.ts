import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import projectImage from './assets/scarves/20221214_jvb_flow_7.jpeg';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import image1 from './assets/scarves/20221209_jvb_mandelbrot_0.jpeg';
import image2 from './assets/scarves/20221209_jvb_mandelbrot_1.jpeg';
import image3 from './assets/scarves/20221209_jvb_mandelbrot_2.jpeg';
import image4 from './assets/scarves/20221209_jvb_mandelbrot_5.jpeg';
import image5 from './assets/scarves/20221209_jvb_mandelbrot_7.jpeg';
import image6 from './assets/scarves/20221214_jvb_Mandelbrot_C_1.jpeg';
import image7 from './assets/scarves/20221214_jvb_Mandelbrot_C_15.jpeg';
import image8 from './assets/scarves/20221214_jvb_Mandelbrot_C_2.jpeg';
import image9 from './assets/scarves/20221214_jvb_Mandelbrot_C_4.jpeg';
import image10 from './assets/scarves/20221214_jvb_disjunct_b_0.jpeg';
import image11 from './assets/scarves/20221214_jvb_disjunct_b_1.jpeg';
import image12 from './assets/scarves/20221214_jvb_disjunct_b_3.jpeg';
import image13 from './assets/scarves/20221214_jvb_disjunct_b_5.jpeg';
import image14 from './assets/scarves/20221214_jvb_disjunct_b_8.jpeg';
import image15 from './assets/scarves/20221214_jvb_flow_10.jpeg';
import image16 from './assets/scarves/20221214_jvb_flow_13.jpeg';
import image17 from './assets/scarves/20221214_jvb_flow_3.jpeg';
import image19 from './assets/scarves/20221214_jvb_sylvain_quotations_5.jpeg';
import image18 from './assets/scarves/20221214_jvb_flow_4.jpeg';
import image20 from './assets/scarves/20221214_jvb_sylvain_quotations_0.jpg';
import image21 from './assets/scarves/20221214_jvb_sylvain_quotations_1.jpg';
import image22 from './assets/scarves/20221214_jvb_sylvain_quotations_2.jpeg';
import image23 from './assets/scarves/20221214_jvb_sylvain_quotations_3.jpeg';

const id = '2022-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'scarves',
  name: 'SDF Scarves',
  projectType: ProjectCategory.Design,
  description: 'knitted scarves using pattern generator',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.Knitting, Keywords.Patterns],
};

export const scarves: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name, 2048, 1536),
  projectContent: [
    createText(2, ['This project is about knitting scarves using a pattern generator.', undefined]),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
        image9,
        image10,
        image11,
        image12,
        image13,
        image14,
        image15,
        image16,
        image17,
        image19,
        image18,
        image20,
        image21,
        image22,
        image23,
      ].map((i) => createImage(i, '©️J.W.')),
    },
  ],
};
