import { PDFDownloadLink } from '@react-pdf/renderer';
import './cv.css';
import { CVDocument } from './CVDocument';
import { CVHTML } from './CVDigital';
import printer from 'src/assets/icons/printer.svg';
import { CVContent } from './content/cvContent';
import { getFilenameString } from '../motivationLetter/motivationLetterDefaultContent';

export const CV = () => {
  const date = new Date();

  return (
    <div className="cv-content">
      <PDFDownloadLink fileName={getFilenameString('CV')} document={<CVDocument data={CVContent} />}>
        <div className="cv-download-link">
          <img src={printer} alt="red-dot" />
          <span>Download</span>
        </div>
      </PDFDownloadLink>
      <CVHTML data={CVContent} />
    </div>
  );
};

export default CV;
