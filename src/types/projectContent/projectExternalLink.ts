import { ProjectContentType } from './projectContentType';

export interface ProjectExternalLink {
  type: ProjectContentType.ExternalLink;
  href: string;
  description?: string;
  alternativeName?: string;
}
