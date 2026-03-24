import { CVData } from '../../types/cv/cvType';
import { EducationRenderer } from './EducationRenderer';
import { ExperienceRenderer } from './ExperienceRenderer';
import { InfoRenderer, PDFDivText } from './InfoRenderer';
import { SkillsRenderer } from './SkillsRenderer';
import profileImage from 'src/assets/pictures/jonas-icon.jpg';
import logo from 'src/assets/jonasward_logo_elong.png';
import './cv-digital.css';
import { ExtraCurricularRenderer } from './ExtraCurricularRenderer';
import { REACT_PDF_STYLES } from './style';

export const CVHTML: React.FC<{ data: CVData; customTitle?: string }> = ({ data, customTitle }) => (
  <div>
    <div id="header">
      <div id="left" className="header-grid">
        <div className="header-grid div-1">
          <img style={{ width: 120, height: 120, borderRadius: 60 }} alt="red-dot" src={profileImage} />
        </div>
        <div className="header-grid div-2">
          <img style={{ width: '100%', height: '75%' }} alt="red-dot" src={logo} />
          <div>
            <PDFDivText style={REACT_PDF_STYLES.tagTitle} isPdf={false} content={customTitle ?? data.tagline[0]} />
            {data.tagline.slice(1).map((tagline, i) => (
              <PDFDivText isPdf={false} content={tagline} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
    <div id="section 1" className="content-grid">
      <InfoRenderer info={data.info} isPdf={false} />
      <EducationRenderer education={data.education} isPdf={false} />
      <SkillsRenderer skills={data.skills} isPdf={false} />
      <div>
        <ExperienceRenderer experiences={data.experience} isPdf={false} />
        <div style={{ height: '20px', width: '100%' }} />
        <ExtraCurricularRenderer data={data.extraCurricular} isPdf={false} />
      </div>
    </div>
  </div>
);
