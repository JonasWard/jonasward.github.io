import { ProjectContentType } from './projectContentType';

export interface ProjectImage {
  type: ProjectContentType.Image;
  imageHref: string;
  imageText?: string;
  imageTextSize?: 'small' | 'medium' | 'large';
  imageTextPosition?: 'top' | 'bottom' | 'center';
  imageTextAlignment?: 'left' | 'center' | 'right';
}
