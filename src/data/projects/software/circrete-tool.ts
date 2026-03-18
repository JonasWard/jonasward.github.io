import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';
import { Technologies } from 'src/types/keywords/technologies';

import view from './assets/circrete-tool/3d-view.webp';
import components from './assets/circrete-tool/components.webp';
import geometry from './assets/circrete-tool/geometry.webp';
import overview from './assets/circrete-tool/overview.webp';

const id = '2025-04';

const metaData: ProjectMetaData = {
  id,
  webstring: 'circrete-tool',
  name: 'circrete Tool',
  projectType: ProjectCategory.Software,
  description: 'circrete Assesment tool for Concrete Elements',
  keyImage: view,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Keywords.Frontend, Keywords.Ecology, Keywords.Reuse, Technologies.ReactThreeFiber],
  projectPartners: ['Janin Brandt']
};

export const circreteTool: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(view, metaData.name, 1761, 1375),
  projectContent: [
    createText(2, ['POC Assesment Tool', 'Static webpage, with convex backend, written in typescript.']),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(components, 'Component List View'),
        createImage(geometry, 'Geometry level View'),
        createImage(overview, 'Overview')
      ]
    }
  ]
};
