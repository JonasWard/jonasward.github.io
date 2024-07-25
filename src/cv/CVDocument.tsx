import { Page, Document, StyleSheet, Font, Text, Svg } from '@react-pdf/renderer';
import { CVData, Education, Experience, Info, List, NestedList, Skills } from './cv.type';

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

const NamedListRenderer: React.FC<{ data: { [key: string]: string }; isPdf: boolean }> = ({ data, isPdf }) => (
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

const UnNamedListRenderer: React.FC<{ data: { [key: string]: string }; isPdf: boolean; style: React.CSSProperties }> = ({ data, isPdf, style }) => (
  <div key={'UnNamedListRenderer'}>
    {Object.entries(data).map(([title, data], i) => (
      <div id={title} style={style}>
        <PDFDivText isPdf={isPdf} content={`${data}`} id={`${i}`} />
      </div>
    ))}
  </div>
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
          <div id={'left'} style={styles.left}>
            {/* <Svg
                // xmlns='http://www.w3.org/2000/svg'
                // xmlns:xlink='http://www.w3.org/1999/xlink'
                // version='1.1'
                width='184.92655pt'
                height='47.523744pt'
                viewBox='0 0 184.92655 47.523744'
              >
                <g enable-background='new'>
                  <clipPath id='cp0'>
                    <path transform='matrix(1,0,0,-1,-40.26896,801.5676)' d='M 0 0 L 595.276 0 L 595.276 841.89 L 0 841.89 Z ' />
                  </clipPath>
                  <g clip-path='url(#cp0)'>
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 219.8506 766.9532 L 220.2446 768.1932 L 220.5046 769.5102 L 220.6306 770.9062 L 220.6406 771.2652 L 220.6426 771.4472 L 220.6426 771.6792 L 220.5926 772.7302 L 220.4716 773.6802 L 219.8286 771.9262 L 219.6056 771.3752 L 219.3666 770.8322 L 219.1106 770.3022 L 218.8406 769.7822 L 218.5556 769.2742 L 218.2546 768.7772 L 217.9386 768.2912 L 217.6076 767.8172 L 217.2606 767.3542 L 216.8996 766.9032 L 216.5226 766.4632 L 216.1306 766.0342 L 215.7246 765.6182 L 215.3056 765.2152 L 214.8746 764.8272 L 214.4326 764.4542 L 213.9786 764.0942 L 213.5126 763.7502 L 213.0356 763.4202 L 212.5456 763.1042 L 212.0456 762.8032 L 211.5326 762.5172 L 211.0076 762.2452 L 210.4716 761.9882 L 209.9256 761.7472 L 209.3716 761.5282 L 208.8096 761.3312 L 208.2416 761.1542 L 207.6656 761.0002 L 207.0826 760.8662 L 206.4926 760.7542 L 205.8946 760.6642 L 205.2906 760.5952 L 203.3986 760.4482 L 201.5896 760.4712 L 202.5416 760.2162 L 204.2786 759.9072 L 206.0536 759.7452 L 206.9536 759.7192 L 207.1556 759.7192 L 207.2646 759.7192 L 207.4806 759.7212 L 209.1616 759.8112 L 210.7396 760.0292 L 212.2156 760.3742 L 213.5886 760.8432 L 214.8446 761.4172 L 215.9816 762.0952 L 217.0016 762.8762 L 217.9006 763.7562 L 218.6746 764.7282 L 219.3246 765.7942 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 219.1755 793.7715 L 217.3085 794.6405 L 215.8235 795.2145 L 214.3035 795.6895 L 212.7655 796.0615 L 211.2585 796.3265 L 209.7875 796.4845 L 208.3495 796.5355 L 206.8705 796.4695 L 205.4735 796.2795 L 204.1565 795.9655 L 203.5825 795.7625 L 204.8805 795.7415 L 206.2475 795.5515 L 206.8365 795.4475 L 207.4175 795.3215 L 207.9925 795.1745 L 208.5615 795.0065 L 209.1235 794.8175 L 209.6785 794.6055 L 210.2275 794.3735 L 210.7675 794.1215 L 211.2965 793.8555 L 211.8135 793.5745 L 212.3185 793.2795 L 212.8125 792.9715 L 213.2935 792.6485 L 213.7645 792.3105 L 214.2225 791.9595 L 214.6685 791.5945 L 215.1035 791.2145 L 215.5265 790.8215 L 215.9375 790.4135 L 216.9255 789.3675 L 217.6465 790.7785 L 218.3475 792.1515 L 218.6485 792.7405 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 215.4649 789.9537 L 215.0689 790.3467 L 214.6609 790.7257 L 214.2419 791.0917 L 213.8119 791.4437 L 213.3699 791.7817 L 212.9169 792.1067 L 212.4529 792.4187 L 211.9769 792.7157 L 211.4889 793.0007 L 210.9899 793.2717 L 210.4789 793.5287 L 209.9579 793.7717 L 209.4319 793.9947 L 208.8999 794.1967 L 208.3619 794.3787 L 207.8169 794.5397 L 207.2659 794.6807 L 206.7089 794.8007 L 206.1459 794.9007 L 204.7489 795.0577 L 202.0789 795.1267 L 201.7869 794.9867 L 200.7559 794.3467 L 199.8289 793.6067 L 199.0059 792.7697 L 198.2859 791.8427 L 197.6689 790.8247 L 197.1569 789.7177 L 196.7599 788.5307 L 196.4919 787.2697 L 196.3509 785.9357 L 196.3379 784.5447 L 196.4459 783.2527 L 196.6759 782.0987 L 197.0249 781.0797 L 197.4819 780.1817 L 198.0179 779.3707 L 198.6279 778.6467 L 198.6599 778.6167 L 198.6599 779.8517 L 198.6599 781.0827 L 198.6599 782.2697 L 198.6599 783.3947 L 198.6599 784.4377 L 198.6599 784.9217 L 198.6599 785.3797 L 198.6599 785.8077 L 198.6599 786.2037 L 198.6599 786.5647 L 198.6599 786.8897 L 198.6599 787.1757 L 198.6599 787.4197 L 198.6599 787.6207 L 198.6599 787.7747 L 198.6599 787.8807 L 198.6599 788.5097 L 199.3059 788.5097 L 199.4509 788.5097 L 199.6499 788.5097 L 199.8899 788.5097 L 200.4209 788.5097 L 200.6819 788.5097 L 200.9179 788.5097 L 201.1139 788.5097 L 201.2529 788.5097 L 201.3189 788.5097 L 201.3229 788.5097 L 201.4179 788.5087 L 201.6289 788.5057 L 202.4329 788.4667 L 203.2169 788.3807 L 203.9759 788.2487 L 204.7079 788.0697 L 206.1839 787.5977 L 206.2869 787.7637 L 206.8269 788.2767 L 207.4999 788.6857 L 208.2719 788.9657 L 209.1379 789.1167 L 209.6089 789.1447 L 210.0349 789.1417 L 210.8199 789.0707 L 211.6179 788.9107 L 212.4309 788.6637 L 213.2529 788.3267 L 214.0759 787.8967 L 215.6579 786.8867 L 216.2419 788.0287 L 216.5579 788.6487 L 216.6069 788.7447 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 211.1693 779.468 L 211.0703 780.142 L 210.9323 780.793 L 210.2123 782.488 L 208.8733 782.901 L 207.7973 783.352 L 207.3163 783.608 L 206.8873 783.889 L 206.5103 784.197 L 206.1843 784.534 L 205.9343 784.918 L 205.7703 785.354 L 205.6943 785.836 L 205.6903 786.128 L 205.7233 786.496 L 205.8703 787.006 L 204.5283 787.436 L 203.8403 787.604 L 203.1243 787.728 L 202.3813 787.81 L 201.6083 787.848 L 201.4123 787.85 L 201.3223 787.85 L 201.2523 787.85 L 201.1133 787.85 L 200.9183 787.85 L 200.6823 787.85 L 200.4213 787.85 L 199.8893 787.85 L 199.6503 787.85 L 199.4503 787.85 L 199.3203 787.85 L 199.3203 787.775 L 199.3203 787.62 L 199.3203 787.42 L 199.3203 787.175 L 199.3203 786.89 L 199.3203 786.565 L 199.3203 786.203 L 199.3203 785.808 L 199.3203 785.38 L 199.3203 784.922 L 199.3203 784.437 L 199.3203 783.394 L 199.3203 782.27 L 199.3203 781.083 L 199.3203 779.852 L 199.3203 778.004 L 200.0663 777.442 L 200.8733 776.941 L 201.7363 776.505 L 203.5913 775.777 L 205.4993 775.125 L 205.9393 774.979 L 206.3313 774.843 L 207.0633 774.58 L 207.7293 774.332 L 208.3303 774.097 L 208.8713 773.86 L 209.3543 773.611 L 209.7793 773.351 L 210.0913 773.12 L 210.5103 774.075 L 210.7313 774.689 L 210.9123 775.323 L 211.0543 775.979 L 211.1573 776.655 L 211.2203 777.352 L 211.2433 778.07 L 211.2263 778.778 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 200.3055 769.524 L 199.3205 770.279 L 199.3205 769.221 L 199.3205 768.957 L 199.3205 768.736 L 199.3205 768.561 L 199.3205 768.432 L 199.3205 768.421 L 199.3905 768.421 L 199.5725 768.421 L 199.7995 768.421 L 200.3235 768.421 L 202.1515 768.421 L 201.4195 768.804 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 213.5767 764.6178 L 214.0137 764.9638 L 214.4397 765.3238 L 214.8547 765.6968 L 215.2587 766.0848 L 215.6507 766.4868 L 216.0277 766.8998 L 216.3907 767.3228 L 216.7387 767.7578 L 217.0717 768.2028 L 217.3907 768.6598 L 217.6947 769.1268 L 217.9847 769.6058 L 218.2597 770.0948 L 218.5197 770.5958 L 218.7667 771.1078 L 218.9977 771.6318 L 219.2127 772.1628 L 220.1997 774.8578 L 219.9837 775.5368 L 219.6277 776.3588 L 219.1947 777.1248 L 218.6857 777.8348 L 218.0967 778.4948 L 217.4167 779.1198 L 216.6477 779.7078 L 215.7887 780.2588 L 214.8387 780.7748 L 213.7997 781.2528 L 212.6697 781.6948 L 212.0837 781.8978 L 211.9317 781.9478 L 211.3187 782.1458 L 211.0957 782.2148 L 211.5717 780.9598 L 211.7207 780.2578 L 211.8257 779.5428 L 211.8867 778.8128 L 211.9037 778.0668 L 211.8797 777.3118 L 211.8127 776.5758 L 211.7047 775.8598 L 211.5537 775.1628 L 211.3597 774.4868 L 211.1247 773.8318 L 210.5957 772.6278 L 210.7167 772.4848 L 211.0597 771.8278 L 211.2187 771.0598 L 211.2317 770.8448 L 211.2347 770.7358 L 211.2327 770.5798 L 211.1247 769.8768 L 210.8477 769.2128 L 210.4027 768.5948 L 209.7917 768.0348 L 209.4167 767.8038 L 209.0027 767.6138 L 208.5457 767.4638 L 208.0467 767.3538 L 207.5057 767.2828 L 206.9227 767.2498 L 205.8167 767.2928 L 204.7257 767.4708 L 203.6957 767.7618 L 200.3237 767.7618 L 199.7987 767.7618 L 199.5727 767.7618 L 199.3907 767.7618 L 199.2697 767.7618 L 198.6607 767.7618 L 198.6607 768.3538 L 198.6607 768.4318 L 198.6607 768.5608 L 198.6607 768.7368 L 198.6607 768.9568 L 198.6607 770.6418 L 198.0497 769.4948 L 197.7057 768.8498 L 197.3287 768.1418 L 196.5317 766.6468 L 196.1427 765.9168 L 195.7797 765.2358 L 195.4577 764.6318 L 194.9077 763.5988 L 195.9567 762.9228 L 197.5497 762.0248 L 199.1777 761.2748 L 199.7147 761.0798 L 202.7587 761.0588 L 205.2267 761.2508 L 205.8077 761.3178 L 206.3817 761.4038 L 206.9477 761.5118 L 207.5057 761.6398 L 208.0577 761.7878 L 208.6027 761.9568 L 209.1397 762.1458 L 209.6707 762.3558 L 210.1957 762.5868 L 210.7127 762.8348 L 211.2187 763.0968 L 211.7137 763.3738 L 212.1967 763.6638 L 212.6677 763.9678 L 213.1287 764.2858 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 191.692 762.1068 L 190.661 762.1068 L 190.661 764.8098 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 190.0008 766.5405 L 178.9328 795.5585 L 169.0928 795.5585 L 169.0508 795.4475 L 170.8288 794.7995 L 171.0838 794.6925 L 171.5078 794.4955 L 171.9148 794.2855 L 172.3058 794.0625 L 172.6818 793.8265 L 173.0418 793.5775 L 173.3858 793.3145 L 173.7138 793.0395 L 174.0258 792.7505 L 174.3218 792.4485 L 174.6018 792.1365 L 174.8678 791.8145 L 175.1198 791.4825 L 175.3568 791.1415 L 175.5798 790.7905 L 175.7878 790.4305 L 175.9808 790.0605 L 176.1598 789.6805 L 176.3238 789.2905 L 176.4738 788.8925 L 176.6078 788.4875 L 176.7278 788.0765 L 176.8328 787.6595 L 176.9218 787.2375 L 176.9968 786.8095 L 177.0558 786.3755 L 177.1008 785.9365 L 177.1298 785.4905 L 177.1448 785.0405 L 177.1458 784.9075 L 177.1458 784.8045 L 177.1398 784.3935 L 177.0988 783.6095 L 177.0168 782.8555 L 176.8948 782.1325 L 176.7318 781.4405 L 176.5958 780.9965 L 176.0348 779.8145 L 178.2448 773.5235 L 170.6458 773.5235 L 171.3848 772.5625 L 171.7208 772.1245 L 172.0758 771.6635 L 172.4458 771.1825 L 172.8288 770.6825 L 173.2248 770.1685 L 174.0408 769.1065 L 174.8778 768.0175 L 175.8248 766.7845 L 180.6018 766.7845 L 182.6988 760.6945 L 192.2308 760.6945 L 191.9438 761.4475 L 190.0008 761.4475 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 159.8084 763.6689 L 159.8084 764.1169 L 159.8084 764.5819 L 159.8084 765.5529 L 159.8084 766.5619 L 159.8084 768.6079 L 159.8084 771.2169 L 155.7954 760.6949 L 159.8084 760.6949 L 159.8084 761.7829 L 159.8084 762.1039 L 159.8084 762.4559 L 159.8084 762.8359 L 159.8084 763.2409 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 165.6631 765.7325 L 165.0071 766.7475 L 164.3451 767.7735 L 163.6881 768.7895 L 163.0511 769.7745 L 162.7451 770.2495 L 162.4481 770.7075 L 162.1641 771.1485 L 161.8931 771.5675 L 161.6371 771.9635 L 161.3981 772.3325 L 160.6661 773.4655 L 160.4681 772.9475 L 160.4681 770.0825 L 160.4681 769.6025 L 160.4681 768.6075 L 160.4681 766.5625 L 160.4681 765.5535 L 160.4681 764.5815 L 160.4681 764.1165 L 160.4681 763.6685 L 160.4681 763.2415 L 160.4681 762.8355 L 160.4681 762.4565 L 160.4681 762.1035 L 160.4681 761.7825 L 160.4681 760.6945 L 165.3271 760.6945 L 166.5751 764.3205 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 167.5589 783.6997 L 167.5879 784.5717 L 167.4809 785.3977 L 167.2409 786.1277 L 166.8659 786.7647 L 166.6859 786.9577 L 165.9959 787.4377 L 163.2309 780.1897 L 164.1309 780.3017 L 164.5869 780.4007 L 165.4019 780.7077 L 166.0959 781.1187 L 166.6639 781.6267 L 167.0959 782.2257 L 167.3949 782.9157 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 176.2734 787.1128 L 176.1884 787.5118 L 176.0904 787.9048 L 175.9774 788.2918 L 175.8514 788.6728 L 175.7104 789.0478 L 175.5564 789.4118 L 175.3894 789.7678 L 175.2084 790.1138 L 175.0144 790.4498 L 174.8064 790.7778 L 174.5854 791.0958 L 174.3504 791.4058 L 174.1014 791.7068 L 173.8394 791.9978 L 173.5644 792.2778 L 173.2764 792.5448 L 172.9724 792.8008 L 172.6524 793.0448 L 172.3174 793.2768 L 171.9664 793.4978 L 171.5994 793.7068 L 171.2164 793.9038 L 170.8164 794.0898 L 169.6304 794.5868 L 168.8284 794.8648 L 166.2294 788.0518 L 166.9954 787.5938 L 167.3984 787.1608 L 167.8454 786.4008 L 168.1284 785.5438 L 168.2494 784.6028 L 168.2174 783.6208 L 168.0274 782.7158 L 167.6744 781.8978 L 167.1584 781.1838 L 166.4884 780.5848 L 165.6894 780.1118 L 164.7744 779.7668 L 163.9624 779.5908 L 162.9544 779.4648 L 160.9584 774.2308 L 161.9534 772.6898 L 162.1924 772.3208 L 162.4474 771.9248 L 162.7184 771.5058 L 163.0034 771.0648 L 163.2994 770.6058 L 163.6064 770.1318 L 164.2424 769.1468 L 164.8994 768.1298 L 165.5624 767.1038 L 166.2184 766.0898 L 166.8484 765.1138 L 167.4234 766.7848 L 174.9934 766.7848 L 174.3534 767.6168 L 173.5174 768.7048 L 172.7004 769.7678 L 172.3054 770.2818 L 171.9214 770.7808 L 171.5514 771.2628 L 171.1974 771.7238 L 170.8614 772.1608 L 169.7834 773.5608 L 169.8254 773.6528 L 174.0124 785.5708 L 175.6814 780.8218 L 176.1464 781.8338 L 176.2464 782.2628 L 176.3624 782.9458 L 176.4404 783.6628 L 176.4804 784.4158 L 176.4854 784.8028 L 176.4854 784.8558 L 176.4854 784.9208 L 176.4844 785.0258 L 176.4704 785.4588 L 176.4424 785.8808 L 176.4004 786.2978 L 176.3434 786.7078 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 151.5112 795.5587 L 142.6162 795.5587 L 142.6162 773.9497 L 130.6062 789.2127 L 140.4632 763.3697 L 142.5682 760.6947 L 151.5112 760.6947 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 125.5639 777.8848 L 123.0609 785.0108 L 119.0939 773.7198 L 125.5639 773.7198 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 116.622 760.694 L 125.564 760.694 L 125.564 766.605 L 116.622 766.605 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 117.9359 795.5587 L 116.6219 795.5587 L 116.6219 792.1137 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 129.2349 790.9552 L 125.6119 795.5592 L 118.6419 795.5592 L 116.6219 790.2612 L 116.6219 767.2642 L 125.5639 767.2642 L 125.5639 773.0612 L 118.1629 773.0612 L 123.0609 787.0022 L 125.5639 779.8762 L 125.5639 782.3052 L 139.0919 765.1122 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 109.9611 783.2755 L 109.0931 785.6555 L 107.9221 787.8585 L 106.4761 789.8545 L 104.7571 791.6415 L 102.7871 793.1815 L 100.5751 794.4585 L 98.5461 795.2955 L 95.9911 786.7525 L 97.0221 786.1535 L 98.0641 785.3465 L 98.9921 784.4045 L 99.7801 783.3475 L 100.4251 782.1775 L 100.9091 780.9065 L 101.1991 779.5565 L 101.2961 778.1275 L 101.1991 776.6985 L 100.9091 775.3475 L 100.4251 774.0765 L 99.7801 772.9055 L 98.9921 771.8495 L 98.0641 770.9075 L 97.0221 770.0995 L 95.8771 769.4345 L 94.6351 768.9125 L 93.3301 768.5605 L 91.9751 768.3845 L 90.5821 768.3845 L 90.5021 768.3955 L 88.1461 760.5155 L 85.4391 760.5155 L 87.0211 760.1035 L 89.8151 759.7615 L 92.7271 759.7615 L 95.5061 760.1035 L 98.1281 760.7865 L 100.5751 761.7955 L 102.7871 763.0725 L 104.7571 764.6125 L 106.4761 766.3995 L 107.9221 768.3955 L 109.0931 770.5985 L 109.9611 772.9785 L 110.4831 775.4885 L 110.6561 778.1275 L 110.4831 780.7665 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 97.9244 795.5209 L 95.5064 796.1509 L 92.7274 796.4929 L 89.8154 796.4929 L 87.2964 787.0779 L 87.9224 787.3409 L 89.2264 787.6929 L 90.5824 787.8689 L 91.9754 787.8689 L 93.3304 787.6929 L 94.6344 787.3409 L 95.3844 787.0259 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 88.9815 796.2959 L 87.0385 796.0579 L 84.4315 795.3789 L 82.0115 794.3739 L 79.8265 793.1039 L 77.8835 791.5719 L 77.2585 790.9169 L 81.2575 778.7709 L 81.3115 779.5689 L 81.6045 780.9339 L 82.0925 782.2169 L 82.7405 783.3979 L 83.5265 784.4649 L 84.4495 785.4159 L 85.4895 786.2319 L 86.4375 786.7859 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 72.0719 780.0182 L 71.9479 778.1272 L 72.1209 775.4882 L 72.6429 772.9782 L 73.5109 770.5982 L 74.6789 768.3952 L 76.1149 766.3992 L 77.0139 765.4572 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 76.6344 790.3992 L 76.1154 789.8552 L 74.6784 787.8592 L 73.5104 785.6552 L 72.6424 783.2752 L 72.2704 781.4862 L 78.0624 764.4202 L 79.7734 763.0722 L 81.9694 761.7952 L 83.4654 761.1742 L 87.6534 761.1742 L 89.8384 768.4812 L 89.2264 768.5612 L 87.9224 768.9132 L 86.6814 769.4342 L 85.5424 770.1002 L 84.5124 770.9082 L 83.5984 771.8502 L 82.8204 772.9062 L 82.2824 773.8872 L 82.0984 773.8032 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 65.9359 788.9937 L 65.9359 789.5177 L 65.9359 790.3777 L 65.9359 791.1937 L 65.9359 791.9607 L 65.9359 792.6717 L 65.9359 793.3217 L 65.9359 793.9047 L 65.9359 794.1687 L 65.9359 794.4137 L 65.9359 794.6387 L 65.9359 795.5587 L 64.9109 795.5587 L 64.6439 795.5587 L 64.3559 795.5587 L 63.7259 795.5587 L 63.0409 795.5587 L 62.3169 795.5587 L 60.8249 795.5587 L 60.0929 795.5587 L 59.3949 795.5587 L 58.7469 795.5587 L 58.4489 795.5587 L 58.1689 795.5587 L 57.9119 795.5587 L 56.9939 795.5587 L 56.9939 794.6757 L 56.9939 794.4537 L 56.9939 794.2127 L 56.9939 793.6747 L 56.9939 793.0657 L 56.9939 792.3927 L 56.9939 791.6607 L 56.9939 790.8767 L 56.9939 790.0457 L 56.9939 789.1747 L 56.9939 788.2687 L 56.9939 787.5287 L 60.7859 773.3517 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 65.7832 768.5964 L 65.8442 769.1774 L 65.8902 769.7804 L 65.9202 770.4064 L 65.9342 771.0554 L 65.9352 771.2204 L 65.9362 771.3034 L 65.9362 771.3564 L 65.9362 771.4004 L 65.9362 771.4704 L 65.9362 771.5644 L 65.9362 771.6824 L 65.9362 771.8244 L 65.9362 771.9894 L 65.9362 772.1764 L 65.9362 772.3834 L 65.9362 772.6124 L 65.9362 772.8604 L 65.9362 773.4124 L 65.9362 774.0344 L 65.9362 774.7194 L 65.9362 775.4634 L 65.9362 776.2594 L 65.9362 777.1014 L 65.9362 777.9834 L 65.9362 778.8984 L 65.9362 779.8424 L 65.9362 781.7914 L 65.9362 785.7634 L 65.9362 786.7374 L 65.9362 786.8824 L 60.7202 771.0424 L 56.9942 784.9734 L 56.9942 784.4154 L 56.9942 782.4344 L 56.9942 780.4804 L 56.9942 779.5284 L 56.9942 778.6014 L 56.9942 777.7044 L 56.9942 776.8434 L 56.9942 776.0254 L 56.9942 775.2554 L 56.9942 774.5404 L 56.9942 773.8844 L 56.9942 773.2954 L 56.9942 772.7784 L 56.9942 772.5484 L 56.9942 772.3394 L 56.9942 772.1504 L 56.9942 771.9834 L 56.9942 771.8394 L 56.9942 771.7174 L 56.9942 771.6204 L 56.9942 771.5484 L 56.9942 771.5004 L 56.9942 771.4224 L 56.9922 771.2894 L 56.9782 770.8664 L 56.9482 770.4664 L 56.9022 770.0904 L 56.8412 769.7384 L 56.7652 769.4094 L 56.6722 769.1044 L 56.5632 768.8234 L 56.4382 768.5654 L 56.2962 768.3304 L 56.1382 768.1204 L 55.9632 767.9354 L 55.7722 767.7744 L 55.5642 767.6384 L 55.3412 767.5284 L 55.1022 767.4434 L 54.8482 767.3834 L 54.5802 767.3504 L 54.4402 767.3424 L 54.3372 767.3404 L 54.2292 767.3434 L 56.0742 761.1744 L 60.5362 761.1744 L 61.0952 761.4884 L 61.6892 761.8734 L 62.2502 762.2944 L 62.7782 762.7504 L 63.2722 763.2414 L 63.7332 763.7674 L 64.1552 764.3204 L 64.5342 764.8974 L 64.8712 765.4984 L 65.1672 766.1254 L 65.2342 766.2844 L 65.2772 766.3934 L 65.3532 766.6014 L 65.4902 767.0464 L 65.6072 767.5274 L 65.7052 768.0434 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,-40.26896,801.5676)'
                      fill='#000000'
                      stroke='none'
                      d='M 53.5017 767.4729 L 53.4527 767.4879 L 53.2247 767.5819 L 53.0067 767.6989 L 52.7987 767.8389 L 52.6007 768.0019 L 52.4117 768.1869 L 52.2337 768.3939 L 52.0687 768.6179 L 51.9177 768.8569 L 51.7807 769.1109 L 51.1387 770.5179 L 50.0997 769.4569 L 49.6667 769.0149 L 49.2027 768.5409 L 48.7207 768.0489 L 47.7487 767.0559 L 47.2817 766.5789 L 46.8437 766.1319 L 46.4447 765.7249 L 46.2647 765.5399 L 46.0987 765.3709 L 45.5127 764.7719 L 45.9757 764.1419 L 46.3827 763.6359 L 46.8017 763.1609 L 47.2337 762.7169 L 47.6767 762.3029 L 48.1327 761.9209 L 48.6017 761.5689 L 49.0817 761.2479 L 49.5747 760.9569 L 50.0797 760.6969 L 50.5967 760.4679 L 51.1267 760.2699 L 51.6697 760.1009 L 52.2237 759.9639 L 52.7917 759.8569 L 53.3717 759.7799 L 53.9647 759.7339 L 54.5697 759.7189 L 55.3717 759.7419 L 56.1577 759.8119 L 56.9287 759.9269 L 57.6837 760.0899 L 58.4217 760.2969 L 59.0567 760.5159 L 56.1437 760.5159 L 55.5797 760.5239 Z '
                    />
                    <path
                      transform='matrix(1,0,0,-1,171.30344,13.84845)'
                      stroke-width='.311'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      fill='none'
                      stroke='#000000'
                      d='M 0 0 L -.257 .078 L -.942 .215 L -1.618 .277 L -1.959 .278 L -2.329 .257 L -3.033 .134 L -3.605 -.073 L -4.078 -.36 L -4.424 -.688 L -4.635 -1.029 L -4.664 -1.126 L -4.514 -1.21 L -3.973 -1.57 L -3.466 -1.962 L -3.344 -2.073 M -2.669 -2.728 L -2.557 -2.846 L -2.154 -3.335 L -1.787 -3.855 L -1.727 -3.954 L .061 -4.505 L .685 -4.706 L .849 -4.76 L 1.462 -4.972 L 2.644 -5.434 L 3.747 -5.941 L 4.351 -6.268 M 5.162 -6.747 L 5.698 -7.091 L 6.545 -7.737 L 7.303 -8.433 L 7.97 -9.179 L 8.549 -9.986 L 9.041 -10.855 L 9.128 -11.055 L 9.16 -10.645 L 9.185 -10.063 L 9.192 -9.475 L 9.178 -8.883 L 9.145 -8.296 L 9.091 -7.713 L 9.018 -7.134 L 8.925 -6.56 L 8.813 -5.99 L 8.68 -5.425 L 8.528 -4.864 L 8.356 -4.307 L 8.164 -3.755 L 8.015 -3.371 M 7.647 -2.506 L 7.474 -2.134 L 7.213 -1.614 L 6.937 -1.106 L 6.647 -.61 L 6.342 -.125 L 6.022 .349 L 5.974 .415 L 5.966 .399 L 5.649 -.22 L 5.379 -.749 L 5.168 -1.16 L 5.031 -1.427 L 4.5 -2.467 L 2.654 -1.291 L 1.907 -.816 L 1.175 -.433 L .887 -.315 M -4.148 -17.747 L -4.57 -18.019 L -5.151 -18.338 L -5.767 -18.625 L -6.418 -18.875 L -6.948 -19.037 L -6.624 -19.128 L -5.667 -19.284 L -4.684 -19.322 L -4.668 -19.321 M -3.73 -19.232 L -3.353 -19.148 L -3.009 -19.036 L -2.716 -18.902 L -2.492 -18.764 L -2.206 -18.502 M -1.662 -17.74 L -1.571 -17.521 L -1.496 -17.035 L -1.496 -16.978 L -1.497 -16.909 L -1.504 -16.797 L -1.615 -16.263 L -1.828 -15.856 L -1.961 -15.699 L -1.994 -15.668 L -2.18 -15.924 L -2.587 -16.406 L -3.031 -16.859 L -3.397 -17.18 M -15.765 7.818 L -16.159 7.818 L -16.999 7.818 L -17.806 7.818 L -18.193 7.818 L -18.566 7.818 L -18.924 7.818 L -19.266 7.818 L -19.59 7.818 L -19.894 7.818 L -20.177 7.818 L -20.437 7.818 L -20.672 7.818 L -20.881 7.818 L -21.062 7.818 L -21.214 7.818 L -21.335 7.818 L -21.402 7.818 L -21.402 7.806 L -21.402 7.724 L -21.402 7.62 L -21.402 7.495 L -21.402 7.348 L -21.402 7.181 L -21.402 6.994 L -21.402 6.788 L -21.402 6.562 L -21.402 6.318 L -21.402 6.056 L -21.402 5.776 L -21.402 5.479 L -21.402 5.167 L -21.402 4.838 L -21.402 4.493 L -21.402 4.134 L -21.402 3.761 L -21.402 3.374 L -21.402 2.973 L -21.402 2.134 L -21.402 1.248 L -21.402 .319 L -21.402 -.648 L -21.402 -1.65 L -21.402 -2.681 L -21.402 -3.74 L -21.402 -4.82 L -21.402 -5.448 M -21.402 -6.387 L -21.402 -8.15 L -21.402 -10.404 L -21.402 -12.645 L -21.402 -13.751 L -21.402 -14.841 L -21.402 -14.907 M -21.402 -15.846 L -21.402 -15.912 L -21.402 -16.958 L -21.402 -17.977 L -21.402 -18.483 L -18.155 -26.986 L -18.019 -26.986 L -17.223 -26.986 L -16.862 -26.986 M -15.919 -26.986 L -15.534 -26.986 L -13.878 -26.986 L -14.561 -26.672 L -16.222 -25.736 L -17.043 -25.208 L -17.252 -25.067 L -17.358 -24.993 L -18.147 -24.433 L -17.703 -23.6 L -17.594 -23.397 L -17.4 -23.033 L -17.134 -22.535 L -16.813 -21.932 L -16.45 -21.253 L -16.061 -20.524 L -15.486 -19.446 M -15.043 -18.616 L -14.887 -18.324 L -14.544 -17.68 L -14.249 -17.128 L -14.018 -16.695 L -13.866 -16.41 L -13.201 -15.162 L -12.463 -15.792 L -12.463 -15.646 L -12.463 -15.126 L -12.463 -14.024 L -12.463 -13.324 M -12.463 -12.385 L -12.463 -11.636 L -12.463 -10.986 L -13.009 -10.576 L -13.788 -9.851 L -14.485 -9.026 L -15.092 -8.108 L -15.614 -7.084 L -16.014 -5.921 L -16.27 -4.632 L -16.388 -3.227 L -16.374 -1.732 L -16.347 -1.477 M -16.248 -.543 L -16.221 -.288 L -15.927 1.09 L -15.491 2.395 L -14.926 3.614 L -14.243 4.739 L -13.443 5.768 L -12.526 6.7 L -11.494 7.522 L -11.017 7.818 L -11.124 7.818 L -11.897 7.818 L -12.715 7.818 L -13.562 7.818 L -14.427 7.818 L -14.822 7.818 M -37.117 -6.866 L -37.574 -5.569 L -38.518 -8.254 M -38.83 -9.14 L -39.774 -11.825 L -39.362 -11.627 L -38.778 -11.298 L -38.232 -10.936 L -37.724 -10.541 L -37.602 -10.43 M -36.931 -9.771 L -36.821 -9.654 L -36.426 -9.162 L -36.349 -9.05 L -36.806 -7.753 M -43.015 -26.109 L -42.901 -26.286 L -42.751 -26.517 L -42.627 -26.709 L -42.53 -26.859 L -42.493 -26.916 L -42.448 -26.986 L -42.379 -26.986 L -42.262 -26.986 L -42.108 -26.986 L -41.92 -26.986 L -41.7 -26.986 L -41.451 -26.986 L -41.173 -26.986 L -40.871 -26.986 L -40.546 -26.986 L -40.2 -26.986 L -39.835 -26.986 L -39.454 -26.986 L -38.652 -26.986 L -37.812 -26.986 L -36.951 -26.986 L -36.558 -26.986 M -35.616 -26.986 L -35.239 -26.986 L -34.423 -26.986 L -34.033 -26.986 L -33.658 -26.986 L -33.3 -26.986 L -32.962 -26.986 L -32.645 -26.986 L -32.352 -26.986 L -32.085 -26.986 L -31.847 -26.986 L -31.639 -26.986 L -31.464 -26.986 L -31.327 -26.986 L -31.339 -26.971 L -31.393 -26.9 L -31.457 -26.817 L -31.529 -26.723 L -31.61 -26.618 L -31.699 -26.502 L -31.901 -26.24 L -32.133 -25.939 L -32.392 -25.602 L -32.677 -25.233 L -32.984 -24.833 L -33.2 -24.553 M -33.773 -23.807 L -34.025 -23.481 L -34.403 -22.989 L -34.794 -22.481 L -35.132 -22.043 L -38.771 -22.043 M -39.714 -22.043 L -43.353 -22.043 L -44.15 -24.355 L -43.977 -24.623 L -43.724 -25.014 L -43.526 -25.319 M -51.302 -1.661 L -51.302 -1.454 L -51.302 -.842 L -51.302 -.296 L -51.302 .168 L -51.302 .534 L -51.302 .782 L -51.302 .979 L -51.172 .998 L -51.023 .998 L -50.808 .998 L -49.753 .998 L -49.577 .998 L -49.489 .998 L -49.484 .998 L -49.357 .998 L -49.066 .992 L -48.506 .959 L -47.478 .813 L -46.567 .558 L -46.486 .521 L -45.291 3.651 M -44.956 4.529 L -43.76 7.658 L -43.924 7.683 L -44.464 7.743 L -45.02 7.786 L -45.591 7.811 L -45.882 7.817 L -46.029 7.818 L -46.103 7.818 L -46.132 7.818 L -46.178 7.818 L -46.272 7.818 L -46.415 7.818 L -46.604 7.818 L -46.836 7.818 L -47.108 7.818 L -47.417 7.818 L -47.761 7.818 L -48.137 7.818 L -48.541 7.818 L -48.972 7.818 L -49.426 7.818 L -49.901 7.818 L -50.393 7.818 L -51.421 7.818 L -52.486 7.818 L -52.554 7.818 M -53.497 7.818 L -53.566 7.818 L -54.64 7.818 L -55.684 7.818 L -56.189 7.818 L -56.677 7.818 L -57.148 7.818 L -57.597 7.818 L -58.022 7.818 L -58.42 7.818 L -58.788 7.818 L -58.936 7.818 L -58.936 -1.94 M -58.936 -2.88 L -58.936 -19.349 M -58.936 -20.288 L -58.936 -26.986 L -58.724 -26.986 L -58.444 -26.986 L -57.841 -26.986 L -57.194 -26.986 L -56.992 -26.986 L -54.449 -20.328 M -54.114 -19.45 L -51.458 -12.497 M -51.123 -11.619 L -49.673 -7.822 L -49.724 -7.822 L -49.955 -7.822 L -50.506 -7.822 L -50.996 -7.822 L -51.15 -7.822 L -51.302 -7.822 L -51.302 -7.653 L -51.302 -7.44 L -51.302 -7.107 L -51.302 -6.669 L -51.302 -6.144 L -51.302 -5.549 L -51.302 -4.217 L -51.302 -2.806 L -51.302 -2.6 M -83.339 7.161 L -83.59 7.818 L -83.822 7.818 M -84.294 7.818 L -84.526 7.818 L -83.909 7.036 M -83.327 6.297 L -82.711 5.515 L -83.273 6.986 M -80.721 -24.39 L -79.826 -26.986 L -75.611 -26.986 M -74.668 -26.986 L -70.453 -26.986 L -77.373 -18.204 M -77.955 -17.465 L -84.875 -8.683 L -84.875 -10.113 M -84.875 -11.053 L -84.875 -12.482 L -84.278 -14.179 L -84.875 -14.179 L -84.875 -17.455 M -84.875 -18.395 L -84.875 -20.906 L -81.922 -20.906 L -81.027 -23.502 M -106.14 -25.467 L -106.72 -26.986 L -102.427 -26.986 M -101.484 -26.986 L -97.191 -26.986 L -96.077 -23.753 L -96.077 -20.083 M -96.077 -19.143 L -96.077 -11.906 M -96.077 -10.967 L -96.077 .88 L -97.78 -3.58 M -98.115 -4.458 L -99.819 -8.918 L -99.774 -9.592 L -99.958 -12.379 L -100.417 -14.581 M -100.674 -15.482 L -101.435 -17.568 L -102.679 -19.905 L -103.172 -20.584 M -103.724 -21.345 L -104.216 -22.024 L -105.225 -23.071 L -105.805 -24.589 M -132.965 -26.289 L -132.728 -26.986 L -131.788 -26.986 M -130.845 -26.986 L -129.905 -26.986 L -130.09 -26.909 L -130.848 -26.469 M -131.662 -25.996 L -132.42 -25.556 L -133.504 -24.702 L -133.267 -25.399 M -126.403 -6.834 L -128.18 -13.467 L -127.779 -14.197 L -127.091 -15.129 L -126.284 -15.96 L -125.375 -16.672 L -125.279 -16.728 M -124.465 -17.203 L -124.368 -17.26 L -123.266 -17.722 L -122.109 -18.034 L -120.918 -18.188 L -119.681 -14.06 M -119.412 -13.159 L -117.299 -6.104 M -117.03 -5.203 L -116.069 -1.995 L -116.189 -1.926 L -117.294 -1.463 L -118.451 -1.151 L -119.657 -.995 L -119.808 -.995 M -120.751 -.995 L -120.903 -.995 L -122.109 -1.151 L -123.266 -1.463 L -124.368 -1.925 L -125.222 -2.424 L -126.16 -5.927 M -147.645 -26.986 L -146.648 -26.986 L -143.845 -18.737 M -143.542 -17.847 L -140.739 -9.598 L -140.555 -6.805 L -140.001 -4.144 L -139.078 -1.618 L -138.059 .303 M -137.563 1.1 L -136.312 2.837 L -134.951 4.261 L -136.124 7.818 L -139.216 7.818 M -140.159 7.818 L -143.252 7.818 L -144.483 4.086 L -144.483 3.452 L -144.483 2.637 L -144.483 1.779 L -144.483 .883 L -144.483 -.044 L -144.483 -.996 L -144.483 -1.499 M -144.483 -2.438 L -144.483 -5.934 L -144.483 -7.879 L -144.483 -8.822 L -144.483 -9.736 L -144.483 -10.146 M -144.483 -11.086 L -144.483 -11.457 L -144.483 -12.251 L -144.483 -12.994 L -144.483 -13.678 L -144.483 -14.299 L -144.483 -14.85 L -144.483 -15.098 L -144.483 -15.326 L -144.483 -15.533 L -144.483 -15.719 L -144.483 -15.884 L -144.483 -16.025 L -144.483 -16.144 L -144.483 -16.238 L -144.483 -16.307 L -144.483 -16.457 L -144.484 -16.669 L -144.499 -17.339 L -144.531 -17.994 L -144.579 -18.628 L -144.643 -19.244 L -144.728 -19.842 L -144.836 -20.412 L -144.968 -20.953 L -145.124 -21.456 L -145.214 -21.704 L -145.267 -21.839 L -145.348 -22.031 L -145.671 -22.715 L -146.047 -23.385 L -146.47 -24.027 L -146.938 -24.641 L -147.451 -25.224 L -148.001 -25.77 L -148.587 -26.276 L -149.21 -26.742 L -149.585 -26.986 L -148.588 -26.986 M -156.413 6.007 L -156.898 7.818 L -161.1 7.818 M -162.043 7.818 L -166.246 7.818 L -164.362 1.529 M -164.093 .628 L -161.016 -9.647 M -160.746 -10.547 L -159.513 -14.664 L -159.484 -14.634 L -159.442 -14.903 L -158.285 -18.765 L -158.187 -18.861 L -158.069 -18.958 L -157.952 -19.036 L -157.834 -19.1 L -157.713 -19.15 L -157.585 -19.188 L -157.448 -19.215 L -157.288 -19.23 L -157.213 -19.232 L -157.19 -19.232 L -157.148 -19.231 L -157.068 -19.227 L -156.899 -19.206 L -156.764 -19.174 L -156.648 -19.133 L -156.545 -19.083 L -156.452 -19.021 L -156.363 -18.947 L -156.276 -18.854 L -156.189 -18.74 L -156.104 -18.6 L -156.023 -18.431 L -155.946 -18.232 L -155.876 -18.002 L -155.815 -17.742 L -155.764 -17.451 L -155.725 -17.13 L -155.699 -16.779 L -155.686 -16.393 L -155.685 -16.3 L -155.685 -16.25 L -155.685 -16.228 L -155.685 -16.207 L -155.685 -16.16 L -155.685 -16.088 L -155.685 -15.99 L -155.685 -15.869 L -155.685 -15.725 L -155.685 -15.559 L -155.685 -15.37 L -155.685 -15.161 L -155.685 -14.932 L -155.685 -14.415 L -155.685 -13.827 L -155.685 -13.173 L -155.685 -12.458 L -155.685 -11.69 L -155.685 -10.873 L -155.685 -10.014 L -155.685 -9.119 L -155.685 -8.663 M -155.685 -7.724 L -155.685 -7.243 L -155.685 -5.293 L -155.685 -3.315 L -155.685 -1.358 L -155.685 -.401 L -155.685 .532 L -155.685 1.437 L -155.685 2.307 L -155.685 3.136 L -155.685 3.289 L -156.17 5.1 '
                    />
                  </g>
                </g>
              </Svg> */}
            {/* <img key='1' src='logo.svg' /> */}
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
