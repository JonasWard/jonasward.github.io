import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { Keywords } from 'src/types/keywords/keywords';
import { Technologies } from 'src/types/keywords/technologies';

import eduard from './asssets/a-merry-fx-mesh/eduard.webp?responsive';
import julie from './asssets/a-merry-fx-mesh/julie.webp?responsive';
import marie from './asssets/a-merry-fx-mesh/marie.webp?responsive';
import nik from './asssets/a-merry-fx-mesh/nik.webp?responsive';
import oma from './asssets/a-merry-fx-mesh/oma.webp?responsive';
import pol from './asssets/a-merry-fx-mesh/pol.webp?responsive';
import richa from './asssets/a-merry-fx-mesh/richa.webp?responsive';
import roxas from './asssets/a-merry-fx-mesh/roxas.webp?responsive';
import sylvain from './asssets/a-merry-fx-mesh/sylvain.webp?responsive';

import editingPattern from './asssets/a-merry-fx-mesh/editing-pattern.webp?responsive';
import editingText from './asssets/a-merry-fx-mesh/editing-text.webp?responsive';

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
  projectImage: createTitleImage(pol, metaData.name),
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
