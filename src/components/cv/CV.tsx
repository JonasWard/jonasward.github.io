import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import './cv.css';
import { CVDocument } from './CVDocument';
import { CVHTML } from './CVDigital';
import printer from 'src/assets/icons/printer.svg';
import { getFilenameString } from '../motivationLetter/motivationLetterDefaultContent';
import { CVData } from 'src/types/cv/cvType';

export const CV: React.FC<{ data: CVData }> = (props) => (
  <div className="cv-content">
    <PDFDownloadLink fileName={getFilenameString(props.data.cvName)} document={<CVDocument {...props} />}>
      <div className="cv-download-link">
        <img src={printer} alt="red-dot" />
        <span>Download</span>
      </div>
    </PDFDownloadLink>
    {import.meta.env.DEV ? (
      <div
        style={{
          position: 'fixed',
          left: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          width: '100svw'
        }}
      >
        <CVHTML {...props} />
        <PDFViewer style={{ width: '100%', height: '100%' }} children={<CVDocument {...props} />} />
      </div>
    ) : (
      <CVHTML {...props} />
    )}
  </div>
);

export default CV;
