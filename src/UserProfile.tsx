import { useState } from 'react'

interface UserProfileProps {
  currentUser: {
    id: string;
    username: string;
    profilePicture: string;
  } | null;
  isLoading: boolean;
  error: string;
  success: string;
  isHamburgerOpen: boolean;
  handleProfilePictureUpdate: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleUsernameUpdate: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handlePasswordUpdate: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function UserProfile({
  currentUser,
  isLoading,
  isHamburgerOpen,
  handleProfilePictureUpdate,
  handleUsernameUpdate,
  handlePasswordUpdate
}: UserProfileProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewUsername, setPreviewUsername] = useState<string>('');
  const [previewPassword, setPreviewPassword] = useState<string>('');

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      await handleProfilePictureUpdate(e);
    }
  };

  const handleUsernameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUsername = formData.get('username') as string;
    
    setPreviewUsername(newUsername);
  
    await handleUsernameUpdate(e);
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newPassword = formData.get('newPassword') as string;

    setPreviewPassword(newPassword);
    
    await handlePasswordUpdate(e);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '-100px',
        left: isHamburgerOpen ? '230px' : '100px',
        transition: 'ease-in-out 0.3s left',
        padding: '20px',
        display: 'flex',
        gap: '230px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <div>
          <img
            src={previewImage || currentUser?.profilePicture}
            alt="Profile"
            style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.src = '/50Cent.jpg';
            }}
          />
          <h1 style={{ color: 'white', marginTop: '10px' }}>
            {previewUsername || currentUser?.username}
          </h1>
        </div>
      </div>

      <div className="w-96 space-y-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <label htmlFor="picture" className="cursor-pointer w-full">
            <div style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '10px' }}>
              Schimbă poza de profil
            </div>
            <input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isLoading}
              className="hidden"
            />
          </label>
        </div>

        <div className="w-96 space-y-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <form onSubmit={handleUsernameSubmit} className="space-y-4">
            <h3 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '10px' }}>Schimbă numele</h3>
            <div className="space-y-2">
              <input
                name="username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Nume nou"
                required
                disabled={isLoading}
              />
              <input
                name="currentPassword"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Parola curentă"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? 'Se actualizează...' : 'Actualizează Numele'}
            </button>
          </form>
        </div>
      </div>

        <div className="bg-white rounded-lg shadow-md p-4">
        <form onSubmit={handlePasswordSubmit}>
            <h3 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '10px' }}>Schimbă parola</h3>
            <div className="space-y-2">
              <input
                name="currentPassword"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Parola curentă"
                required
                disabled={isLoading}
              />
              <input
                name="newPassword"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Parola nouă"
                required
                disabled={isLoading}
              />
              <input
                name="confirmPassword"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Confirmă parola"
                required
                disabled={isLoading}
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Se actualizează...' : 'Actualizează Parola'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}