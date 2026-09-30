import type { Picture } from 'vite-imagetools';
import { ProjectContentType } from './projectContentType';

// output of an `import img from './x.jpg?responsive'` (see vite.config.mts)
export type ResponsivePicture = Picture;

export type ProjectImage = {
  type: ProjectContentType.Image;
  picture: ResponsivePicture;
  imageText?: string;
  maxImageHeight?: number;
  maxImageWidth?: number;
  imageTextSize?: 'small' | 'medium' | 'large';
  imageTextPosition?: 'top' | 'bottom' | 'center';
  imageTextAlignment?: 'left' | 'center' | 'right';
  imageTextColor?: 'white-on-black' | 'black-on-white';
};
