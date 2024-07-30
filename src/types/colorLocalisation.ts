import { ProjectCategory } from './categoryTypes';
import { Keywords } from './keywords';
import { ProjectContext } from './projectContext';
import { ProjectPartnerContext } from './projectPartnerContext';
import { Technologies } from './technologies';

export type NamedColor = ProjectCategory | Keywords | ProjectContext | ProjectPartnerContext | Technologies;
