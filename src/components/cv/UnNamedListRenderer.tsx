import { List } from '../../types/cv/cvType';
import { PDFDivText } from './InfoRenderer';

export const UnNamedListRenderer: React.FC<{ data: List; isPdf: boolean; style: React.CSSProperties }> = ({
  data,
  isPdf,
  style
}) => (
  <div key={'UnNamedListRenderer'}>
    {Object.entries(data).map(([title, data], i) => (
      <div id={title} style={style}>
        <PDFDivText isPdf={isPdf} content={`${data}`} id={`${i}`} />
      </div>
    ))}
  </div>
);
