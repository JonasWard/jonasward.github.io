import { ProjectContentType } from './projectContentType';

export interface ProjectText {
  type: ProjectContentType.Text;
  content: [string, string | undefined][];
}
