import { Skills, NestedList, List } from './cv.type';
import { styles, isNestedList } from './CVDocument';
import { PDFDivText } from './InfoRenderer';
import { UnNamedListRenderer } from './UnNamedListRenderer';
import { ConcatenatedUnNamedListRenderer } from './ConcatenatedUnNamedListRenderer';
import { TitleRenderer } from './TitleRenderer';
import { SimpleDividingLine } from './SimpleDividingLine';
import { View } from '@react-pdf/renderer';

export const SkillsRenderer: React.FC<{ skills: Skills; isPdf: boolean }> = ({ skills, isPdf }) => (
  <div id={'skills'} style={styles.blockRight}>
    <TitleRenderer title={'Skills'} leftAlign={false} isPdf={isPdf} />
    {Object.entries(skills)
      // .filter(([parentSkill]) => parentSkill !== 'physical')
      .map(([parentSkill, subSkills], i, array) => (
        <View id={parentSkill}>
          <PDFDivText isPdf={isPdf} content={`${parentSkill}`} id={parentSkill} />
          {Object.entries(subSkills).map(([parentSkill, subSkills]) => (
            <View id={parentSkill} style={{ ...styles.skillsInsetRight, ...styles.skillSubTitle }}>
              <PDFDivText isPdf={isPdf} content={`${parentSkill}`} id={parentSkill} />
              {isNestedList(subSkills) ? (
                Object.entries(subSkills as NestedList).map(([parentSkill, subSkills]) => (
                  <View wrap={false} id={'skills'} style={styles.skillsInsetRight}>
                    <PDFDivText isPdf={isPdf} content={`${parentSkill}`} id={parentSkill} />
                    <div id={'subSkills'} style={styles.skillsInsetRight}>
                      <ConcatenatedUnNamedListRenderer data={subSkills} isPdf={isPdf} />
                    </div>
                  </View>
                ))
              ) : (
                <View wrap={false} id={parentSkill} style={styles.skillsInsetRight}>
                  <UnNamedListRenderer data={subSkills as List} isPdf={isPdf} style={styles.skillsInsetRight} />
                </View>
              )}
            </View>
          ))}
          {i < array.length - 1 ? <SimpleDividingLine /> : null}
        </View>
      ))}
  </div>
);
