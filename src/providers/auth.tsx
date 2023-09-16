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
  verifyAndLoginUser: () => void;
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
  const { setUsers, setCurrentUserId, currentUser } = useStore('userStore');
  const { connectToSocketServer } = useStore('socketStore');
  const { setUserStatuses } = useStore('userStatusStore');

  const [loading, setLoading] = useState(true);

  const userLogin = async (loginCredentials: LoginData) => {
    try {
      await authApi.login(loginCredentials);

      verifyAndLoginUser();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const userLogout = async () => {
    try {
      await authApi.logout();

      setCurrentUserId(undefined);
    } catch (err) {
      console.error(err);
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
      setLoading(true);

      const data = await authApi.verify();

      setCurrentUserId(data.currentUser.uuid);
      connectToSocketServer(data.currentUser);
      setChannelUnreads(data.channelUnreads);
      setInitialPreferences(data.userPreferences);
      setSections(data.sections);
      setSubscribedChannels(data.channels);
      setUsers(data.users);
      setUserStatuses(data?.userStatuses);
    } finally {
      setLoading(false);
    }
  }, [
    setCurrentUserId,
    setChannelUnreads,
    setInitialPreferences,
    setSections,
    setSubscribedChannels,
    setUsers,
    connectToSocketServer,
    setUserStatuses,
  ]);

  useEffect(() => {
    const fn = async () => {
      try {
        if (currentUser) return;

        await verifyAndLoginUser();
      } catch (err) {
        setCurrentUserId(undefined);
      }
    };

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    userLogin,
    userLogout,
    registerUser,
    loading,
    verifyAndLoginUser,
  };

  if (loading) return <AppSkeleton />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default observer(AuthProvider);
