import { List } from '../../types/cv/cvType';
import { styles } from './CVDocument';
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
          <div key={'title'} style={styles.secondaryItem}>
            <PDFDivText href={link} isPdf={isPdf} content={`${title}`} id={'title'} />
          </div>
          <div key={'content'} style={styles.regularItem}>
            <PDFDivText isPdf={isPdf} content={`${actualContent}`} id={'data'} />
          </div>
        </div>
      );
    })}
  </div>
);
