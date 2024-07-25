import { ProjectCategory } from '../types/categoryTypes';
import { NamedColor } from '../types/colorLocalisation';
import { Keywords } from '../types/keywords';
import { ProjectContext } from '../types/projectContext';
import { ProjectPartnerContext } from '../types/projectPartnerContext';

export const PrimaryColorMap: Record<NamedColor, string> = {
  [ProjectCategory.Design]: 'black',
  [ProjectCategory.Architecture]: 'orange',
  [ProjectCategory.Art]: 'green',
  [ProjectCategory.Urbanism]: 'rgba(8, 0, 255, 1)',
  [Keywords.Architecture]: '',
  [Keywords.Design]: '',
  [Keywords.Development]: '',
  [Keywords.Art]: '',
  [Keywords.Frontend]: '',
  [Keywords.Shaders]: '',
  [Keywords.Geometry]: '',
  [ProjectContext.Academic]: '',
  [ProjectContext.Professional]: '',
  [ProjectContext.Personal]: '',
  [ProjectPartnerContext.Solo]: '',
  [ProjectPartnerContext.Team]: '',
  [ProjectPartnerContext.Client]: '',
};

export const SecondaryColorMap: Record<NamedColor, string> = {
  [ProjectCategory.Design]: 'rgba(255, 234, 0, 1)',
  [ProjectCategory.Architecture]: 'yellow',
  [ProjectCategory.Art]: 'rgba(255, 0, 0, 1)',
  [ProjectCategory.Urbanism]: 'rgba(8, 0, 255, 0.3)',
  [Keywords.Architecture]: '',
  [Keywords.Design]: '',
  [Keywords.Development]: '',
  [Keywords.Art]: '',
  [Keywords.Frontend]: '',
  [Keywords.Shaders]: '',
  [Keywords.Geometry]: '',
  [ProjectContext.Academic]: '',
  [ProjectContext.Professional]: '',
  [ProjectContext.Personal]: '',
  [ProjectPartnerContext.Solo]: '',
  [ProjectPartnerContext.Team]: '',
  [ProjectPartnerContext.Client]: '',
};
