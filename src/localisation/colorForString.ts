import { NamedColor } from '../types/colorLocalisation';
import { PrimaryColorMap, SecondaryColorMap } from './colorMap';

export const getPrimaryColorForString = (str: string): string => PrimaryColorMap[str as NamedColor] || '#ffffff';
export const getSecondaryColorForString = (str: string): string => SecondaryColorMap[str as NamedColor] || '#000000';
