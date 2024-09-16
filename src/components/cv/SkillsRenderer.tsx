import { Skills, NestedList, List } from './cv.type';
import { styles, isNestedList } from './CVDocument';
import { PDFDivText } from './InfoRenderer';
import { UnNamedListRenderer } from './UnNamedListRenderer';
import { ConcatenatedUnNamedListRenderer } from './ConcatenatedUnNamedListRenderer';
import { TitleRenderer } from './TitleRenderer';
import { SimpleDividingLine } from './SimpleDividingLine';

export const SkillsRenderer: React.FC<{ skills: Skills; isPdf: boolean }> = ({ skills, isPdf }) => (
  <div id={'skills'} style={styles.blockRight}>
    <TitleRenderer title={'Skills'} leftAlign={false} isPdf={isPdf} />
    {Object.entries(skills).map(([parentSkill, subSkills]) => (
      <div id={parentSkill}>
        <PDFDivText isPdf={isPdf} content={`${parentSkill}`} id={parentSkill} />
        {Object.entries(subSkills).map(([parentSkill, subSkills]) => (
          <div id={parentSkill} style={{ ...styles.skillsInsetRight, ...styles.skillSubTitle }}>
            <PDFDivText isPdf={isPdf} content={`${parentSkill}`} id={parentSkill} />
            {isNestedList(subSkills) ? (
              Object.entries(subSkills as NestedList).map(([parentSkill, subSkills]) => (
                <div id={'skills'} style={styles.skillsInsetRight}>
                  <PDFDivText isPdf={isPdf} content={`${parentSkill}`} id={parentSkill} />
                  <div id={'subSkills'} style={styles.skillsInsetRight}>
                    <ConcatenatedUnNamedListRenderer data={subSkills} isPdf={isPdf} />
                  </div>
                </div>
              ))
            ) : (
              <div id={parentSkill} style={styles.skillsInsetRight}>
                <UnNamedListRenderer data={subSkills as List} isPdf={isPdf} style={styles.skillsInsetRight} />
              </div>
            )}
          </div>
        ))}
        <SimpleDividingLine />
      </div>
    ))}
  </div>
);
