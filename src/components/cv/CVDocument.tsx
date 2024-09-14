import { Page, Document, StyleSheet, Font, Text, Image } from '@react-pdf/renderer';
import { CVData, Education, Experience, Info, List, NestedList, Skills } from './cv.type';
import logo from 'src/assets/jonasward_logo_elong.png';
import profileImage from 'src/assets/pictures/profilePicture-crop.jpg';

Font.register({
  family: 'Montserrat',
  fonts: [
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Uw-Y3tcoqK5.ttf', fontWeight: 100 },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr6Ew-Y3tcoqK5.ttf', fontWeight: 200 },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Ew-Y3tcoqK5.ttf', fontWeight: 300 },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.ttf', fontWeight: 400 },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Ew-Y3tcoqK5.ttf', fontWeight: 500 },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170w-Y3tcoqK5.ttf', fontWeight: 600 },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM70w-Y3tcoqK5.ttf', fontWeight: 700 },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr70w-Y3tcoqK5.ttf', fontWeight: 800 },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvC70w-Y3tcoqK5.ttf', fontWeight: 900 },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R8aX9-p7K5ILg.ttf', fontWeight: 100, fontStyle: 'italic' },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqyR9aX9-p7K5ILg.ttf', fontWeight: 200, fontStyle: 'italic' },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq_p9aX9-p7K5ILg.ttf', fontWeight: 300, fontStyle: 'italic' },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R9aX9-p7K5ILg.ttf', fontWeight: 400, fontStyle: 'italic' },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq5Z9aX9-p7K5ILg.ttf', fontWeight: 500, fontStyle: 'italic' },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq3p6aX9-p7K5ILg.ttf', fontWeight: 600, fontStyle: 'italic' },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq0N6aX9-p7K5ILg.ttf', fontWeight: 700, fontStyle: 'italic' },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqyR6aX9-p7K5ILg.ttf', fontWeight: 800, fontStyle: 'italic' },
    { src: 'http://fonts.gstatic.com/s/montserrat/v25/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqw16aX9-p7K5ILg.ttf', fontWeight: 900, fontStyle: 'italic' },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

