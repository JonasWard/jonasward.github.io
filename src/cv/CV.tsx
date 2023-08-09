import { PDFViewer } from '@react-pdf/renderer';
import './cv.css';
import { Header } from '../Header';
import { CVDocument } from './CVDocument';
import cv from './cv.json';
import { CVData } from './cv.type';

export const CV = () => {
  return (
    <>
      <Header />
      <PDFViewer className={'document'}>
        <CVDocument data={cv as CVData} />
      </PDFViewer>
    </>
  );
};

export default CV;
