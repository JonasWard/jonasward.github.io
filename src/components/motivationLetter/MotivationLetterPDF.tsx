import { Page, Document, Image, Link } from '@react-pdf/renderer';
import { MotivationLetterContent } from 'src/types/motivationLetter/content';
import { CVContent } from '../cv/content/cvContent';
import { styles } from '../cv/CVDocument';
import { DividingSpace } from '../cv/DividingSpace';
import { PDFDivText } from '../cv/InfoRenderer';
import { TitleRenderer } from '../cv/TitleRenderer';
import logo from '../../assets/jonasward_logo_elong.png';
import { getFilenameString } from './motivationLetterDefaultContent';

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
    <Page dpi={90} size="A4" style={styles.page}>
      <div id={'header'} style={styles.section}>
        <div
          id={'left'}
          style={{
            ...styles.left,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'top',
            marginBottom: 30
          }}
        >
          <div id={'left'} style={styles.left}>
            <div style={styles.regularItem}>
              <PDFDivText
                isPdf
                id={'firstName'}
                content={`${CVContent.info.firstName.split(' ')[0]}, ${CVContent.info.name}`}
              />
              <DividingSpace id={'1'} />
              <PDFDivText isPdf id={'addressLine1'} content={`${CVContent.info.addressLine1}`} />
              <PDFDivText isPdf id={'telephone'} content={`${CVContent.info.telephone}`} />
              <PDFDivText isPdf id={'email'} content={`${CVContent.info.email}`} />
              <Link id={'website'} style={{ color: 'black' }} href={'https://jonasward.eu/#cv'}>
                jonasward.eu/#cv
              </Link>
            </div>
          </div>
          <Image style={{ marginTop: -4, width: 285, height: 60 }} src={logo} />
        </div>
      </div>
      <div id={'right'} style={{ ...styles.left, width: '100%', paddingLeft: 0, fontSize: 15 }}>
        <div id={'education'} style={{ ...styles.block, textAlign: 'justify', gap: 10 }}>
          <TitleRenderer title={motivationContent.title} isPdf />
          <PDFDivText isPdf content={motivationContent.intro} id={'title'} />
          <PDFDivText isPdf content={motivationContent.people} id={'people'} />
          {motivationContent.content?.split('\n').map((line, i) => (
            <PDFDivText isPdf content={line} id={`content${i}`} />
          ))}
          <DividingSpace id={'1'} />
          <PDFDivText isPdf content={motivationContent.outro} id={'response'} />
          <PDFDivText isPdf content={`${motivationContent.wishes}`} id={'wishes'} />
          <PDFDivText
            isPdf
            content={`${`${CVContent.info.firstName.split(' ')[0]} ${CVContent.info.name}`}`}
            id={'wishes'}
          />
          <DividingSpace id={'2'} />
          <PDFDivText
            isPdf
            content={`${motivationContent.city}, ${new Date().getDate()} ${
              months[new Date().getMonth()]
            } ${new Date().getFullYear()}`}
            id={'date'}
          />
        </div>
      </div>
    </Page>
  </Document>
);
