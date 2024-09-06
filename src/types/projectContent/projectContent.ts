import { ProjectExternalLink } from './projectExternalLink';
import { ProjectImage } from './projectImage';
import { ProjectImages } from './projectImages';
import { ProjectImageText } from './projectImageText';
import { ProjectList } from './projectList';
import { ProjectText } from './projectText';

export type ProjectContent = ProjectText | ProjectImage | ProjectImages | ProjectImageText | ProjectExternalLink | ProjectList;
