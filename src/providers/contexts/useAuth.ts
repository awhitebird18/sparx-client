import { useContext } from 'react';
import { AuthContextData } from '../types/AuthContextData';
import { AuthContext } from './AuthContext';

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
