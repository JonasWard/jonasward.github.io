import { ProjectContentType } from './projectContentType';

export type ProjectList = {
  type: ProjectContentType.List;
  title?: string;
  description?: string;
  content: [string, string][] | string[];
};
