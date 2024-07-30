import { ProjectCategory } from '../types/categoryTypes';
import { NamedColor } from '../types/colorLocalisation';
import { Keywords } from '../types/keywords';
import { ProjectContext } from '../types/projectContext';
import { ProjectPartnerContext } from '../types/projectPartnerContext';
import { PLASMA } from './plasma';

const getLightness = (color: [number, number, number]): number => 0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2];

// helper method for getting a color for a given t value (between 0 and 1)
const getColorFromUUIDPlasma = (t: number): [number, number, number] => {
  const index = t * (PLASMA.length - 1);
  const i0 = Math.floor(index);
  const i1 = Math.ceil(index);

  if (i0 === i1) return PLASMA[i0];
  const f = index - i0;
  return [PLASMA[i0][0] * (1 - f) + PLASMA[i1][0] * f, PLASMA[i0][1] * (1 - f) + PLASMA[i1][1] * f, PLASMA[i0][2] * (1 - f) + PLASMA[i1][2] * f];
};

const missingAttributes: (Keywords | ProjectContext | ProjectPartnerContext)[] = [
  ...Object.values(Keywords),
  ...Object.values(ProjectContext),
  ...Object.values(ProjectPartnerContext),
];

export const PrimaryColorMap: Record<NamedColor, string> = {
  [ProjectCategory.Design]: 'white',
  [ProjectCategory.Architecture]: 'red',
  [ProjectCategory.Art]: 'white',
  [ProjectCategory.Urbanism]: 'red',
  ...Object.fromEntries(
    missingAttributes.map((attributeName, index, array) => [
      attributeName,
      getLightness(getColorFromUUIDPlasma(index / (array.length - 1))) < 0.5 ? 'white' : 'black',
    ])
  ),
} as Record<NamedColor, string>;

export const SecondaryColorMap: Record<NamedColor, string> = {
  [ProjectCategory.Design]: 'red',
  [ProjectCategory.Architecture]: 'yellow',
  [ProjectCategory.Art]: 'blue',
  [ProjectCategory.Urbanism]: 'black',
  ...Object.fromEntries(
    missingAttributes.map((attributeName, index, array) => [
      attributeName,
      `rgb(${getColorFromUUIDPlasma(index / (array.length - 1))
        .map((v) => ((1 + v) % 1) * 255)
        .join(',')})`,
    ])
  ),
} as Record<NamedColor, string>;
