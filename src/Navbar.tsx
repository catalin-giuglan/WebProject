import './App.css';
import CreateSearch from './Searchbar';
import { useState } from 'react';
import CreateLogoButton from './CreateLogoButton';
import CreateLoginButton from './MyLoginButton';
import CreateHamburgerButton from './MyHamburgerMenu';

interface NavbarProps {

  toggleHamburgerMenu: () => void;

  setActiveSection: (section: string) => void;

}

function Navbar({ setActiveSection, toggleHamburgerMenu }: NavbarProps) {

  const [search, setSearch] = useState('');

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '70px', backgroundColor: '#1E1E1E',
          color: '#fff', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)', zIndex: 10000,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
          <div className="burgerButton">
            <CreateHamburgerButton onClick={toggleHamburgerMenu} />
          </div>
          <div className="logoButton">
            <CreateLogoButton onClick={() => setActiveSection('home')} />
          </div>
        </div>

        <div>
          <CreateSearch placeholder="Search" state={search} setState={handleSearch} />
        </div>

        <div className="loginButton">
          <CreateLoginButton onClick={() => setActiveSection('login')} />
        </div>
      </header>
    </>
  );
}

export default Navbar;
