import { Experience } from '../../types/cv/cvType';
import { styles } from './CVDocument';
import { PDFDivText } from './InfoRenderer';
import { NamedListRenderer } from './NamedListRenderer';
import { TitleRenderer } from './TitleRenderer';
import { SimpleDividingLine } from './SimpleDividingLine';
import { View } from '@react-pdf/renderer';

export const ExperienceRenderer: React.FC<{ experience: Experience; isPdf: boolean }> = ({ experience, isPdf }) => (
  <div id={'experience'} style={styles.block}>
    <TitleRenderer title={'Experience'} isPdf={isPdf} />
    {Object.entries(experience)
      .reverse()
      .map(([title, data], i, array) => (
        <View wrap={false} id={title}>
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
          {i < array.length - 1 ? <SimpleDividingLine /> : null}
        </View>
      ))}
  </div>
);
