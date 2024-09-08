import { ProjectContentType } from './projectContentType';

export type ProjectImage = {
  type: ProjectContentType.Image;
  imageHref: string;
  imageWidth?: number;
  imageHeigth?: number;
  imageText?: string;
  imageTextSize?: 'small' | 'medium' | 'large';
  imageTextPosition?: 'top' | 'bottom' | 'center';
  imageTextAlignment?: 'left' | 'center' | 'right';
};
