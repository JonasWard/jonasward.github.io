import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import holzvisionMaxFront from './assets/holzvisionMax/holzvisionMax_front.png';
import holzvisionMax_opening from './assets/holzvisionMax/holzvisionMax_opening.png';
import holzvisionMax_byType from './assets/holzvisionMax/holzvisionMax_byType.png';
import holzvisionMax_filters from './assets/holzvisionMax/holzvisionMax_filters.png';
import holzvisionMax_gantt from './assets/holzvisionMax/holzvisionMax_gantt.png';
import holzvisionMax_graph from './assets/holzvisionMax/holzvisionMax_graph.png';
import holzvisionMax_importExcel from './assets/holzvisionMax/holzvisionMax_importExcel.png';
import holzvisionMax_materialView from './assets/holzvisionMax/holzvisionMax_materialView.png';
import holzvisionMax_multiViews from './assets/holzvisionMax/holzvisionMax_multiViews.png';

const id = '2025-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'holzvision-max',
  name: 'HolzvisionMax',
  projectType: ProjectCategory.Software,
  description: 'Timber Planning tool managing Parts and Transportation',
  keyImage: holzvisionMaxFront,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Keywords.Frontend, Keywords.Development, Keywords.Timber],
  projectPartners: []
};

export const holzvisionMax: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(holzvisionMaxFront, metaData.name, 1268, 1303),
  projectContent: [
    createText(2, [
      'Web application for keeping track of the status of all parts in the context of a Collaborative Timber Project',
      'Holzvision Max was developed by Design-to-Production for The Säntis Innovation Cluster Holz in the context of Max der Muni. It is a cloud-based application that enables the many manufactureres involved in the Muni-Max project to see the status of the parts they are responsible for and show the parts they have to wait for. This all in the web browser.'
    ]),
    {
      type: ProjectContentType.ImageGrid,
      images: [createImage(holzvisionMax_opening, 'Opening View')]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(holzvisionMax_gantt, 'Gantt Graph for (related) Part Status'),
        createImage(holzvisionMax_graph, 'Relationship Graph')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(holzvisionMax_byType, 'Render by Type'),
        createImage(holzvisionMax_filters, 'Fitler Feature')
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(holzvisionMax_importExcel, 'Excel Import'),
        createImage(holzvisionMax_materialView, 'Material Renderer'),
        createImage(holzvisionMax_multiViews, 'Set / Hide attributes')
      ]
    }
  ]
};
