import { ProjectImage } from './projectImage';
import { ProjectImages } from './projectImages';
import { ProjectImageText } from './projectImageText';
import { ProjectText } from './projectText';

export type ProjectContent = ProjectText | ProjectImage | ProjectImages | ProjectImageText;
