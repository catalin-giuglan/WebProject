import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { User, sanitizeUser } from './db/users';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Simulam o baza de date folosind un array
let users: User[] = [];

const DEFAULT_PROFILE_PICTURE = '/default-avatar.png';

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Verificam daca username-ul exista deja
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ 
      error: 'Username already exists' 
    });
  }

  // Cream un nou utilizator cu UUID si imagine implicita
  const newUser: User = {
    id: uuidv4(),
    username,
    password,
    profilePicture: DEFAULT_PROFILE_PICTURE
  };

  users.push(newUser);
  
  res.status(201).json(sanitizeUser(newUser));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => 
    u.username === username && 
    u.password === password
  );

  if (!user) {
    return res.status(401).json({ 
      error: 'Invalid credentials' 
    });
  }

  res.json(sanitizeUser(user));
});

// Endpoint pentru actualizarea pozei de profil
app.put('/users/:id/profile-picture', (req, res) => {
  const { id } = req.params;
  const { profilePicture } = req.body;

  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ 
      error: 'User not found' 
    });
  }

  users[userIndex].profilePicture = profilePicture;
  res.json(sanitizeUser(users[userIndex]));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

