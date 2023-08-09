import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
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

Font.registerHyphenationCallback((word) => [word]);

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: '40px',
    fontFamily: 'Montserrat',
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
    flexDirection: 'column',
    width: '100%',
  },
  section: {
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

const InfoRenderer: React.FC<{ info: Info }> = ({ info }) => (
  <View id={'info'} style={styles.block}>
    <TitleRenderer title={'Info'} leftAlign={false} />
    <View style={styles.regularItem}>
      <Text id={'firstName'}>{`${info.firstName}, ${info.name}`}</Text>
      <Text id={'placeOfBirth'}>{`°${info.placeOfBirth}, ${info.dateOfBirth}`}</Text>
      <DividingSpace />
      <Text id={'addressLine1'}>{`${info.addressLine1}`}</Text>
      <Text id={'addressLine2'}>{`${info.addressLine2}`}</Text>
      <Text id={'telephone'}>{`${info.telephone}`}</Text>
      <Text id={'email'}>{`${info.email}`}</Text>
      <DividingSpace />
      <Text id={'website'}>{`${info.website}`}</Text>
      <Text id={'github'}>{`${info.github}`}</Text>
      <Text id={'linkedin'}>{`${info.linkedin}`}</Text>
    </View>
  </View>
);

const NamedListRenderer: React.FC<{ data: { [key: string]: string } }> = ({ data }) => (
  <View>
    {Object.entries(data).map(([title, data]) => (
      <View id={title} style={styles.skillsInset}>
        <Text style={styles.secondaryItem}>{`${title}`}</Text>
        <Text style={styles.regularItem}>{`${data}`}</Text>
      </View>
    ))}
  </View>
);

const UnNamedListRenderer: React.FC<{ data: { [key: string]: string } }> = ({ data }) => (
  <View>
    {Object.entries(data).map(([title, data]) => (
      <View id={title} style={styles.regularItem}>
        <Text>{`${data}`}</Text>
      </View>
    ))}
  </View>
);

const ConcatenatedUnNamedListRenderer: React.FC<{ data: { [key: string]: string } }> = ({ data }) => (
  <View>
    <Text>
      {Object.values(data)
        .map((value) => value)
        .join(', ')}
    </Text>
  </View>
);

const isList = (data: List | string): boolean => typeof data !== 'string';
const isNestedList = (data: List | NestedList): boolean => (Object.values(data).length > 0 ? isList(Object.values(data)[0]) : true);

const TitleRenderer: React.FC<{ title: string; leftAlign?: boolean }> = ({ title, leftAlign = true }) => (
  <View id={title} style={leftAlign ? styles.mainItemTitle : styles.mainItemTitleRight}>
    <Text>{title}</Text>
    <div style={{ borderBottom: '2px', height: '4px' }} />
    <div style={{ height: '10px' }} />
  </View>
);

const SimpleDividingLine = () => (
  <>
    <div style={{ borderBottom: '1px', height: '7px' }} />
    <div style={{ height: '7px' }} />
  </>
);

const DividingSpace = () => <div style={{ height: '3px' }} />;

const SkillsRenderer: React.FC<{ skills: Skills }> = ({ skills }) => (
  <View id={'skills'} style={styles.block}>
    <TitleRenderer title={'Skills'} leftAlign={false} />
    {Object.entries(skills).map(([parentSkill, subSkills]) => (
      <View id={parentSkill}>
        <Text>{`${parentSkill}`}</Text>
        {Object.entries(subSkills).map(([parentSkill, subSkills]) => (
          <View id={parentSkill} style={styles.skillsInset}>
            <Text style={styles.secondaryItem}>{`${parentSkill}`}</Text>
            {isNestedList(subSkills) ? (
              Object.entries(subSkills as NestedList).map(([parentSkill, subSkills]) => (
                <View id={parentSkill} style={styles.skillsInset}>
                  <Text style={styles.regularItem}>{`${parentSkill}`}</Text>
                  <View style={styles.skillsInset}>
                    <ConcatenatedUnNamedListRenderer data={subSkills as List} />
                  </View>
                </View>
              ))
            ) : (
              <View id={parentSkill} style={styles.skillsInset}>
                <UnNamedListRenderer data={subSkills as List} />
              </View>
            )}
          </View>
        ))}
        <SimpleDividingLine />
      </View>
    ))}
  </View>
);

const EducationRenderer: React.FC<{ education: Education }> = ({ education }) => (
  <View id={'education'} style={styles.block}>
    <TitleRenderer title={'Education'} />
    {Object.entries(education).map(([title, data]) => (
      <View id={title}>
        <View id={'name'} style={styles.section}>
          <Text style={styles.primaryItem}>{`${data.name} `}</Text>
          <Text style={styles.secondaryItem}>{`- ${data.place}`}</Text>
        </View>
        <Text style={styles.regularItem}>{`${data.date} - ${data.description}`}</Text>
        <DividingSpace />
      </View>
    ))}
  </View>
);

const ExperienceRenderer: React.FC<{ experience: Experience }> = ({ experience }) => (
  <View id={'experience'} style={styles.block}>
    <TitleRenderer title={'Experience'} />
    {Object.entries(experience)
      .reverse()
      .map(([title, data]) => (
        <View id={title}>
          <View id={'name'} style={styles.section}>
            <Text style={styles.primaryItem}>{`${data.company} `}</Text>
            <Text style={styles.secondaryItem}>{` - ${data.location} - ${data.date}`}</Text>
          </View>
          <Text style={styles.regularItem}>{`${data.position} - ${data.role}`}</Text>
          <NamedListRenderer data={data.projects} />
          <SimpleDividingLine />
        </View>
      ))}
  </View>
);

// Create Document Component
export const CVDocument: React.FC<{ data: CVData }> = ({ data }) => {
  const date = new Date();
  return (
    <Document title={`JonasWard_CV_${date.getFullYear()}-${date.getMonth()}-${date.getDay()}.pdf`}>
      <Page size='A4' style={styles.page}>
        <View id={'section 1'} style={styles.section}>
          <View id={'left'} style={styles.left}>
            <InfoRenderer info={data.info} />
          </View>
          <View id={'right'} style={styles.right}>
            <EducationRenderer education={data.education} />
          </View>
        </View>
        <View id={'section 2'} style={styles.section}>
          <View id={'left'} style={styles.left}>
            <SkillsRenderer skills={data.skills} />
          </View>
          <View id={'right'} style={styles.right}>
            <ExperienceRenderer experience={data.experience} />
          </View>
        </View>
      </Page>
    </Document>
  );
};
