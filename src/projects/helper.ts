import { ProjectContentType } from '../types/projectContent/projectContentType';
import { ProjectImage } from '../types/projectContent/projectImage';
import { ProjectImageText } from '../types/projectContent/projectImageText';
import { ProjectText } from '../types/projectContent/projectText';

export const createTitleImage = (href: string, title: string): ProjectImage => ({
  type: ProjectContentType.Image,
  imageHref: href,
  imageText: title,
  imageTextSize: 'large',
  imageTextPosition: 'center',
  imageTextAlignment: 'center',
});

export const createText = (...texts: [string, string | undefined][]): ProjectText => ({
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
    type: ProjectContentType.Text,
    content: [[title, description]],
  },
  position,
});
