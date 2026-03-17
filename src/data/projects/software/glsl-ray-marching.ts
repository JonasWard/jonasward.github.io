import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import smooth1 from './assets/glsl-ray-marching/glsl-ray-marching.C-uGPfYT3wqmuiOeoSiAM9wAjASAUikAi-AJQOg_8zM.webp';
import smooth2 from './assets/glsl-ray-marching/glsl-ray-marching.C-uGPfYT3wqmuiOeoSiAM9wAjAUAIjgAi-AJQOg_8zM.webp';
import smooth3 from './assets/glsl-ray-marching/glsl-ray-marching.C-uGPfYT3wqmuiOeoSiAM9wAjAYAXlwAi-AJQOg_8zM.webp';
import smooth4 from './assets/glsl-ray-marching/glsl-ray-marching.C-uGPfYT4S-muiOeoSiAOPwAjASABtAAmWQJQOg_8zM.webp';
import discrete1 from './assets/glsl-ray-marching/glsl-ray-marching.C-uGPfYT4S-muiO4QOEAFpwAjAQAEmEA-MQ7ec1zAAA.png';
import discrete2 from './assets/glsl-ray-marching/glsl-ray-marching.C-uGPfYT4S-muiOeoSiAOPwAjAQAGWACB9Q7ec1zAAA.png';
import discrete3 from './assets/glsl-ray-marching/glsl-ray-marching.C-uGPfYT4S-muiOeoSiAOPwAjAQAGWECB9Q7ec1zAAA.png';
import discrete4 from './assets/glsl-ray-marching/glsl-ray-marching.C-uGPfYT4S-muiOeoSiAOPwAjAQAGWQCB9Q7ec1zAAA.png';
import discrete5 from './assets/glsl-ray-marching/glsl-ray-marching.C-uGPfYT4S-muiOeoSiAOPwAjASAByABT5Q7ec1zAAA.png';
import discrete6 from './assets/glsl-ray-marching/glsl-ray-marching.C-uGPZSb4S-muiO4QOEAD9wAjAQBgHAALDQMCa6ALTM.png';
import discrete7 from './assets/glsl-ray-marching/glsl-ray-marching.C-uGPZSb4S-muiO4QOEAD9wAjAYBVqAALDQMCa6ALTM.png';
import discrete8 from './assets/glsl-ray-marching/glsl-ray-marching.C-uGPZSb4S-muiO4QOEAFpwAjAQADaACrUQ7ec1zAAA.png';
import tool1 from './assets/glsl-ray-marching/tool-1.png';
import tool2 from './assets/glsl-ray-marching/tool-2.png';

const id = '2024-02';

const metaData: ProjectMetaData = {
  id,
  webstring: 'glsl-ray-marching',
  name: 'GSL Ray Marching',
  projectType: ProjectCategory.Software,
  description: 'Ray Marching Pattern Configuratos',
  keyImage: discrete6,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.Frontend, Keywords.Development, Keywords.Shaders, Keywords.Patterns]
};

export const glslRayMarching: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(discrete6, metaData.name, 1441, 1320),
  projectContent: [
    createText(
      2,
      [
        'Ray Marching Pattern Configurator for 3D Printing',
        'GSL Ray Marching serves as a configurator for 3D printing ray marching patterns. It allows you to select a pattern and configure it to your liking. The configurator uses a simple WebGL canvas to render the patterns.'
      ],
      'State is stored in the url, feel free to share your creations with a friend!'
    ),
    {
      type: ProjectContentType.ExternalLinkList,
      links: [
        {
          type: ProjectContentType.ExternalLink,
          href: 'https://jonasward.github.io/glsl-ray-marching/',
          alternativeName: 'GitHub Pages Deployment'
        },
        {
          type: ProjectContentType.ExternalLink,
          href: '#/project/winterSeason-2023/',
          alternativeName: 'Scarves Created'
        }
      ]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [tool1, tool2].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [smooth1, smooth2, smooth3, smooth4].map((i) => createImage(i, '© J.W.'))
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [discrete1, discrete2, discrete3, discrete4, discrete5, discrete6, discrete7, discrete8].map((i) =>
        createImage(i, '© J.W.')
      )
    }
  ]
};
