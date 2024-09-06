import { ProjectContentType } from './projectContentType';

export interface ProjectList {
  type: ProjectContentType.List;
  title?: string;
  description?: string;
  content: [string, string][] | string[];
}
