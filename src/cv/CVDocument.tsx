import { Page, Document, StyleSheet, Font, Text } from '@react-pdf/renderer';
import { CVData, Education, Experience, Info, List, NestedList, Skills } from './cv.type';

Font.register({
  family: 'Montserrat',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr6Hw0aXp-p7K4KLjztg.woff2',
      fontWeight: 'ultralight',
    },
    {
      src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqyR9WXV0ppC8MLnbtrVK.woff2',
      fontStyle: 'italic',
      fontWeight: 'ultralight',
    },
    {
      family: 'Montserrat',
      src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw0aXp-p7K4KLjztg.woff2',
      fontWeight: 'normal',
    },
    {
      family: 'Montserrat',
      src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvC73w0aXp-p7K4KLjztg.woff2',
      fontWeight: 'heavy',
    },
  ],
});

const PDFDivText: React.FC<{ content: React.ReactNode; isPdf: boolean; id: string }> = ({ content, isPdf, id }) =>
  isPdf ? <Text id={id.replaceAll(' ', '_')}>{content}</Text> : <div id={id.replaceAll(' ', '_')}>{content}</div>;

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
  section: {
    display: 'flex',
    flexDirection: 'row',
  },
  primaryItem: {
    padding: 0,
    fontSize: 14,
    fontWeight: 'light',
  },
  secondaryItem: {
    marginTop: '3.5px',
    padding: 0,
    fontSize: 10.5,
    fontWeight: 'light',
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
    fontWeight: 'bold',
    textAlign: 'left',
  },
  mainItemTitleRight: {
    margin: '2px 0px',
    padding: 0,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  skillsInset: {
    margin: '3.5px 0 3.5px 12px',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  namedTitle: {
    fontWeight: 'light',
    fontSize: 12,
  },
});

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

const NamedListRenderer: React.FC<{ data: { [key: string]: string }; isPdf: boolean }> = ({ data, isPdf }) => (
  <PDFDivText
    isPdf={isPdf}
    content={Object.entries(data).map(([title, data]) => (
      <div id={title} style={styles.skillsInset}>
        <div style={styles.secondaryItem}>
          <PDFDivText isPdf={isPdf} content={`${title}`} id={title} />
        </div>
        <div style={styles.regularItem}>
          <PDFDivText isPdf={isPdf} content={`${data}`} id={'data'} />
        </div>
      </div>
    ))}
    id={'NamedListRenderer'}
  />
);

const UnNamedListRenderer: React.FC<{ data: { [key: string]: string }; isPdf: boolean }> = ({ data, isPdf }) => (
  <PDFDivText
    isPdf={isPdf}
    content={Object.entries(data).map(([title, data], i) => (
      <div id={title} style={styles.regularItem}>
        <PDFDivText isPdf={isPdf} content={`${data}`} id={`${i}`} />
      </div>
    ))}
    id={'UnNamedListRenderer'}
  />
);

const ConcatenatedUnNamedListRenderer: React.FC<{ data: { [key: string]: string }; isPdf: boolean }> = ({ data, isPdf }) => (
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
  <div id={'skills'} style={styles.block}>
    <TitleRenderer title={'Skills'} leftAlign={false} isPdf={isPdf} />
    {Object.entries(skills).map(([parentSkill, subSkills]) => (
      <div id={parentSkill}>
        <PDFDivText isPdf={isPdf} content={`${parentSkill}`} id={parentSkill} />
        {Object.entries(subSkills).map(([parentSkill, subSkills]) => (
          <div id={parentSkill} style={styles.skillsInset}>
            <PDFDivText isPdf={isPdf} content={`${parentSkill}`} id={parentSkill} />
            {isNestedList(subSkills) ? (
              Object.entries(subSkills as NestedList).map(([parentSkill, subSkills]) => (
                <div id={parentSkill} style={styles.skillsInset}>
                  <div id={'skills'} style={styles.regularItem}>
                    <PDFDivText isPdf={isPdf} content={`${parentSkill}`} id={parentSkill} />
                  </div>
                  <div id={'subSkills'} style={styles.skillsInset}>
                    <ConcatenatedUnNamedListRenderer data={subSkills} isPdf={isPdf} />
                  </div>
                </div>
              ))
            ) : (
              <div id={parentSkill} style={styles.skillsInset}>
                <UnNamedListRenderer data={subSkills as List} isPdf={isPdf} />
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
  <div id={'education'} style={styles.block}>
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
  const date = new Date();
  return (
    <Document title={`JonasWard_CV_${date.getFullYear()}-${date.getMonth()}-${date.getDay()}.pdf`}>
      <Page size='A4' style={styles.page}>
        <div id={'header'} style={styles.section}>
          <div id={'left'} style={styles.left}>
            <img src='logo.svg' />
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
      </Page>
    </Document>
  );
};

export const CVHTML: React.FC<{ data: CVData; isPdf: boolean }> = ({ data, isPdf }) => (
  <div style={{ width: '650px', left: 'max(calc((100vw - 650px) * .5), 0px)', position: 'relative', top: '50px' }}>
    <div id={'header'} style={styles.section}>
      <div id={'left'} style={styles.left}>
        <img src='logo.svg' />
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
