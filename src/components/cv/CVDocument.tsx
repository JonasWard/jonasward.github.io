import { Page, Document, StyleSheet, Font, Image, Text } from '@react-pdf/renderer';
import { CVData, List, NestedList } from './cv.type';
import logo from 'src/assets/jonasward_logo_elong.png';
import profileImage from 'src/assets/pictures/profilePicture-crop.jpg';
import extraLight from 'src/assets/fonts/Montserrat-ExtraLight.ttf';
import regular from 'src/assets/fonts/Montserrat-Regular.ttf';
import extraBold from 'src/assets/fonts/Montserrat-ExtraBold.ttf';
import italic from 'src/assets/fonts/Montserrat-Italic.ttf';
import { ExperienceRenderer } from './ExperienceRenderer';
import { EducationRenderer } from './EducationRenderer';
import { SkillsRenderer } from './SkillsRenderer';
import { InfoRenderer } from './InfoRenderer';
import { ExtraCurricularRenderer } from './ExtraCurricularRenderer';

Font.register({
  family: 'Montserrat',
  fonts: [
    { src: extraLight, fontWeight: 200 },
    { src: regular, fontWeight: 400 },
    { src: extraBold, fontWeight: 800 },
    { src: italic, fontWeight: 400, fontStyle: 'italic' },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

// Create styles
export const styles = StyleSheet.create({
  page: {
    padding: '40px',
    fontFamily: 'Montserrat',
    display: 'flex',
    flexDirection: 'column',
  },
  left: {
    width: '40%',
    paddingRight: '10px',
  },
  right: {
    width: '60%',
    paddingLeft: '10px',
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  blockRight: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    textAlign: 'right',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
  },
  primaryItem: {
    padding: 0,
    fontSize: 14,
    fontWeight: 200,
  },
  primaryItemRight: {
    padding: 0,
    fontSize: 12,
    fontWeight: 200,
    textAlign: 'right',
  },
  secondaryItem: {
    marginTop: '3.5px',
    padding: 0,
    fontSize: 9.5,
    fontWeight: 200,
  },
  regularItem: {
    margin: 0,
    padding: 0,
    fontSize: 9,
    textAlign: 'justify',
  },
  mainItemTitle: {
    margin: '2px 0px',
    padding: 0,
    fontSize: 30,
    fontWeight: 800,
    textAlign: 'left',
  },
  mainItemTitleRight: {
    margin: '2px 0px',
    padding: 0,
    fontSize: 30,
    fontWeight: 800,
    textAlign: 'right',
  },
  skillSubTitle: {
    fontSize: 10.5,
    fontWeight: 400,
    fontStyle: 'normal',
    textAlign: 'right',
  },
  skillsInset: {
    padding: '3.5px 8px 3.5px 0px',
    fontSize: 9,
    fontWeight: 400,
    fontStyle: 'italic',
    textAlign: 'left',
  },
  skillsInsetRight: {
    padding: '3.5px 8px 3.5px 0px',
    fontSize: 9,
    fontWeight: 400,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  namedTitle: {
    fontWeight: 200,
    fontSize: 12,
  },
});

const isList = (data: List | string): boolean => typeof data !== 'string';
export const isNestedList = (data: List | NestedList): boolean => (Object.values(data).length > 0 ? isList(Object.values(data)[0]) : true);

// Create Document Component
export const CVDocument: React.FC<{ data: CVData }> = ({ data }) => {
  const date = new Date();
  return (
    <Document title={`JonasWard_CV_${date.getFullYear()}-${date.getMonth()}-${date.getDay()}.pdf`}>
      <Page dpi={90} size='A4' style={styles.page}>
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
              marginBottom: -30,
            }}
          >
            <Image style={{ width: 114, height: 114, borderRadius: 57 }} src={profileImage} />
            <Image style={{ width: 375, height: 79 }} src={logo} />
          </div>
        </div>
        <div id={'section 1'} style={styles.section}>
          <div id={'left'} style={styles.left}>
            <InfoRenderer info={data.info} isPdf />
          </div>
          <div id={'right'} style={styles.right}>
            <EducationRenderer education={data.education} isPdf />
          </div>
        </div>
        <div id={'section 2'} style={styles.section}>
          <div id={'left'} style={styles.left}>
            <SkillsRenderer skills={data.skills} isPdf />
          </div>
          <div id={'right'} style={styles.right}>
            <ExperienceRenderer experience={data.experience} isPdf />
            <div style={{ height: '20px', width: '100%' }} />
            <ExtraCurricularRenderer data={data.extraCurricular} isPdf />
          </div>
        </div>
        <Text
          style={{ position: 'absolute', bottom: 30, right: 0, left: 0, textAlign: 'center', fontSize: 10 }}
          render={({ pageNumber, totalPages }) =>
            pageNumber === totalPages && (
              <>
                {`Created on ${date.getFullYear()}.${date.getMonth()}.${date.getDate()}. `}
                <a style={{ textDecoration: 'underline' }} href='https://jonasward.eu/#/cv'>
                  jonasward.eu/#/cv
                </a>
              </>
            )
          }
        />
      </Page>
    </Document>
  );
};
