import { Page, Document, Font, Image, Text, View } from '@react-pdf/renderer';
import { CVData } from '../../types/cv/cvType';
import logo from 'src/assets/jonasward_logo_elong.png';
import profileImage from 'src/assets/pictures/profilePicture-crop.jpg';
import extraLight from 'src/assets/fonts/Montserrat-ExtraLight.ttf';
import regular from 'src/assets/fonts/Montserrat-Regular.ttf';
import extraBold from 'src/assets/fonts/Montserrat-ExtraBold.ttf';
import italic from 'src/assets/fonts/Montserrat-Italic.ttf';
import semiBold from 'src/assets/fonts/Montserrat-SemiBold.ttf';
import { ExperienceRenderer } from './ExperienceRenderer';
import { EducationRenderer } from './EducationRenderer';
import { SkillsRenderer } from './SkillsRenderer';
import { InfoRenderer, PDFDivText } from './InfoRenderer';
import { ExtraCurricularRenderer } from './ExtraCurricularRenderer';
import qrCode from 'src/assets/jonasward-cv-qr.png';
import { REACT_PDF_STYLES } from './style';

Font.register({
  family: 'Montserrat',
  fonts: [
    { src: extraLight, fontWeight: 200 },
    { src: regular, fontWeight: 400 },
    { src: semiBold, fontWeight: 600 },
    { src: extraBold, fontWeight: 800 },
    { src: italic, fontWeight: 400, fontStyle: 'italic' }
  ]
});

Font.registerHyphenationCallback((word) => [word]);

const getTitle = () => {
  const date = new Date();
  return `Van_den_Bulcke_Jonas-CV-${date.getFullYear()}-${date.getUTCMonth()}-${date.getDate()}.pdf`;
};

const getCreatedOnContent = () => {
  const date = new Date();
  return `Created on ${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}. `;
};

// Create Document Component
export const CVDocument: React.FC<{ data: CVData; customTitle?: string }> = ({ data, customTitle }) => (
  <Document title={getTitle()}>
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
            marginBottom: -30
          }}
        >
          <Image style={{ width: 114, height: 114, borderRadius: 57 }} src={profileImage} />
          <Image style={{ width: 388, height: 80 }} src={logo} />
        </div>
      </div>
      <div id={'section 1'} style={REACT_PDF_STYLES.section}>
        <div id={'left'} style={REACT_PDF_STYLES.left} />
        <div id={'right'} style={REACT_PDF_STYLES.right}>
          <div style={REACT_PDF_STYLES.primaryItem}>
            <PDFDivText style={REACT_PDF_STYLES.tagTitle} isPdf content={customTitle ?? data.tagline[0]} />
            {data.tagline.slice(1).map((tagline, i) => (
              <PDFDivText isPdf content={tagline} key={i} />
            ))}
          </div>
        </div>
      </div>
      <div id={'section 1'} style={REACT_PDF_STYLES.section}>
        <div id={'left'} style={REACT_PDF_STYLES.left}>
          <InfoRenderer info={data.info} isPdf />
        </div>
        <div id={'right'} style={REACT_PDF_STYLES.right}>
          <EducationRenderer education={data.education} isPdf />
        </div>
      </div>
      <div id={'section 2'} style={REACT_PDF_STYLES.section}>
        <div id={'left'} style={REACT_PDF_STYLES.left}>
          <SkillsRenderer skills={data.skills} isPdf />
        </div>
        <div id={'right'} style={REACT_PDF_STYLES.right}>
          <ExperienceRenderer experiences={data.experience} isPdf />
          <div style={{ height: '20px', width: '100%' }} />
          <ExtraCurricularRenderer data={data.extraCurricular} isPdf />
        </div>
      </div>
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          right: 0,
          left: 0,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 10,
          gap: 10
        }}
      >
        <Text
          style={{ textAlign: 'center', fontSize: 10 }}
          render={({ pageNumber, totalPages }) =>
            pageNumber === totalPages && (
              <>
                {getCreatedOnContent()}
                <a style={{ textDecoration: 'underline' }} href="https://jonasward.ch/#cv">
                  jonasward.ch/#cv
                </a>
              </>
            )
          }
        />
        <Image src={qrCode} style={{ width: 30, height: 30 }} />
      </View>
    </Page>
  </Document>
);
