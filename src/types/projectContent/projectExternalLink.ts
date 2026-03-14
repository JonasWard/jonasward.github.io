import { ProjectContentType } from './projectContentType';

export type ProjectExternalLink = {
  type: ProjectContentType.ExternalLink;
  href: string;
  description?: string;
  alternativeName?: string;
};

export type ProjectExternalLinkList = {
  type: ProjectContentType.ExternalLinkList;
  links: ProjectExternalLink[];
};