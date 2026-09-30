import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import keyImage from './assets/stauffer-static/keyImage.png?responsive';
import buckling from './assets/stauffer-static/buckling.png?responsive';
import calculations from './assets/stauffer-static/calculations.png?responsive';
import indeterminateBeam from './assets/stauffer-static/indeterminateBeam.png?responsive';
import plateBuckling from './assets/stauffer-static/plateBuckling.png?responsive';
import resources from './assets/stauffer-static/resources.png?responsive';
import results from './assets/stauffer-static/results.png?responsive';
import tenants from './assets/stauffer-static/tenants.png?responsive';
import { Technologies } from 'src/types/keywords/technologies';

const id = '2023-02';

const metaData: ProjectMetaData = {
  id,
  webstring: 'stauffer-static',
  name: 'Stauffer Static',
  projectType: ProjectCategory.Software,
  description: 'Front-end Static Calculator',
  keyImage,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Keywords.Frontend, Keywords.Timber, Technologies.React, Technologies.SVG],
  projectPartners: ['Hanno Stehling', 'Jingchen Chen'],
  client: 'Design-to-Production'
};

export const staufferStatic: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(keyImage, metaData.name),
  projectContent: [
    createText(
      2,
      'Stauffer Static is a static calculator for Timber contracters. All calculations are done fully clientside, though through the backend certain shared input data can be accesed. All calculation are done according to the SIA norms.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [buckling, calculations, indeterminateBeam, plateBuckling, resources, results, tenants].map((i) =>
        createImage(i, '© Ditronc AG')
      )
    }
  ]
};
