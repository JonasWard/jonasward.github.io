import { ProjectCategory } from '../categoryTypes';
import { Keywords } from '../keywords';
import { ProjectContext } from '../projectContext';
import { ProjectPartnerContext } from '../projectPartnerContext';

export type ProjectMetaData = {
  id: string;
  webstring: string;
  name: string;
  projectType: ProjectCategory;
  description: string;
  keyImage?: string;
  keywords?: Keywords[];
  projectContext: ProjectContext;
  projectPartnerContext: ProjectPartnerContext;
  projectPartners?: string[];
};
