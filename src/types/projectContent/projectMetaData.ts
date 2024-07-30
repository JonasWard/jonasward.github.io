import { ProjectCategory } from '../categoryTypes';
import { Keywords } from '../keywords';
import { ProjectContext } from '../projectContext';
import { ProjectPartnerContext } from '../projectPartnerContext';
import { Technologies } from '../technologies';

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
