import { List } from '../../types/cv/cvType';
import { PDFDivText } from './InfoRenderer';
import type { Style } from '@react-pdf/types';

export const UnNamedListRenderer: React.FC<{ data: List; isPdf: boolean; style: Style }> = ({ data, ...props }) => (
  <div key={'UnNamedListRenderer'}>
    {Object.entries(data).map(([data], i) => (
      <PDFDivText key={i} content={`${data}`} {...props} />
    ))}
  </div>
);
