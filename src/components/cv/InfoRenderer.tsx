import { Info } from './cv.type';
import { styles } from './CVDocument';
import { DividingSpace } from './DividingSpace';
import { TitleRenderer } from './TitleRenderer';
import { Text } from '@react-pdf/renderer';

export const PDFDivText: React.FC<{ content: React.ReactNode; isPdf: boolean; id: string }> = ({ content, isPdf, id }) =>
  isPdf ? <Text id={id.replaceAll(' ', '_')}>{content}</Text> : <div id={id.replaceAll(' ', '_')}>{content}</div>;
export const InfoRenderer: React.FC<{ info: Info; isPdf: boolean }> = ({ info, isPdf }) => (
  <div id={'info'} style={styles.block}>
    <TitleRenderer title={'Info'} leftAlign={false} isPdf={isPdf} />
    <div style={styles.regularItem}>
      <PDFDivText isPdf={isPdf} id={'firstName'} content={`${info.firstName}, ${info.name}`} />
      <PDFDivText isPdf={isPdf} id={'placeOfBirth'} content={`°${info.placeOfBirth}, ${info.dateOfBirth}`} />
      <DividingSpace id={'1'} />
      <PDFDivText isPdf={isPdf} id={'addressLine1'} content={`${info.addressLine1}`} />
      <PDFDivText isPdf={isPdf} id={'addressLine2'} content={`${info.addressLine2}`} />
      <PDFDivText isPdf={isPdf} id={'telephone'} content={`${info.telephone}`} />
      <PDFDivText isPdf={isPdf} id={'email'} content={`${info.email}`} />
      <DividingSpace id={'2'} />
      <PDFDivText isPdf={isPdf} id={'website'} content={`${info.website}`} />
      <PDFDivText isPdf={isPdf} id={'github'} content={`${info.github}`} />
      <PDFDivText isPdf={isPdf} id={'linkedin'} content={`${info.linkedin}`} />
    </div>
  </div>
);
