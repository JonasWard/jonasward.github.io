import { ProjectContentType } from '../types/projectContent/projectContentType';
import { ProjectImage, ResponsivePicture } from '../types/projectContent/projectImage';
import { ProjectImageText } from '../types/projectContent/projectImageText';
import { ProjectMetaData } from '../types/projectContent/projectMetaData';
import { ProjectText } from '../types/projectContent/projectText';

// vector images don't need resized variants, only their aspect ratio to reserve space while loading
export const svgPicture = (src: string, w: number, h: number): ResponsivePicture => ({ sources: {}, img: { src, w, h } });

export const createTitleImage = (
  picture: ResponsivePicture,
  title: string,
  imageTextColor?: 'white-on-black' | 'black-on-white',
  maxImageHeight?: number,
  maxImageWidth?: number
): ProjectImage => ({
  type: ProjectContentType.Image,
  picture,
  imageText: title,
  imageTextSize: 'large',
  imageTextPosition: 'center',
  imageTextAlignment: 'center',
  maxImageHeight,
  maxImageWidth,
  imageTextColor
});

export const createImage = (
  picture: ResponsivePicture,
  text?: string,
  maxImageHeight?: number,
  maxImageWidth?: number
): ProjectImage => ({
  type: ProjectContentType.Image,
  picture,
  imageText: text,
  maxImageHeight,
  maxImageWidth
});

export const createText = (maxColumnCount: 1 | 2 | 3 = 1, ...texts: (string | [string, string])[]): ProjectText => ({
  maxColumnCount,
  type: ProjectContentType.Text,
  content: texts,
});

export const createTextImage = (
  picture: ResponsivePicture,
  description: string,
  title: string,
  imageText?: string,
  position?: 'left' | 'right' | 'top' | 'bottom',
  maxImageHeight?: number,
  maxImageWidth?: number
): ProjectImageText => ({
  type: ProjectContentType.ImageText,
  image: {
    type: ProjectContentType.Image,
    picture,
    imageText
  },
  text: {
    maxColumnCount: 1,
    type: ProjectContentType.Text,
    content: [[title, description]]
  },
  position,
  maxImageHeight,
  maxImageWidth
});

export const getProjectKeywords = (metaData: ProjectMetaData): string[] => [
  metaData.projectType,
  metaData.projectContext,
  metaData.projectPartnerContext,
  ...(metaData.client ? [metaData.client] : []),
  ...(metaData.projectPartners ? metaData.projectPartners : []),
  ...(metaData.keywords ? metaData.keywords : [])
];
