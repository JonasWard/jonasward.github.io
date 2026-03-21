import { REACT_PDF_STYLES } from './style';
import { PDFDivText } from './InfoRenderer';

export const TitleRenderer: React.FC<{ title: string; leftAlign?: boolean; isPdf: boolean }> = ({
  title,
  leftAlign = true,
  isPdf
}) => (
  <>
    <PDFDivText
      style={leftAlign ? REACT_PDF_STYLES.mainItemTitle : REACT_PDF_STYLES.mainItemTitleRight}
      isPdf={isPdf}
      content={title}
    />
    <div style={{ height: '10px' }} />
    <div style={{ height: '4px', backgroundColor: '#000000' }} />
    <div style={{ height: '10px' }} />
  </>
);
