import { ProjectContentType } from './projectContentType';
import { ProjectImage } from './projectImage';

export interface ProjectImages {
  type: ProjectContentType.Images | ProjectContentType.ImageGrid;
  images: ProjectImage[];
}