// Create styles
const styles = StyleSheet.create({
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

const PDFDivText: React.FC<{ content: React.ReactNode; isPdf: boolean; id: string }> = ({ content, isPdf, id }) =>
  isPdf ? <Text id={id.replaceAll(' ', '_')}>{content}</Text> : <div id={id.replaceAll(' ', '_')}>{content}</div>;

const InfoRenderer: React.FC<{ info: Info; isPdf: boolean }> = ({ info, isPdf }) => (
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

const NamedListRenderer: React.FC<{ data: List; isPdf: boolean }> = ({ data, isPdf }) => (
  <div id={'NamedListRenderer'}>
    {Object.entries(data).map(([title, content]) => (
      <div key={title}>
        <div key={'title'} style={styles.secondaryItem}>
          <PDFDivText isPdf={isPdf} content={`${title}`} id={'title'} />
        </div>
        <div key={'content'} style={styles.regularItem}>
          <PDFDivText isPdf={isPdf} content={`${content}`} id={'data'} />
        </div>
      </div>
    ))}
  </div>
);

const UnNamedListRenderer: React.FC<{ data: List; isPdf: boolean; style: React.CSSProperties }> = ({ data, isPdf, style }) => (
  <div key={'UnNamedListRenderer'}>
    {Object.entries(data).map(([title, data], i) => (
      <div id={title} style={style}>
        <PDFDivText isPdf={isPdf} content={`${data}`} id={`${i}`} />
      </div>
    ))}
  </div>
);

const ConcatenatedUnNamedListRenderer: React.FC<{ data: List; isPdf: boolean }> = ({ data, isPdf }) => (
  <PDFDivText
    isPdf={isPdf}
    content={Object.values(data)
      .map((value) => value)
      .join(', ')}
    id={'ConcatenatedUnNamedListRenderer'}
  />
);

const isList = (data: List | string): boolean => typeof data !== 'string';
const isNestedList = (data: List | NestedList): boolean => (Object.values(data).length > 0 ? isList(Object.values(data)[0]) : true);

const TitleRenderer: React.FC<{ title: string; leftAlign?: boolean; isPdf: boolean }> = ({ title, leftAlign = true, isPdf }) => (
  <div id={title} style={leftAlign ? styles.mainItemTitle : styles.mainItemTitleRight}>
    <PDFDivText isPdf={isPdf} content={title} id={'title'} />
    <div id={'aboveLine'} style={{ height: '10px' }} />
    <div id={'line'} style={{ height: '4px', backgroundColor: '#000000' }} />
    <div id={'underneathLine'} style={{ height: '10px' }} />
  </div>
);

const SimpleDividingLine = () => (
  <>
    <div id={'aboveLine'} style={{ height: '7px' }} />
    <div id={'line'} style={{ height: '1px', backgroundColor: '#000000' }} />
    <div id={'underneathLine'} style={{ height: '7px' }} />
  </>
);

const DividingSpace: React.FC<{ id?: string }> = ({ id }) => <div id={id ?? 'divider'} style={{ height: '3px' }} />;

const SkillsRenderer: React.FC<{ skills: Skills; isPdf: boolean }> = ({ skills, isPdf }) => (
  <div id={'skills'} style={styles.blockRight}>
    <TitleRenderer title={'Skills'} leftAlign={false} isPdf={isPdf} />
    {Object.entries(skills).map(([parentSkill, subSkills]) => (
      <div id={parentSkill}>
        <PDFDivText isPdf={isPdf} content={`${parentSkill}`} id={parentSkill} />
        {Object.entries(subSkills).map(([parentSkill, subSkills]) => (
          <div id={parentSkill} style={{ ...styles.skillsInsetRight, ...styles.skillSubTitle }}>
            <PDFDivText isPdf={isPdf} content={`${parentSkill}`} id={parentSkill} />
            {isNestedList(subSkills) ? (
              Object.entries(subSkills as NestedList).map(([parentSkill, subSkills]) => (
                <div id={'skills'} style={styles.skillsInsetRight}>
                  <PDFDivText isPdf={isPdf} content={`${parentSkill}`} id={parentSkill} />
                  <div id={'subSkills'} style={styles.skillsInsetRight}>
                    <ConcatenatedUnNamedListRenderer data={subSkills} isPdf={isPdf} />
                  </div>
                </div>
              ))
            ) : (
              <div id={parentSkill} style={styles.skillsInsetRight}>
                <UnNamedListRenderer data={subSkills as List} isPdf={isPdf} style={styles.skillsInsetRight} />
              </div>
            )}
          </div>
        ))}
        <SimpleDividingLine />
      </div>
    ))}
  </div>
);

const EducationRenderer: React.FC<{ education: Education; isPdf: boolean }> = ({ education, isPdf }) => (
  <div id={'education'} style={styles.blockRight}>
    <TitleRenderer title={'Education'} isPdf={isPdf} />
    {Object.entries(education).map(([title, data]) => (
      <div id={title}>
        <div id={'name'} style={styles.section}>
          <div id={'1'} style={styles.primaryItem}>
            <PDFDivText isPdf={isPdf} content={`${data.name} `} id={data.name} />
          </div>
          <div id={'2'} style={styles.secondaryItem}>
            <PDFDivText isPdf={isPdf} content={`- ${data.place}`} id={data.name} />
          </div>
        </div>
        <div style={styles.regularItem}>
          <PDFDivText isPdf={isPdf} content={`${data.date} - ${data.description}`} id={data.name} />
        </div>
        <DividingSpace />
      </div>
    ))}
  </div>
);

const ExperienceRenderer: React.FC<{ experience: Experience; isPdf: boolean }> = ({ experience, isPdf }) => (
  <div id={'experience'} style={styles.block}>
    <TitleRenderer title={'Experience'} isPdf={isPdf} />
    {Object.entries(experience)
      .reverse()
      .map(([title, data]) => (
        <div id={title}>
          <div id={'name'} style={styles.section}>
            <div id={'1'} style={styles.primaryItem}>
              <PDFDivText isPdf={isPdf} content={`${data.company} `} id={data.company} />
            </div>
            <div id={'2'} style={styles.secondaryItem}>
              <PDFDivText isPdf={isPdf} content={` - ${data.location} - ${data.date}`} id={data.location} />
            </div>
          </div>
          <div id={'regularItem'} style={styles.regularItem}>
            <PDFDivText isPdf={isPdf} content={`${data.position} - ${data.role}`} id={data.position} />
          </div>
          <NamedListRenderer data={data.projects} isPdf={isPdf} />
          <SimpleDividingLine />
        </div>
      ))}
  </div>
);

// Create Document Component
export const CVDocument: React.FC<{ data: CVData; isPdf: boolean }> = ({ data, isPdf }) => {
  const strokeWidth = 2;
  const ellipseHeight = 10;
  const ellipseSpacing = 70;
  const vBW = 150;
  const vBH = 15;
  const startTriangleWidth = 0.86 * ellipseHeight * 2;

  console.log('I am not hot reloading am I?');

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
            <InfoRenderer info={data.info} isPdf={isPdf} />
          </div>
          <div id={'right'} style={styles.right}>
            <EducationRenderer education={data.education} isPdf={isPdf} />
          </div>
        </div>
        <div id={'section 2'} style={styles.section}>
          <div id={'left'} style={styles.left}>
            <SkillsRenderer skills={data.skills} isPdf={isPdf} />
          </div>
          <div id={'right'} style={styles.right}>
            <ExperienceRenderer experience={data.experience} isPdf={isPdf} />
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

export const CVHTML: React.FC<{ data: CVData; isPdf: boolean }> = ({ data, isPdf }) => (
  <div style={{ width: '650px', left: 'max(calc((100vw - 650px) * .5), 0px)', position: 'relative', top: '50px' }}>
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
        <img style={{ width: 120, height: 120, borderRadius: 60 }} src={profileImage} />
        <img style={{ width: 366, height: 77 }} src={logo} />
      </div>
    </div>
    <div id={'section 1'} style={styles.section}>
      <div id={'left'} style={styles.left}>
        <InfoRenderer info={data.info} isPdf={isPdf} />
      </div>
      <div id={'right'} style={styles.right}>
        <EducationRenderer education={data.education} isPdf={isPdf} />
      </div>
    </div>
    <div id={'section 2'} style={styles.section}>
      <div id={'left'} style={styles.left}>
        <SkillsRenderer skills={data.skills} isPdf={isPdf} />
      </div>
      <div id={'right'} style={styles.right}>
        <ExperienceRenderer experience={data.experience} isPdf={isPdf} />
      </div>
    </div>
  </div>
);
