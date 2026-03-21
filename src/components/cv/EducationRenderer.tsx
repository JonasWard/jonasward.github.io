import { Education } from '../../types/cv/cvType';
import { REACT_PDF_STYLES } from './style';
import { PDFDivText } from './InfoRenderer';
import { TitleRenderer } from './TitleRenderer';
import { DividingSpace } from './DividingSpace';

export const EducationRenderer: React.FC<{ education: Education; isPdf: boolean }> = ({ education, isPdf }) => (
  <div id={'education'} style={REACT_PDF_STYLES.blockLeft}>
    <TitleRenderer title={'Education'} isPdf={isPdf} />
    {Object.entries(education).map(([title, data]) => (
      <div id={title}>
        <div id={'name'} style={{ ...REACT_PDF_STYLES.section, textAlign: 'left' }}>
          <PDFDivText style={REACT_PDF_STYLES.primaryItem} isPdf={isPdf} content={`${data.name} `} />
          <PDFDivText style={REACT_PDF_STYLES.secondaryItem} isPdf={isPdf} content={`- ${data.place}`} />
        </div>
        <div style={REACT_PDF_STYLES.regularItem}>
          <PDFDivText isPdf={isPdf} content={`${data.date} - ${data.description}`} />
        </div>
        <DividingSpace />
      </div>
    ))}
  </div>
);
