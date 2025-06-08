import {
  MotivationLetterContent,
  MotivationLetterKeys,
  MotivationLetterLocalStorage
} from '../../types/motivationLetter/content';

export const MotivationLetterDefaultContent: MotivationLetterContent = {
  title: 'Motivation Letter',
  intro: 'Application for Software Engineer Position',
  people: 'To whom it may concern',
  content:
    "I am excited to submit my application for the Frontend Developer position for the ArcGIS Scene Viewer at Esri. With four years of hands-on experience in frontend development and a Master of Science in Engineering with a major in Urban Design, I am eager to contribute to your team and help bring complex data visualizations to life.\nMy journey in frontend development has been driven by a passion for creating visually stunning and user-friendly interfaces. I have honed my skills in HTML, CSS, JavaScript, and modern frontend frameworks such as React and Angular. My projects often involve transforming intricate datasets into intuitive visual representations, making data not just accessible, but engaging and insightful for users.\nDuring my master's program, I specialized in urban design, where I developed a deep appreciation for how data can influence and inform spatial planning and urban development. This academic background, combined with my technical expertise, allows me to approach data visualization with a unique perspective that aligns with the goals of the ArcGIS Scene Viewer.\nAt my previous roles, I led the development of several data-driven applications, collaborating closely with designers and backend developers to deliver seamless user experiences. I am particularly proud of a project where I designed and implemented an interactive map interface that integrated real-time data feeds, significantly enhancing users' ability to analyze and interpret data.\nEsri's reputation for innovation in geospatial technology and its commitment to transforming how we understand and interact with the world is truly inspiring. I am enthusiastic about the opportunity to be part of a team that is at the forefront of geospatial data visualization. I am confident that my technical skills, coupled with my passion for urban design and data visualization, would make me a valuable asset to your team.",
  outro: 'I am looking forward to your response',
  wishes: 'Kind Regards,',
  city: 'Zürich'
};

export const MotivationLetterDefaultLocalStorageContent: MotivationLetterLocalStorage = {
  [MotivationLetterKeys.defaultKey]: MotivationLetterDefaultContent
};

export const getFilenameString = (content: 'CV' | 'Motivation_Letter') =>
  `Van_den_Bulcke_Jonas${content}-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}.pdf`;
