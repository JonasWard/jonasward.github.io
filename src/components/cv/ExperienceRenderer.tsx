import { Experience, ExperienceContent } from '../../types/cv/cvType';
import { REACT_PDF_STYLES } from './style';
import { PDFDivText } from './InfoRenderer';
import { NamedListRenderer } from './NamedListRenderer';
import { TitleRenderer } from './TitleRenderer';
import { SimpleDividingLine } from './SimpleDividingLine';
import { View } from '@react-pdf/renderer';

const ExperienceContentRenderer: React.FC<{ content: ExperienceContent; isPdf: boolean; endLine?: boolean }> = ({
  content,
  isPdf,
  endLine = false
}) => (
  <View wrap={false}>
    <div id={'name'} style={REACT_PDF_STYLES.section}>
      <PDFDivText style={REACT_PDF_STYLES.primaryItem} isPdf={isPdf} content={`${content.company} `} />
      <PDFDivText
        style={REACT_PDF_STYLES.secondaryItem}
        isPdf={isPdf}
        content={` - ${content.location} - ${content.date}`}
      />
    </div>
    <PDFDivText isPdf={isPdf} content={`${content.position} - ${content.role}`} />
    <NamedListRenderer data={content.projects} isPdf={isPdf} />
    {endLine ? <SimpleDividingLine /> : null}
  </View>
);

export const ExperienceRenderer: React.FC<{ experiences: Experience; isPdf: boolean }> = ({ experiences, isPdf }) => (
  <div id={'experience'} style={REACT_PDF_STYLES.block}>
    <TitleRenderer title={'Experience'} isPdf={isPdf} />
    {[...experiences].reverse().map((experience, i, array) => (
      <ExperienceContentRenderer content={experience} isPdf={isPdf} endLine={i < array.length - 1} />
    ))}
  </div>
);
