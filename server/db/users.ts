import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  username: string;
  password: string;
  profilePicture: string;
}

export interface UserResponse {
  id: string;
  username: string;
  profilePicture: string;
}

export const sanitizeUser = (user: User): UserResponse => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};

