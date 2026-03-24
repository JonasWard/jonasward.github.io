import profileImage from 'src/assets/pictures/jonas-icon.jpg';
import './about.css';

export const About = () => {
  return (
    <div className="about-page">
      <div className="about-image">
        <img src={profileImage} alt="Jonas Ward" />
      </div>
      <div className="about-content">
        <h1>Hi, I am Jonas.</h1>
        <p>10+ years of creative problem solving in AEC.</p>
        <p>5 + years of creative software development.</p>
        <p>Background in Architecture, Urban Design, and Digital Fabrication.</p>
        <p>
          Trying to apply my flair for aesthetics and curiosity for technical devolepments into the realm of Ecological
          and Sustainable Design.
        </p>
        <p>
          To understand the now, one has to look back. Many of my projects therefore also have a cultural heritage or
          ecological component.
        </p>
      </div>
    </div>
  );
};

export default About;
