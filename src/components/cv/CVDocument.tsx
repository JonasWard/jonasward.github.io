import { Page, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
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
    margin: '3.5px 12px 3.5px 0px',
    fontSize: 9,
    fontWeight: 400,
    fontStyle: 'italic',
    textAlign: 'left',
  },
  skillsInsetRight: {
    margin: '3.5px 12px 3.5px 0px',
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
  const strokeWidth = 2;
  const ellipseHeight = 10;
  const ellipseSpacing = 70;
  const vBW = 150;
  const vBH = 15;
  const startTriangleWidth = 0.86 * ellipseHeight * 2;

  const date = new Date();
  return (
    <Document title={`JonasWard_CV_${date.getFullYear()}-${date.getMonth()}-${date.getDay()}.pdf`}>
      <Page size='A4' style={styles.page}>
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
            <Image style={{ width: 104, height: 104, borderRadius: 52 }} src={profileImage} />
            <Image style={{ width: 285, height: 60 }} src={logo} />
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
          </div>
          <div id={'svg'}>
            <div>some text</div>
            {/* <svg viewBox={`0 0 ${vBW}px ${vBH}px`}>
              <polygon
                points={`0,0 ${0.86 * ellipseHeight * 2},${ellipseHeight} ${0},${ellipseHeight * 2}`}
                fill='white'
                stroke='red'
                strokeWidth={strokeWidth}
              />
              <ellipse
                cx={startTriangleWidth + ellipseHeight}
                cy={ellipseHeight}
                rx={ellipseHeight}
                ry={ellipseHeight}
                fill='white'
                stroke='red'
                strokeWidth={strokeWidth}
              />
              <line
                x1={startTriangleWidth + ellipseHeight * 2}
                y1={ellipseHeight}
                x2={startTriangleWidth + ellipseSpacing - ellipseHeight}
                y2={ellipseHeight}
                stroke='red'
                strokeWidth={strokeWidth}
              />
              <ellipse
                cx={startTriangleWidth + ellipseSpacing}
                cy={ellipseHeight}
                rx={ellipseHeight}
                ry={ellipseHeight}
                fill='white'
                stroke='red'
                strokeWidth={strokeWidth}
              />
            </svg> */}
          </div>
        </div>
      </Page>
    </Document>
  );
};
