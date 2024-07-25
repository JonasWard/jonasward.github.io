import { ProjectContentType } from './projectContentType';

export interface ProjectText {
  maxColumnCount: 1 | 2 | 3;
  type: ProjectContentType.Text;
  content: [string, string | undefined][];
}
