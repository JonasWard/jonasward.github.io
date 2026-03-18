import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import projectImage from './assets/patternGenerator/patternTitle.jpg';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from 'src/types/keywords/keywords';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { Technologies } from 'src/types/keywords/technologies';

const id = '2021-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'pattern-machine',
  name: 'Pattern Machine',
  projectType: ProjectCategory.Software,
  description: 'web-based pattern SDF based pattern generator for knitting',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.Patterns, Keywords.Shaders, Technologies.GLSL]
};

export const patternMachine: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, 'Pattern Machine', 1928, 2876),
  projectContent: [
    createText(2, 'First iteration of the pattern generator'),
    {
      type: ProjectContentType.ExternalLink,
      href: '#/project/glsl-ray-marching/',
      alternativeName: 'Current Iteration'
    }
  ]
};
