import { List } from '../../types/cv/cvType';
import { PDFDivText } from './InfoRenderer';

export const ConcatenatedUnNamedListRenderer: React.FC<{ data: List; isPdf: boolean }> = ({ data, isPdf }) => (
  <PDFDivText
    isPdf={isPdf}
    content={Object.values(data)
      .map((value) => value)
      .join(', ')}
    id={'ConcatenatedUnNamedListRenderer'}
  />
);
