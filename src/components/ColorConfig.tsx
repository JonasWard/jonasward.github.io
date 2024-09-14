import { ProjectCategory } from '../types/keywords/categoryTypes';
import { ProjectContext } from '../types/keywords/projectContext';
import { ProjectPartnerContext } from '../types/keywords/projectPartnerContext';
import { ProjectContentType } from '../types/projectContent/projectContentType';
import { ProjectData } from '../types/projectContent/projectData';
import ProjectOverview from './projects/overview/ProjectOverview';

export const ProjectColorView: React.FC = () => {
  return (
    <ProjectOverview
      projects={Object.values(ProjectCategory).map((category, i) => {
        const project: ProjectData = {
          metaData: {
            id: '',
            webstring: '',
            name: '',
            projectType: category,
            description: category as string,
            keyImage: undefined,
            keywords: undefined,
            projectContext: ProjectContext.Academic,
            projectPartnerContext: ProjectPartnerContext.Solo,
            projectPartners: undefined,
          },
          id: '',
          projectImage: {
            type: ProjectContentType.Image,
            imageHref: '',
            imageWidth: undefined,
            imageHeigth: undefined,
            imageText: undefined,
            imageTextSize: undefined,
            imageTextPosition: undefined,
            imageTextAlignment: undefined,
          },
          projectContent: [],
        };

        return project;
      })}
    />
  );
};
