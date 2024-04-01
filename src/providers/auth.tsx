import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { useStore } from '@/stores/RootStore';
import authApi from '@/features/auth/api';
import { LoginData, RegistrationData } from '@/features/auth/types';
import AppSkeleton from '@/components/loaders/AppSkeleton';
import { observer } from 'mobx-react-lite';

interface AuthContextData {
  userLogin: (loginCredentials: LoginData) => Promise<void>;
  userLogout: () => void;
  registerUser: (registrationData: RegistrationData) => Promise<any>;
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
  const { setUsers, setCurrentUserId } = useStore('userStore');
  const { connectToSocketServer } = useStore('socketStore');
  const { setUserStatuses } = useStore('userStatusStore');
  const { setWorkspaces, setUserWorkspaceData, currentWorkspaceId } = useStore('workspaceStore');
  const [loading, setLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [fadeClass, setFadeClass] = useState('fade-enter');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  useEffect(() => {
    if (!loading && animationComplete) {
      // Start with fade-enter class
      setFadeClass('fade-enter-active');

      // After a timeout, remove the AppSkeleton and show the main app
      const timeoutId = setTimeout(() => {
        setFadeClass('');
      }, 400); // Match the duration of your transition

      return () => clearTimeout(timeoutId);
    }
  }, [loading, animationComplete]);

  const userLogin = async (loginCredentials: LoginData) => {
    try {
      console.log('login');
      setIsLoginLoading(true);
      await authApi.login(loginCredentials);

      await verifyAndLoginUser();
    } catch (error) {
      console.error(error);
    }
  };

  const userLogout = async () => {
    try {
      await authApi.logout();

      setCurrentUserId(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  const registerUser = async (registrationData: RegistrationData): Promise<any> => {
    try {
      const user = await authApi.register(registrationData);

      return user;
    } catch (error) {
      console.error(error);
    }
  };

  const verifyAndLoginUser = useCallback(async () => {
    try {
      const data = await authApi.verify();

      setCurrentUserId(data.currentUser.uuid);

      // If user has not joined any workspaces this is currently neccessary.
      if (!data.workspaces) {
        setUsers([data.currentUser]);
        return;
      } else {
        setUsers(data.users);
      }

      connectToSocketServer(data.currentUser);
      setChannelUnreads(data.channelUnreads);
      setInitialPreferences(data.userPreferences);
      setSections(data.sections);
      setSubscribedChannels(data.channels);
      setUserStatuses(data?.userStatuses);
      setWorkspaces(data.workspaces);
      setUserWorkspaceData(data.userWorkspaces);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setAnimationComplete(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fn = async () => {
      try {
        await verifyAndLoginUser();
      } catch (error) {
        console.error(error);
      }
    };

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWorkspaceId]);

  const value = {
    userLogin,
    userLogout,
    registerUser,
    verifyAndLoginUser,
  };

  if (isLoginLoading) {
    return (
      <div>
        <AppSkeleton
          setAnimationComplete={setAnimationComplete}
          setIsLoginLoading={setIsLoginLoading}
        />
      </div>
    );
  }
  if (loading) {
    return <div />;
  }

  return (
    <div className={`${fadeClass} h-full`}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </div>
  );
};

export default observer(AuthProvider);
