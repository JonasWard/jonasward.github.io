import { ProjectContentType } from './projectContentType';
import { ProjectImage } from './projectImage';

export type ProjectImages = {
  type: ProjectContentType.Images | ProjectContentType.ImageGrid;
  images: ProjectImage[];
};
