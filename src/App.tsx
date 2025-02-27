import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import Navbar from './Navbar.tsx';
import Sidebar from './Sidebar.tsx';
import CreateFilter from './Filter.tsx';
import Video from './Video.tsx';
import VideoPage from './VideoPage.tsx';
import HistoryPage from './HistoryPage.tsx';
import UserProfile from './UserProfile.tsx';

interface User {
  id: string;
  username: string;
  profilePicture: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleHamburgerMenu = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      const user = {
        ...data,
        profilePicture: `http://localhost:5000${data.profilePicture}`,
      };

      setCurrentUser(user);
      setActiveSection('home');
    } catch (error) {
      alert('An error occurred during login');
    }
  };

  const handleRegister = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      const user = {
        ...data,
        profilePicture: `http://localhost:5000${data.profilePicture}`,
      };

      setCurrentUser(user);
      setActiveSection('home');
    } catch (error) {
      alert('An error occurred during registration');
    }
  };

  const videos = [
    {
      name: 'Many Men',
      likes: '1.2M',
      description: 'One of the greatest hits!',
      thumbnail_images: ['./music.png'], // Thumbnail
      video_url: './fein.mp4', // URL-ul videoclipului
      creator: '50Cent',
      creator_picture: './50Cent.jpg',
      tags: ['Music', 'All'],
      date: '15 years ago',
    },
    {
      name: 'Beautiful Landscapes',
      likes: '5.1k',
      description: 'Take a break :D',
      thumbnail_images: ['./nature.png'],
      video_url: './goosebumps.mp4',
      creator: 'Relaxing World',
      creator_picture: './profile_nature.jpg',
      tags: ['Nature', 'All'],
      date: '2 years ago',
    },
    {
      name: 'PGL Major Copenhagen',
      likes: '52.8k',
      description: 'The first CS2 Major!',
      thumbnail_images: ['./live.png'],
      video_url: './bandit.mp4',
      creator: 'PGL',
      creator_picture: './pgl.jpg',
      tags: ['Games', 'All', 'Live'],
      date: '1 month ago',
    },
  ];

  // Update username 
  const handleUsernameUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const currentPassword = formData.get('currentPassword') as string;

    try {
      const response = await fetch(
        `http://localhost:5000/users/${currentUser?.id}/username`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, currentPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      const updatedUser = {
        ...data,
        profilePicture: `http://localhost:5000${data.profilePicture}`,
      };

      setCurrentUser(updatedUser);
      setSuccess('Username updated successfully!');
      event.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update username');
    } finally {
      setIsLoading(false);
    }
  };

  // Update Password
  const handlePasswordUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(event.currentTarget);
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/users/${currentUser?.id}/password`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      const updatedUser = {
        ...data,
        profilePicture: `http://localhost:5000${data.profilePicture}`,
      };

      setCurrentUser(updatedUser);
      setSuccess('Password updated successfully!');
      event.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  // Update Profile Picture
  const handleProfilePictureUpdate = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const response = await fetch(
        `http://localhost:5000/users/${currentUser?.id}/profile-picture`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      const updatedUser = {
        ...currentUser!,
        profilePicture: `http://localhost:5000${data.profilePicture}?t=${new Date().getTime()}`,
      };

      setCurrentUser(updatedUser);
      setSuccess('Profile picture updated successfully!');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update profile picture'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedVideo) {
      const history = JSON.parse(localStorage.getItem('videoHistory') || '[]');
      const updatedHistory = [selectedVideo, ...history.filter((v: any) => v.name !== selectedVideo.name)];
      localStorage.setItem('videoHistory', JSON.stringify(updatedHistory));
    }
  }, [selectedVideo]);

  const filteredVideos = videos.filter((video) => video.tags.includes(selectedFilter));

  return (
    <>
      <Navbar
        setActiveSection={setActiveSection}
        toggleHamburgerMenu={toggleHamburgerMenu}
      />
      <Sidebar
        setActiveSection={setActiveSection}
        isHamburgerOpen={isHamburgerOpen}
      />

      <div style={{ display: 'flex' }}>
        <main>
          {activeSection === 'home' && (
            <div
              style={{
                position: 'absolute',
                top: '110px',
                left: isHamburgerOpen ? '530px' : '200px',
                transition: 'ease-in-out 0.3s left',
                gap: '30px',
                padding: '10px',
                marginRight: '10px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              {['All', 'Music', 'Nature', 'Games', 'Live'].map((filter) => (
                <div className="filterButton" key={filter}>
                  <CreateFilter name={filter} onClick={() => setSelectedFilter(filter)} />
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              position: 'absolute',
              top: '270px',
              left: isHamburgerOpen ? '530px' : '200px',
              transition: 'ease-in-out 0.3s left',
              gap: '60px',
              padding: '10px',
              marginRight: '10px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            {activeSection === 'home' && (
              <div
                style={{ display: 'flex', flexDirection: 'row', gap: '50px', color: 'white'}}>
                {filteredVideos.map((video) => (
                <Video
                  key={video.name}
                  name={video.name}
                  likes={video.likes}
                  description={video.description}
                  thumbnail_images={video.thumbnail_images}
                  creator={video.creator}
                  creator_picture={video.creator_picture}
                  tags={video.tags}
                  date={video.date}
                  onClick={() => {
                    setSelectedVideo(video);
                    setActiveSection('video');
                  }}
                />
              ))}
              </div>
            )}
            {activeSection === 'profile' && currentUser && (
              <UserProfile
                currentUser={currentUser}
                isLoading={isLoading}
                error={error}
                success={success}
                isHamburgerOpen={isHamburgerOpen}
                handleProfilePictureUpdate={handleProfilePictureUpdate}
                handleUsernameUpdate={handleUsernameUpdate}
                handlePasswordUpdate={handlePasswordUpdate}
              />
            )}
            {activeSection === 'history' && (
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    fontSize: 40,
                    position: 'fixed',
                    top: '110px',
                    left: isHamburgerOpen ? '-300px' : '-600px',
                    transition: 'ease-in-out 0.3s left',
                    color: 'white',
                    zIndex: 10,
                    padding: '20px 0',
                    width: '100%'
                  }}
                >
                  View History
                </div>
                <div
                  style={{
                    position: 'relative',
                    left: isHamburgerOpen ? '0px' : '0px',
                    transition: 'ease-in-out 0.3s left',
                    color: 'white',
                  }}
                >
                  <HistoryPage 
                    onVideoClick={(video) => {
                      setSelectedVideo(video);
                      setActiveSection('video');
                    }} 
                  />
                </div>
              </div>
            )}
            {activeSection === 'upload' && (
              <div
                style={{
                  color: 'white',
                  position: 'fixed',
                  left: '820px',
                }}
              >
                <h1>Upload Content</h1>
                <label
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: '#444',
                    color: 'white',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                >
                  Choose File
                  <input type="file" style={{ display: 'none' }} />
                </label>
              </div>
            )}

            {activeSection === 'login' && (
              <div className="login">
                <h2>Login</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleLogin(
                      formData.get('username') as string,
                      formData.get('password') as string
                    );
                  }}
                >
                  <input name="username" type="text" placeholder="Username" required />
                  <input name="password" type="password" placeholder="Password" required />
                  <button type="submit">Login</button>
                </form>
                <p>
                  Don't have an account?{' '}
                  <button onClick={() => setActiveSection('register')}>Register</button>
                </p>
              </div>
            )}

            {activeSection === 'register' && (
              <div className="register">
                <h2>Register</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleRegister(
                      formData.get('username') as string,
                      formData.get('password') as string
                    );
                  }}
                >
                  <input name="username" type="text" placeholder="Username" required />
                  <input name="password" type="password" placeholder="Password" required />
                  <button type="submit">Register</button>
                </form>
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setActiveSection('login')}>Login</button>
                </p>
              </div>
            )}
            {activeSection === 'video' && selectedVideo && (
              <VideoPage 
                video={selectedVideo} 
                onBack={() => {
                  setSelectedVideo(null);
                  setActiveSection('home');
                }} 
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;