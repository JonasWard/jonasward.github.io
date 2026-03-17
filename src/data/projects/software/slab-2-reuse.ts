import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import architectView from './assets/slab-2-reuse/architect-view.webp';
import defaultViewer from './assets/slab-2-reuse/default-viewer.webp';
import engineerView from './assets/slab-2-reuse/engineer-view.webp';
import landing from './assets/slab-2-reuse/landing.webp';
import presentation1 from './assets/slab-2-reuse/presentation-1.webp';
import presentation2 from './assets/slab-2-reuse/presentation-2.webp';
import presentation3 from './assets/slab-2-reuse/presentation-3.webp';
import selector from './assets/slab-2-reuse/selector.webp';
import table from './assets/slab-2-reuse/table.webp';

const id = '2025-02';

const metaData: ProjectMetaData = {
  id,
  webstring: 'slab-2-reuse',
  name: 'Slab 2 Reuse',
  projectType: ProjectCategory.Software,
  description: 'AEC Hackathon 2025 - Slab 2 Reuse',
  keyImage: architectView,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Keywords.Frontend, Keywords.Development, Keywords.Ecology, Keywords.Reuse, Keywords.Hackathon],
  projectPartners: ['Janin Brandt', 'Pablo Nygaard']
};

export const slab2Reuse: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(architectView, metaData.name, 1811, 1396, 'black-on-white'),
  projectContent: [
    createText(2, ['POC Assesment Tool', 'Static webpage with boilerplate data.']),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(defaultViewer, 'Default Viewer'),
        createImage(architectView, 'Architect View'),
        createImage(engineerView, 'Engineer View'),
        createImage(landing, 'Landing'),
        createImage(table, 'Table'),
        createImage(selector, 'Which Columns'),
        createImage(presentation1, 'All tools for which we built an interface'),
        createImage(presentation2, 'Outlook'),
        createImage(presentation3, 'Team')
      ]
    }
  ]
};
