// src/AuthProvider.tsx

import { isUser } from '@/utils/isUser';
import { isValidJson } from '@/utils/isValidJson';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type User = {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
};

interface AuthContextData {
  currentUser: User;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

const authenticateUser = async (email: string, password: string): Promise<User> => {
  // Call your API here
  // Replace with actual authentication logic
  // For now, we'll just return a mock user object if the credentials are correct

  if (email === 'test' && password === 'password') {
    return {
      uuid: '3c82abba-2ce9-4805-a978-1bedf848dfe9',
      email: 'aaron@gmail.com',
      firstName: 'Aaron',
      lastName: 'Whitebird',
      image: '/images/profile-image-1.png',
    };
  } else {
    throw new Error('Invalid username or password');
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  const login = async (username: string, password: string) => {
    try {
      const user = await authenticateUser(username, password);

      if (!user) {
        throw Error('Email or password is incorrect');
      }

      window.localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    // Clear the user data
    setCurrentUser({} as User);
    window.localStorage.removeItem('user');
    // Maybe do other cleanup tasks
  };

  const register = async () => {
    try {
      // Call your API here to register the user
      // For now, we'll just log the details

      setCurrentUser({} as User); // Set the current user after successful registration
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    // Check if user is logged in on initial load
    // Again, replace this with actual logic

    const user = window.localStorage.getItem('user');

    if (user && isValidJson(user)) {
      const parsedUser = JSON.parse(user);

      setCurrentUser(isUser(parsedUser) ? parsedUser : {});
    }

    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    register,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export default AuthProvider;
