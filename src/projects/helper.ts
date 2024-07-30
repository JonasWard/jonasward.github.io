import { ProjectContentType } from '../types/projectContent/projectContentType';
import { ProjectImage } from '../types/projectContent/projectImage';
import { ProjectImageText } from '../types/projectContent/projectImageText';
import { ProjectText } from '../types/projectContent/projectText';

export const createTitleImage = (href: string, title: string, imageWidth: number, imageHeigth: number): ProjectImage => ({
  type: ProjectContentType.Image,
  imageHref: href,
  imageText: title,
  imageTextSize: 'large',
  imageTextPosition: 'center',
  imageTextAlignment: 'center',
  imageWidth,
  imageHeigth,
});

export const createImage = (href: string, text?: string): ProjectImage => ({
  type: ProjectContentType.Image,
  imageHref: href,
  imageText: text,
});

export const createText = (maxColumnCount: 1 | 2 | 3 = 1, ...texts: [string, string | undefined][]): ProjectText => ({
  maxColumnCount,
  type: ProjectContentType.Text,
  content: texts,
});

export const createTextImage = (
  imageHref: string,
  description: string,
  title: string,
  imageText?: string,
  position?: 'left' | 'right' | 'top' | 'bottom'
): ProjectImageText => ({
  type: ProjectContentType.ImageText,
  image: {
    type: ProjectContentType.Image,
    imageHref,
    imageText,
  },
  text: {
    maxColumnCount: 1,
    type: ProjectContentType.Text,
    content: [[title, description]],
  },
  position,
});
