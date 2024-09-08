import { ProjectCategory } from '../keywords/categoryTypes';
import { Keywords } from '../keywords/keywords';
import { ProjectContext } from '../keywords/projectContext';
import { ProjectPartnerContext } from '../keywords/projectPartnerContext';
import { Technologies } from '../keywords/technologies';

export type ProjectMetaData = {
  id: string;
  webstring: string;
  name: string;
  projectType: ProjectCategory;
  description: string;
  keyImage?: string;
  keywords?: (Keywords | ProjectCategory | Technologies)[];
  projectContext: ProjectContext;
  projectPartnerContext: ProjectPartnerContext;
  projectPartners?: string[];
};
