import { styles } from './CVDocument';
import { PDFDivText } from './InfoRenderer';

export const TitleRenderer: React.FC<{ title: string; leftAlign?: boolean; isPdf: boolean }> = ({ title, leftAlign = true, isPdf }) => (
  <div id={title} style={leftAlign ? styles.mainItemTitle : styles.mainItemTitleRight}>
    <PDFDivText isPdf={isPdf} content={title} id={'title'} />
    <div id={'aboveLine'} style={{ height: '10px' }} />
    <div id={'line'} style={{ height: '4px', backgroundColor: '#000000' }} />
    <div id={'underneathLine'} style={{ height: '10px' }} />
  </div>
);
