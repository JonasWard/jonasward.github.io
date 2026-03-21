import { CSSProperties, ReactNode } from 'react';
import { REACT_PDF_STYLES } from './style';
import { DividingSpace } from './DividingSpace';
import { TitleRenderer } from './TitleRenderer';
import { Link, Text } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { Info } from '../../types/cv/cvType';

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

export const PDFDivText: React.FC<{
  content: React.ReactNode;
  isPdf: boolean;
  href?: string;
  style?: Style;
}> = ({ content, isPdf, href, style = REACT_PDF_STYLES.regularItem }) =>
  isPdf ? (
    <Text style={style}>{contentRenderer(content, href, isPdf)}</Text>
  ) : (
    <div style={style as CSSProperties}>{contentRenderer(content, href, isPdf)}</div>
  );

export const InfoRenderer: React.FC<{ info: Info; isPdf: boolean }> = ({ info, isPdf }) => (
  <div id={'info'} style={REACT_PDF_STYLES.block}>
    <TitleRenderer title={'Info'} leftAlign={false} isPdf={isPdf} />
    <PDFDivText isPdf={isPdf} content={`${info.firstName}, ${info.name}`} />
    <PDFDivText isPdf={isPdf} content={`${info.titles}`} />
    {info.placeOfBirth && info.dateOfBirth && (
      <PDFDivText isPdf={isPdf} content={`°${info.placeOfBirth}, ${info.dateOfBirth}`} />
    )}
    <PDFDivText isPdf={isPdf} content={`${info.citizenship}`} />
    <DividingSpace id={'1'} />
    <PDFDivText isPdf={isPdf} content={`${info.addressLine1}`} />
    {/* <PDFDivText isPdf={isPdf} content={`${info.addressLine2}`} /> */}
    <PDFDivText isPdf={isPdf} content={`${info.telephone}`} />
    <PDFDivText isPdf={isPdf} content={`${info.email}`} />
    <DividingSpace id={'2'} />
    <PDFDivText isPdf={isPdf} content={info.website[1]} href={info.website[0]} />
    <PDFDivText isPdf={isPdf} content={info.github[1]} href={info.github[0]} />
    <PDFDivText isPdf={isPdf} content={info.linkedin[1]} href={info.linkedin[0]} />
  </div>
);
