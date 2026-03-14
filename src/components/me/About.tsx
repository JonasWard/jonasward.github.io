import profileImage from 'src/assets/pictures/profilePicture-crop.jpg';
import './about.css';

export const About = () => {
  return (
    <div className='about-page'>
      <div className='about-image'>
        <img src={profileImage} alt='Jonas Ward' />
      </div>
      <div className='about-content'>
        <h1>Hi, I am Jonas.</h1>
        <p>
          Though I originally have a background in Architecture and Urban Design, my natural passion for analysis and
          abstraction took me on a journey through the software development jungle.
        </p>
        <p>
          A flair for aesthetics together with a healthy curiosity for ongoing developments in the realm of computer
          science and additive manufacturing make me try and find purpose and solutions for a beautiful, imperfect
          reality.
        </p>
        <p>
          To understand the now, I have to look back. Many of my projects therefore also have a cultural heritage or
          ecological component.
        </p>
      </div>
    </div>
  );
};

export default About;
