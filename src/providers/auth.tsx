import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { LoginCredentials } from '@/features/auth';
import { login } from '@/features/auth/api/login';
import { verifyUser } from '@/features/auth/api/verifyUser';
import { RegistrationData } from '@/features/auth';
import { register } from '@/features/auth/api/register';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import AppSkeleton from '@/components/loaders/AppSkeleton';
import { User } from '@/features/users';
import { logout } from '@/features/auth/api/logout';
import { getUserChannels } from '@/features/channels/api/getUserChannels';

interface AuthContextData {
  currentUser: User | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  userLogin: (loginCredentials: LoginCredentials) => Promise<void>;
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { setSections } = useStore('sectionStore');
  const { setInitialPreferences } = useStore('userPreferencesStore');

  const { setSubscribedChannels, setChannelUnreads } = useStore('channelStore');
  const { setUsers } = useStore('userStore');
  const { connectToSocketServer } = useStore('socketStore');

  const [loading, setLoading] = useState(true);

  const userLogin = async (loginCredentials: LoginCredentials) => {
    try {
      await login(loginCredentials);

      verifyAndLoginUser();
    } catch (error) {
      console.error(error);
    }
  };

  const userLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      setCurrentUser(null);
    }
  };

  const registerUser = async (registrationData: RegistrationData) => {
    try {
      await register(registrationData);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyAndLoginUser = useCallback(async () => {
    try {
      const data = await verifyUser();

      const res = await getUserChannels();

      console.log(res);

      return;

      setChannelUnreads(data.channelUnreads);
      setInitialPreferences(data.userPreferences);
      setCurrentUser(data.user);
      setSections(data.sections);
      setSubscribedChannels(data.channels);
      setUsers(data.workspaceUsers);
      connectToSocketServer(data.user);

      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [
    connectToSocketServer,
    setInitialPreferences,
    setChannelUnreads,
    setSections,
    setSubscribedChannels,
    setUsers,
  ]);

  useEffect(() => {
    try {
      verifyAndLoginUser();
    } catch (err) {
      setCurrentUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    userLogin,
    userLogout,
    registerUser,
    loading,
  };

  if (loading) return <AppSkeleton />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default observer(AuthProvider);
