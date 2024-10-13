import { ReactNode } from 'react';
import { Info } from './cv.type';
import { styles } from './CVDocument';
import { DividingSpace } from './DividingSpace';
import { TitleRenderer } from './TitleRenderer';
import { Link, Text } from '@react-pdf/renderer';

const contentRenderer = (content: ReactNode, href?: string, isPdf?: boolean) =>
  href ? (
    <>
      {content}
      {' - '}
      {isPdf ? (
        <Link src={href} style={{ color: 'black', fontSize: 8 }}>
          link
        </Link>
      ) : (
        <a href={href}>link</a>
      )}
    </>
  ) : (
    content
  );

export const PDFDivText: React.FC<{ content: React.ReactNode; isPdf: boolean; id: string; href?: string }> = ({ content, isPdf, id, href }) =>
  isPdf ? (
    <Text id={id.replaceAll(' ', '_')}>{contentRenderer(content, href, isPdf)}</Text>
  ) : (
    <div id={id.replaceAll(' ', '_')}>{contentRenderer(content, href, isPdf)}</div>
  );
export const InfoRenderer: React.FC<{ info: Info; isPdf: boolean }> = ({ info, isPdf }) => (
  <div id={'info'} style={styles.block}>
    <TitleRenderer title={'Info'} leftAlign={false} isPdf={isPdf} />
    <div style={styles.regularItem}>
      <PDFDivText isPdf={isPdf} id={'firstName'} content={`${info.firstName}, ${info.name}`} />
      <PDFDivText isPdf={isPdf} id={'titles'} content={`${info.titles}`} />
      <PDFDivText isPdf={isPdf} id={'placeOfBirth'} content={`°${info.placeOfBirth}, ${info.dateOfBirth}`} />
      <PDFDivText isPdf={isPdf} id={'citizenship'} content={`${info.citizenship}`} />
      <DividingSpace id={'1'} />
      <PDFDivText isPdf={isPdf} id={'addressLine1'} content={`${info.addressLine1}`} />
      <PDFDivText isPdf={isPdf} id={'addressLine2'} content={`${info.addressLine2}`} />
      <PDFDivText isPdf={isPdf} id={'telephone'} content={`${info.telephone}`} />
      <PDFDivText isPdf={isPdf} id={'email'} content={`${info.email}`} />
      <DividingSpace id={'2'} />
      <PDFDivText isPdf={isPdf} id={'website'} content={info.website[1]} href={info.website[0]} />
      <PDFDivText isPdf={isPdf} id={'github'} content={info.github[1]} href={info.github[0]} />
      <PDFDivText isPdf={isPdf} id={'linkedin'} content={info.linkedin[1]} href={info.linkedin[0]} />
    </div>
  </div>
);
