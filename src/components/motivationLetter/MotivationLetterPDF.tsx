import { Page, Document, Image, Link } from '@react-pdf/renderer';
import { MotivationLetterContent } from 'src/types/motivationLetter/content';
import { CVContent } from '../cv/content/cvContent';
import { DividingSpace } from '../cv/DividingSpace';
import { PDFDivText } from '../cv/InfoRenderer';
import { TitleRenderer } from '../cv/TitleRenderer';
import logo from '../../assets/jonasward_logo_elong.png';
import { getFilenameString } from './motivationLetterDefaultContent';
import { REACT_PDF_STYLES } from '../cv/style';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const MotivationPDF: React.FC<{ motivationContent: MotivationLetterContent }> = ({ motivationContent }) => (
  <Document title={getFilenameString('Motivation_Letter')}>
    <Page dpi={90} size="A4" style={REACT_PDF_STYLES.page}>
      <div id={'header'} style={REACT_PDF_STYLES.section}>
        <div
          id={'left'}
          style={{
            ...REACT_PDF_STYLES.left,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'top',
            marginBottom: 30
          }}
        >
          <div id={'left'} style={REACT_PDF_STYLES.left}>
            <div style={REACT_PDF_STYLES.regularItem}>
              <PDFDivText isPdf content={`${CVContent.info.firstName.split(' ')[0]}, ${CVContent.info.name}`} />
              <DividingSpace id={'1'} />
              <PDFDivText isPdf content={`${CVContent.info.addressLine1}`} />
              <PDFDivText isPdf content={`${CVContent.info.telephone}`} />
              <PDFDivText isPdf content={`${CVContent.info.email}`} />
              <Link id={'website'} style={{ color: 'black' }} href={'https://jonasward.ch/#cv'}>
                jonasward.ch/#cv
              </Link>
            </div>
          </div>
          <Image style={{ marginTop: -4, width: 285, height: 60 }} src={logo} />
        </div>
      </div>
      <div id={'right'} style={{ ...REACT_PDF_STYLES.left, width: '100%', paddingLeft: 0, fontSize: 15 }}>
        <div id={'education'} style={{ ...REACT_PDF_STYLES.block, textAlign: 'left', gap: 10 }}>
          <TitleRenderer title={motivationContent.title} isPdf />
          <PDFDivText isPdf content={motivationContent.intro} />
          <PDFDivText isPdf content={motivationContent.people} />
          {motivationContent.content?.split('\n').map((line, i) => (
            <PDFDivText isPdf content={line} />
          ))}
          <DividingSpace id={'1'} />
          <PDFDivText isPdf content={motivationContent.outro} />
          <PDFDivText isPdf content={`${motivationContent.wishes}`} />
          <PDFDivText isPdf content={`${`${CVContent.info.firstName.split(' ')[0]} ${CVContent.info.name}`}`} />
          <DividingSpace id={'2'} />
          <PDFDivText
            isPdf
            content={`${motivationContent.city}, ${new Date().getDate()} ${
              months[new Date().getMonth()]
            } ${new Date().getFullYear()}`}
          />
        </div>
      </div>
    </Page>
  </Document>
);
