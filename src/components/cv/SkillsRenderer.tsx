import { List, Skills } from '../../types/cv/cvType';
import { REACT_PDF_STYLES } from './style';
import { PDFDivText } from './InfoRenderer';
import { TitleRenderer } from './TitleRenderer';
import { SimpleDividingLine } from './SimpleDividingLine';
import { View } from '@react-pdf/renderer';
import { ListContentComponent } from './ListContent';

const SkillContentRenderer: React.FC<{ header: string; subSkills: List; isPdf: boolean; endLine?: boolean }> = ({
  header,
  subSkills,
  isPdf,
  endLine = false
}) => (
  <View wrap={false}>
    <PDFDivText style={REACT_PDF_STYLES.primaryItem} isPdf={isPdf} content={`${header} `} />
    {Object.entries(subSkills).map(([parentSkill, skills]) => (
      <>
        <PDFDivText style={REACT_PDF_STYLES.secondaryItemLeft} isPdf={isPdf} content={`${parentSkill}`} />
        <ListContentComponent
          style={{ ...REACT_PDF_STYLES.regularItem, textAlign: 'right' }}
          content={skills}
          isPdf={isPdf}
        />
      </>
    ))}
    {endLine ? <SimpleDividingLine paddingTop={25} /> : null}
  </View>
);

export const SkillsRenderer: React.FC<{ skills: Skills; isPdf: boolean }> = ({ skills, isPdf }) => (
  <div id={'skills'} style={REACT_PDF_STYLES.blockLeft}>
    <TitleRenderer title={'Skills'} leftAlign={false} isPdf={isPdf} />
    {skills
      // .filter(([parentSkill]) => parentSkill !== 'physical')
      .map(({ header, subSkills }, i, array) => (
        <SkillContentRenderer header={header} subSkills={subSkills} isPdf={isPdf} endLine={i < array.length - 1} />
      ))}
  </div>
);
