import { Page, Document, Image, PDFViewer, Link } from '@react-pdf/renderer';
import { useState } from 'react';
import './motivationletter.css';
import { styles } from './CVDocument';
import { PDFDivText } from './InfoRenderer';
import { DividingSpace } from './DividingSpace';
import { TitleRenderer } from './TitleRenderer';
import cv from './cv.json';
import logo from 'src/assets/jonasward_logo_elong.png';

type MotivationLetterContent = {
  title: string;
  people: string;
  content: string;
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const MotivationPDF: React.FC<{ motivationContent: MotivationLetterContent }> = ({ motivationContent }) => {
  const date = new Date();
  return (
    <Document title={`Van_den_Bulcke_Jonas-Motivation_Letter-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.pdf`}>
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
              marginBottom: 30,
            }}
          >
            <div id={'left'} style={styles.left}>
              <div style={styles.regularItem}>
                <PDFDivText isPdf id={'firstName'} content={`Jonas, ${cv.info.name}`} />
                <DividingSpace id={'1'} />
                <PDFDivText isPdf id={'addressLine1'} content={`${cv.info.addressLine1}`} />
                <PDFDivText isPdf id={'telephone'} content={`${cv.info.telephone}`} />
                <PDFDivText isPdf id={'email'} content={`${cv.info.email}`} />
                <Link id={'website'} style={{ color: 'black' }} href={'https://jonasward.eu'}>
                  jonasward.eu
                </Link>
              </div>
            </div>
            <Image style={{ marginTop: -4, width: 285, height: 60 }} src={logo} />
          </div>
        </div>
        <div id={'right'} style={{ ...styles.left, width: '100%', paddingLeft: 0, fontSize: 12 }}>
          <div id={'education'} style={{ ...styles.block, textAlign: 'justify', gap: 10 }}>
            <TitleRenderer title={'Motivation Letter'} isPdf />
            <PDFDivText isPdf content={motivationContent.title} id={'title'} />
            <PDFDivText isPdf content={motivationContent.people} id={'people'} />
            {motivationContent.content?.split('\n').map((line, i) => (
              <PDFDivText isPdf content={line} id={`content${i}`} />
            ))}
            <DividingSpace id={'1'} />
            <PDFDivText isPdf content={'I am looking forward to your response'} id={'response'} />
            <PDFDivText isPdf content={'Kind Regards,\nJonas Van den Bulcke'} id={'wishes'} />
            <DividingSpace id={'2'} />
            <PDFDivText isPdf content={`Zürich, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`} id={'date'} />
          </div>
        </div>
      </Page>
    </Document>
  );
};

export const MotivationLetterGenerator: React.FC = () => {
  const [motivationLetterContent, setMotivationLetterContent] = useState<MotivationLetterContent>({
    title: 'Application for Software Engineer Position',
    people: 'To whom it may concern',
    content:
      "I am excited to submit my application for the Frontend Developer position for the ArcGIS Scene Viewer at Esri. With four years of hands-on experience in frontend development and a Master of Science in Engineering with a major in Urban Design, I am eager to contribute to your team and help bring complex data visualizations to life.\nMy journey in frontend development has been driven by a passion for creating visually stunning and user-friendly interfaces. I have honed my skills in HTML, CSS, JavaScript, and modern frontend frameworks such as React and Angular. My projects often involve transforming intricate datasets into intuitive visual representations, making data not just accessible, but engaging and insightful for users.\nDuring my master's program, I specialized in urban design, where I developed a deep appreciation for how data can influence and inform spatial planning and urban development. This academic background, combined with my technical expertise, allows me to approach data visualization with a unique perspective that aligns with the goals of the ArcGIS Scene Viewer.\nAt my previous roles, I led the development of several data-driven applications, collaborating closely with designers and backend developers to deliver seamless user experiences. I am particularly proud of a project where I designed and implemented an interactive map interface that integrated real-time data feeds, significantly enhancing users' ability to analyze and interpret data.\nEsri's reputation for innovation in geospatial technology and its commitment to transforming how we understand and interact with the world is truly inspiring. I am enthusiastic about the opportunity to be part of a team that is at the forefront of geospatial data visualization. I am confident that my technical skills, coupled with my passion for urban design and data visualization, would make me a valuable asset to your team.",
  } as MotivationLetterContent);
  const [title, setTitle] = useState<string>(motivationLetterContent.title);
  const [people, setPeople] = useState<string>(motivationLetterContent.people);
  const [content, setContent] = useState<string>(motivationLetterContent.content);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  console.log(motivationLetterContent);
  console.log(motivationLetterContent.content?.split('\n').map((line, i) => line));

  return (
    <div className='cv-content'>
      <div id='myDrawer' className='drawer' style={{ left: showDrawer ? '0' : '-458px' }}>
        <input
          type='text'
          value={title ?? undefined}
          onBlur={() => setMotivationLetterContent({ ...motivationLetterContent, title })}
          onKeyDown={(e) => e.key === 'Enter' && setMotivationLetterContent({ ...motivationLetterContent, title })}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
        />
        <input
          type='text'
          value={people ?? undefined}
          onBlur={() => setMotivationLetterContent({ ...motivationLetterContent, people })}
          onKeyDown={(e) => e.key === 'Enter' && setMotivationLetterContent({ ...motivationLetterContent, people })}
          onChange={(e) => setPeople(e.target.value)}
          placeholder='People'
        />
        <textarea
          value={content ?? undefined}
          onBlur={() => setMotivationLetterContent({ ...motivationLetterContent, content })}
          onKeyDown={(e) => e.key === 'Enter' && setMotivationLetterContent({ ...motivationLetterContent, content })}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Content'
        />
        <button
          style={{ background: 'black', color: 'white', transform: showDrawer ? 'translateX(0px)' : 'translateX(450px)' }}
          onClick={() => setShowDrawer(!showDrawer)}
        >
          {showDrawer ? 'Close Input Drawer' : 'Open Input Drawer'}
        </button>
      </div>
      <PDFViewer style={{ height: 'calc(100vh - 150px)' }}>
        <MotivationPDF motivationContent={motivationLetterContent} />
      </PDFViewer>
    </div>
  );
};
