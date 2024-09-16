import { PDFDownloadLink } from '@react-pdf/renderer';
import './cv.css';
import { CVDocument } from './CVDocument';
import cv from './cv.json';
import { CVHTML } from './CVDigital';
import { CVData } from './cv.type';
import printer from 'src/assets/icons/printer.svg';

export const CV = () => {
  const date = new Date();

  return (
    <div className='cv-content'>
      <PDFDownloadLink
        fileName={`JonasWard_CV_${date.getFullYear()}-${date.getMonth()}-${date.getDay()}.pdf`}
        document={<CVDocument data={cv as any as CVData} />}
      >
        <div className='cv-download-link'>
          <img src={printer} />
          <span>Download</span>
        </div>
      </PDFDownloadLink>
      <CVHTML data={cv as any as CVData} />
    </div>
  );
};

export default CV;
