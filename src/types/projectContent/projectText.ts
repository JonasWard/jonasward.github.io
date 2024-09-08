import { ProjectContentType } from './projectContentType';

export type ProjectText = {
  maxColumnCount: 1 | 2 | 3;
  type: ProjectContentType.Text;
  content: [string, string | undefined][];
};
