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
  const { setSections } = useStore('sectionStore');
  const { setInitialPreferences } = useStore('userPreferencesStore');

  const { setSubscribedChannels, setChannelUnreads } = useStore('channelStore');
  const { setUsers } = useStore('userStore');
  const { connectToSocketServer } = useStore('socketStore');

  const [loading, setLoading] = useState(true);

  const userLogin = async (loginCredentials: LoginCredentials) => {
    try {
      const res = await login(loginCredentials);
      const { access_token: token, refresh_token: refreshToken } = res;

      localStorage.setItem('auth', token);
      localStorage.setItem('refresh', refreshToken);

      verifyAndLoginUser();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    window.localStorage.removeItem('auth');
    window.localStorage.removeItem('refresh');
    setCurrentUser(null);
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

  const verifyAndLoginUser = useCallback(async () => {
    try {
      const data = await verifyUser();

      setChannelUnreads(data.channelUnreads);
      setInitialPreferences(data.userPreferences);
      setCurrentUser(data.user);
      setSections(data.sections);
      setSubscribedChannels(data.channels);
      setUsers(data.workspaceUsers);
      connectToSocketServer(data.user);

      setLoading(false);
    } catch (err) {
      window.localStorage.removeItem('auth');
      window.localStorage.removeItem('refresh');
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
    logout,
    registerUser,
    loading,
  };

  if (loading) return <AppSkeleton />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default observer(AuthProvider);
