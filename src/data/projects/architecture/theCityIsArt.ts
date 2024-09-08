import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import projectImage from './assets/theCityIsArt.jpg';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createText, createTextImage, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';

const id = '2020-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'the-city-is-art',
  name: 'The City is Art',
  projectType: ProjectCategory.Design,
  description: 'neural style transfers',
  keyImage: undefined,
  projectContext: ProjectContext.Personal,
  projectPartnerContext: ProjectPartnerContext.Solo,
};

const maxColumnCount = 1;

export const theCityIsArt: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name, 1970, 2183),
  projectContent: [
    createText(maxColumnCount, [
      "something else, but really a lot so that we can really see how this works. And that really over very many lines because otherwise we really can't see to much with this. What do you think, does it actually look like something appealing or is it rather meh?",
      'something',
    ]),
    createText(maxColumnCount, [
      "something else, but really a lot so that we can really see how this works. And that really over very many lines because otherwise we really can't see to much with this. What do you think, does it actually look like something appealing or is it rather meh?",
      'something',
    ]),
    createText(maxColumnCount, [
      "something else, but really a lot so that we can really see how this works. And that really over very many lines because otherwise we really can't see to much with this. What do you think, does it actually look like something appealing or is it rather meh?",
      'something',
    ]),
    createTextImage(projectImage, "this is some bs text that belong to this image, don't ask me too much about it ...", 'something', 'text', 'left'),
    createText(maxColumnCount, [
      "something else, but really a lot so that we can really see how this works. And that really over very many lines because otherwise we really can't see to much with this. What do you think, does it actually look like something appealing or is it rather meh?",
      'something',
    ]),
  ],
};
