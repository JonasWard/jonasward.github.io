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

const contentStyle = {
  fontSize: 13
};

type ContentBlock = { type: 'paragraph'; text: string } | { type: 'list'; items: string[] };

const isBulletLine = (line: string) => line.trimStart().startsWith('-');

const parseMotivationContent = (content: string): ContentBlock[] => {
  const lines = content.split('\n');
  const blocks: ContentBlock[] = [];

  for (let i = 0; i < lines.length; ) {
    if (isBulletLine(lines[i])) {
      const items: string[] = [];
      while (i < lines.length && isBulletLine(lines[i])) {
        items.push(lines[i].trimStart().replace(/^-\s*/, ''));
        i++;
      }
      blocks.push({ type: 'list', items });
    } else {
      blocks.push({ type: 'paragraph', text: lines[i] });
      i++;
    }
  }

  return blocks;
};

const MotivationContentBlocks: React.FC<{ content: string }> = ({ content }) => (
  <>
    {parseMotivationContent(content).map((block, i) =>
      block.type === 'list' ? (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {block.items.map((item, j) => (
            <div key={j} style={{ display: 'flex', flexDirection: 'row', gap: 6 }}>
              <PDFDivText isPdf content="•" style={contentStyle} />
              <PDFDivText isPdf content={item} style={{ ...contentStyle, flexGrow: 1 }} />
            </div>
          ))}
        </div>
      ) : (
        <PDFDivText key={i} isPdf content={block.text} style={contentStyle} />
      )
    )}
  </>
);

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
        <div id={'education'} style={{ ...REACT_PDF_STYLES.block, textAlign: 'left' }}>
          <TitleRenderer title={motivationContent.title} isPdf />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <PDFDivText isPdf content={motivationContent.intro} style={REACT_PDF_STYLES.tagTitle} />
            <PDFDivText isPdf content={motivationContent.people} style={contentStyle} />
            {motivationContent.content ? <MotivationContentBlocks content={motivationContent.content} /> : null}
            <DividingSpace id={'1'} />
            <PDFDivText isPdf content={motivationContent.outro} style={contentStyle} />
            <PDFDivText isPdf content={`${motivationContent.wishes}`} style={contentStyle} />
            <PDFDivText
              isPdf
              content={`${`${CVContent.info.firstName.split(' ')[0]} ${CVContent.info.name}`}`}
              style={contentStyle}
            />
            <DividingSpace id={'2'} />
            <PDFDivText
              isPdf
              content={`${motivationContent.city}, ${new Date().getDate()} ${
                months[new Date().getMonth()]
              } ${new Date().getFullYear()}`}
              style={contentStyle}
            />
          </div>
        </div>
      </div>
    </Page>
  </Document>
);
