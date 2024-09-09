import profileImage from '../../assets/pictures/profilePicture-crop.jpg';
import './about.css';

export const About = () => {
  return (
    <div className='about-page' style={{ paddingTop: '60px' }}>
      <div>
        <img src={profileImage} alt='profilePic' />
      </div>
      <p>
        <span>Hi I am Jonas!</span>
        <span>
          Though I originally have a background in Architecure and Urban Design, my natural passion for analysis and abstraction took me on a journey through
          the software development jungle!
        </span>
        <span>
          A flair for aesthetics together with healthy curiousity for ongoing developments in the realm of computer science and additive manufacturing, make me
          try and find purpose and solutions for a beautiful imperfect reality.
        </span>
        <span>To understand the now, I have to look back. Many of my projects therefore also have a cultural heritage or ecological component.</span>
      </p>
    </div>
  );
};

export default About;
