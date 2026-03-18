import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { Keywords } from 'src/types/keywords/keywords';
import { Technologies } from 'src/types/keywords/technologies';

import eduard from './asssets/a-merry-fx-mesh/eduard.webp';
import julie from './asssets/a-merry-fx-mesh/julie.webp';
import marie from './asssets/a-merry-fx-mesh/marie.webp';
import nik from './asssets/a-merry-fx-mesh/nik.webp';
import oma from './asssets/a-merry-fx-mesh/oma.webp';
import pol from './asssets/a-merry-fx-mesh/pol.webp';
import richa from './asssets/a-merry-fx-mesh/richa.webp';
import roxas from './asssets/a-merry-fx-mesh/roxas.webp';
import sylvain from './asssets/a-merry-fx-mesh/sylvain.webp';

import editingPattern from './asssets/a-merry-fx-mesh/editing-pattern.webp';
import editingText from './asssets/a-merry-fx-mesh/editing-text.webp';

const id = '2024-07';

const metaData: ProjectMetaData = {
  id,
  webstring: 'a-merry-fx-mesh',
  name: 'A Merry FX Mesh',
  projectType: ProjectCategory.Art,
  description: 'New Year and Christmas Wishes 2024',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [
    Keywords.Shaders,
    Keywords.Patterns,
    Keywords.Software,
    Keywords.Frontend,
    Technologies.ReactThreeFiber,
    Technologies.GLSL,
    Technologies.Densing
  ]
};

export const aMerryFXMesh: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(pol, metaData.name, 1441, 1367),
  projectContent: [
    createText(
      2,
      ['A Merry FX Mesh', 'New Year and Christmas Wishes 2024. Entire state stored in the url!'],
      'You can edit the pattern and text. Everything gets stored in the url!',
      'Feel free to try out the link and share with a friend!'
    ),
    {
      type: ProjectContentType.ExternalLink,
      href: 'https://jonasward.github.io/a-merry-fx-mesh/',
      alternativeName: 'Github Pages Deployment'
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [createImage(editingPattern, 'Editing Pattern'), createImage(editingText, 'Editing Text')]
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [eduard, julie, marie, nik, oma, pol, richa, roxas, sylvain].map((i) => createImage(i, '© J.W.'))
    }
  ]
};
