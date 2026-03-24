import { List } from '../../types/cv/cvType';
import { REACT_PDF_STYLES } from './style';
import { PDFDivText } from './InfoRenderer';

export const NamedListRenderer: React.FC<{ data: List; isPdf: boolean; suppress?: number[] }> = ({
  data,
  isPdf,
  suppress
}) => (
  <div id={'NamedListRenderer'}>
    {Object.entries(data).map(([title, content], i) => {
      if (suppress && suppress.includes(i)) return null;

      const actualContent = Array.isArray(content) ? content[1] : content;
      const link = Array.isArray(content) ? content[0] : undefined;

      return (
        <div key={title}>
          <PDFDivText style={REACT_PDF_STYLES.secondaryItem} href={link} isPdf={isPdf} content={`${title}`} />
          <PDFDivText style={REACT_PDF_STYLES.regularItem} isPdf={isPdf} content={`${actualContent}`} />
        </div>
      );
    })}
  </div>
);
