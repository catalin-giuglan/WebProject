import './App.css';
import CreateProfileButton from './MyProfileButton';
import CreateHistoryButton from './MyHistoryButton';
import CreateUploadButton from './MyUploadButton';
import CreateHomeButton from './MyHomeButton';

function Sidebar({
  setActiveSection,
  isHamburgerOpen,
}: {
  setActiveSection: (section: string) => void;
  isHamburgerOpen: boolean;
}) {
  return (
    <div
      style={{
        position: 'fixed', top: '70px', left: 0, height: '100%', width: isHamburgerOpen ? '330px' : '100px',
        backgroundColor: '#1E1E1E', transition: 'width 0.3s ease-in-out', overflow: 'hidden',
      }}
    >
      <nav
        style={{ display: 'flex', flexDirection: 'column', padding: '10px',
          alignItems: 'flex-start', gap: '40px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '40px' }}>
          <div className="sidebar-button">
            <CreateHomeButton name={isHamburgerOpen ? 'Home' : ''} onClick={() => setActiveSection('home')} />
          </div>
          <div className="sidebar-button">
            <CreateProfileButton name={isHamburgerOpen ? 'Profile' : ''} onClick={() => setActiveSection('profile')} />
          </div>
          <div className="sidebar-button">
            <CreateHistoryButton name={isHamburgerOpen ? 'History' : ''} onClick={() => setActiveSection('history')} />
          </div>
          <div className="sidebar-button">
            <CreateUploadButton name={isHamburgerOpen ? 'Post video' : ''} onClick={() => setActiveSection('upload')} />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
