import { Header } from '../Header';

const divStyle = {
  background: 'black',
  color: 'white',
};

export const About = () => {
  return (
    <>
      <Header />
      <div style={divStyle}>
        <h2>About Page</h2>
        <main>
          <p>This section contains information about...</p>
        </main>
      </div>
    </>
  );
};

export default About;
