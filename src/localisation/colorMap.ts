import { ProjectCategory } from '../types/categoryTypes';
import { NamedColor } from '../types/colorLocalisation';
import { Keywords } from '../types/keywords';
import { ProjectContext } from '../types/projectContext';
import { ProjectPartnerContext } from '../types/projectPartnerContext';

export const PrimaryColorMap: Record<NamedColor, string> = {
  [ProjectCategory.Design]: 'white',
  [ProjectCategory.Architecture]: 'red',
  [ProjectCategory.Art]: 'white',
  [ProjectCategory.Urbanism]: 'red',
  [Keywords.Development]: '',
  [Keywords.Frontend]: 'darkblue',
  [Keywords.Shaders]: 'yellow',
  [Keywords.Geometry]: '',
  [Keywords.ThreeDPrinting]: 'white',
  [Keywords.Ecology]: 'white',
  [Keywords.Knitting]: '',
  [Keywords.Patterns]: '',
  [ProjectContext.Academic]: 'blue',
  [ProjectContext.Professional]: 'darkgreen',
  [ProjectContext.Personal]: '',
  [ProjectPartnerContext.Solo]: '',
  [ProjectPartnerContext.Team]: '',
  [ProjectPartnerContext.Client]: '',
  [Keywords.DigitalFabrication]: '',
};

export const SecondaryColorMap: Record<NamedColor, string> = {
  [ProjectCategory.Design]: 'red',
  [ProjectCategory.Architecture]: 'yellow',
  [ProjectCategory.Art]: 'blue',
  [ProjectCategory.Urbanism]: 'black',
  [Keywords.Development]: '',
  [Keywords.Frontend]: 'cyan',
  [Keywords.Shaders]: 'purple',
  [Keywords.Geometry]: '',
  [Keywords.ThreeDPrinting]: 'gray',
  [Keywords.Ecology]: 'darkgreen',
  [Keywords.Knitting]: '',
  [Keywords.Patterns]: '',
  [ProjectContext.Academic]: 'ivory',
  [ProjectContext.Professional]: 'lightgreen',
  [ProjectContext.Personal]: '',
  [ProjectPartnerContext.Solo]: '',
  [ProjectPartnerContext.Team]: '',
  [ProjectPartnerContext.Client]: '',
  [Keywords.DigitalFabrication]: '',
};
