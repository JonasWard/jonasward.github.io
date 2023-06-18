import { Header } from './Header';
import logo from './assets/icons/jonasward_logo_ww.svg';

const Landing = () => {
  return (
    <div className='App'>
      <Header />
      <header className='App-header'>
        <img
          src={logo}
          className='App-logo'
          alt='logo'
          style={{ width: '25%', height: '25%', filter: 'invert(100%) sepia(0%) saturate(1%) hue-rotate(216deg) brightness(106%) contrast(100%)' }}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
};

export default Landing;
