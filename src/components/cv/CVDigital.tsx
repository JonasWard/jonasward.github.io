import { CVData } from './cv.type';
import { EducationRenderer } from './EducationRenderer';
import { ExperienceRenderer } from './ExperienceRenderer';
import { InfoRenderer } from './InfoRenderer';
import { SkillsRenderer } from './SkillsRenderer';
import profileImage from 'src/assets/pictures/profilePicture-crop.jpg';
import logo from 'src/assets/jonasward_logo_elong.png';
import './cv-digital.css';
import { ExtraCurricularRenderer } from './ExtraCurricularRenderer';

export const CVHTML: React.FC<{ data: CVData }> = ({ data }) => (
  <div>
    <div id='header'>
      <div id='left' className='header-grid'>
        <div className='header-grid div-1'>
          <img style={{ width: 120, height: 120, borderRadius: 60 }} alt='red-dot' src={profileImage} />
        </div>
        <div className='header-grid div-2'>
          <img style={{ width: '100%', height: '75%' }} alt='red-dot' src={logo} />
        </div>
      </div>
    </div>
    <div id='section 1' className='content-grid'>
      <InfoRenderer info={data.info} isPdf={false} />
      <EducationRenderer education={data.education} isPdf={false} />
      <SkillsRenderer skills={data.skills} isPdf={false} />
      <div>
        <ExperienceRenderer experience={data.experience} isPdf={false} />
        <div style={{ height: '20px', width: '100%' }} />
        <ExtraCurricularRenderer data={data.extraCurricular} isPdf={false} />
      </div>
    </div>
  </div>
);
