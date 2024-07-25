import { ProjectContent } from './projectContent';
import { ProjectImage } from './projectImage';
import { ProjectMetaData } from './projectMetaData';

export type ProjectData = {
  id: string;
  metaData: ProjectMetaData;
  projectImage: ProjectImage;
  projectContent: ProjectContent[];
};
