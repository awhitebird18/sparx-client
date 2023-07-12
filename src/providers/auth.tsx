import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { LoginCredentials } from '@/features/auth';
import { login } from '@/features/auth/api/login';
import { axios } from '@/lib/axios';
import { verifyUser } from '@/features/auth/api/verifyUser';
import { RegistrationData } from '@/features/auth';
import { register } from '@/features/auth/api/register';

type User = {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  theme: string;
};

interface AuthContextData {
  currentUser: User | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  userLogin: (loginCredentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  registerUser: (registrationData: RegistrationData) => Promise<void>;
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

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const userLogin = async (loginCredentials: LoginCredentials) => {
    try {
      const res = await login(loginCredentials);
      const { access_token: token } = res;

      localStorage.setItem('auth', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch user data
      const data = await axios.get('/auth/verify');
      setCurrentUser(data.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    window.localStorage.removeItem('auth');
  };

  const registerUser = async (registrationData: RegistrationData) => {
    try {
      setCurrentUser(null);
      const res = await register(registrationData);

      setCurrentUser(res);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      const token = localStorage.getItem('auth');
      if (!token) {
        setLoading(false);
        return;
      }

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

      const data = await verifyUser();

      setCurrentUser(data);
      setLoading(false);
    };

    try {
      fn();
    } catch (err) {
      setCurrentUser(null);
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    userLogin,
    logout,
    registerUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export default AuthProvider;
