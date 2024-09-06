import { PDFDownloadLink } from '@react-pdf/renderer';
import './cv.css';
import { Header } from '../Header';
import { CVDocument, CVHTML } from './CVDocument';
import cv from './cv.json';
import { CVData } from './cv.type';

export const CV = () => {
  const date = new Date();

  return (
    <>
      <PDFDownloadLink
        style={{ position: 'absolute', top: '100px' }}
        fileName={`JonasWard_CV_${date.getFullYear()}-${date.getMonth()}-${date.getDay()}.pdf`}
        document={<CVDocument data={cv} isPdf={true} />}
      >
        <div key='download-link'>download me!</div>
      </PDFDownloadLink>
      <CVHTML data={cv} isPdf={false} />

      {/* <PDFViewer className={'document'}> */}
      {/* <CVDocument data={cv as CVData} /> */}
      {/* </PDFViewer> */}
    </>
  );
};

export default CV;
