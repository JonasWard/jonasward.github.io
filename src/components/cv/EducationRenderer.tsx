import { Education } from '../../types/cv/cvType';
import { styles } from './CVDocument';
import { PDFDivText } from './InfoRenderer';
import { TitleRenderer } from './TitleRenderer';
import { DividingSpace } from './DividingSpace';

export const EducationRenderer: React.FC<{ education: Education; isPdf: boolean }> = ({ education, isPdf }) => (
  <div id={'education'} style={styles.blockRight}>
    <TitleRenderer title={'Education'} isPdf={isPdf} />
    {Object.entries(education).map(([title, data]) => (
      <div id={title}>
        <div id={'name'} style={styles.section}>
          <div id={'1'} style={styles.primaryItem}>
            <PDFDivText isPdf={isPdf} content={`${data.name} `} id={data.name} />
          </div>
          <div id={'2'} style={styles.secondaryItem}>
            <PDFDivText isPdf={isPdf} content={`- ${data.place}`} id={data.name} />
          </div>
        </div>
        <div style={styles.regularItem}>
          <PDFDivText isPdf={isPdf} content={`${data.date} - ${data.description}`} id={data.name} />
        </div>
        <DividingSpace />
      </div>
    ))}
  </div>
);
