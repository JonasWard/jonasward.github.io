import logo from './assets/icons/jonasward_logo_ww.svg';

const Landing = () => {
  return (
    <div className='App'>
      <img src={logo} className='App-logo' alt='logo' style={{ width: '25%', height: '25%' }} />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
        Learn React
      </a>
    </div>
  );
};

export default Landing;
