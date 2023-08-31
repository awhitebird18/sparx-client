import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/stores/RootStore';
import authApi from '@/features/auth/api';

import { LoginData, RegistrationData } from '@/features/auth/types';

import AppSkeleton from '@/components/loaders/AppSkeleton';

interface AuthContextData {
  userLogin: (loginCredentials: LoginData) => Promise<void>;
  userLogout: () => void;
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
  const { setSections } = useStore('sectionStore');
  const { setInitialPreferences } = useStore('userPreferencesStore');
  const { setSubscribedChannels } = useStore('channelStore');
  const { setChannelUnreads } = useStore('channelUnreadStore');
  const { setUsers, setCurrentUser } = useStore('userStore');
  const { connectToSocketServer } = useStore('socketStore');

  const [loading, setLoading] = useState(true);

  const userLogin = async (loginCredentials: LoginData) => {
    try {
      await authApi.login(loginCredentials);

      verifyAndLoginUser();
    } catch (error) {
      console.error(error);
    }
  };

  const userLogout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error(err);
    } finally {
      setCurrentUser(undefined);
    }
  };

  const registerUser = async (registrationData: RegistrationData) => {
    try {
      await authApi.register(registrationData);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyAndLoginUser = useCallback(async () => {
    try {
      const data = await authApi.verify();

      setCurrentUser(data.currentUser);
      connectToSocketServer(data.currentUser);
      setChannelUnreads(data.channelUnreads);
      setInitialPreferences(data.userPreferences);
      setSections(data.sections);
      setSubscribedChannels(data.channels);
      setUsers(data.users);

      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [
    setCurrentUser,
    setChannelUnreads,
    setInitialPreferences,
    setSections,
    setSubscribedChannels,
    setUsers,
    connectToSocketServer,
  ]);

  useEffect(() => {
    try {
      verifyAndLoginUser();
    } catch (err) {
      setCurrentUser(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    userLogin,
    userLogout,
    registerUser,
    loading,
  };

  if (loading) return <AppSkeleton />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default observer(AuthProvider);
