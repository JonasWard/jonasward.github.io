import { ListContent } from 'src/types/cv/cvType';
import { PDFDivText } from './InfoRenderer';
import type { Style } from '@react-pdf/types';

export const ListContentComponent: React.FC<{ content: ListContent; isPdf: boolean; style?: Style }> = ({
  content,
  ...props
}) => (
  <PDFDivText
    content={Array.isArray(content) ? content.join(', ') : content}
    key={'ConcatenatedUnNamedListRenderer'}
    {...props}
  />
);
