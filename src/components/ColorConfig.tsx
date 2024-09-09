import { ProjectCategory } from '../types/keywords/categoryTypes';
import { ProjectContext } from '../types/keywords/projectContext';
import { ProjectPartnerContext } from '../types/keywords/projectPartnerContext';
import { ProjectContentType } from '../types/projectContent/projectContentType';
import { ProjectCard } from './projects/overview/ProjectCard';

export const ProjectColorView: React.FC = () => {
  return (
    <div>
      {Object.values(ProjectCategory).map((category, i) => {
        return (
          <ProjectCard
            index={0}
            metaData={{
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
            }}
            keyImage={{
              type: ProjectContentType.Image,
              imageHref: '',
              imageWidth: undefined,
              imageHeigth: undefined,
              imageText: undefined,
              imageTextSize: undefined,
              imageTextPosition: undefined,
              imageTextAlignment: undefined,
            }}
            left={240 * i + 50}
            top={30}
            triggerRerender={() => {}}
          />
        );
      })}
    </div>
  );
};
