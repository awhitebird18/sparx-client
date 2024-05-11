import React, { useState, useEffect, ReactNode, useCallback } from 'react';
import { useStore } from '@/stores/RootStore';
import authApi from '@/features/auth/api';
import { LoginData, RegisterFormData } from '@/features/auth/types';
import AppSkeleton from '@/components/loaders/AppSkeleton';
import { observer } from 'mobx-react-lite';
import { AuthContextData } from './types/AuthContextData';
import { AuthContext } from './contexts/AuthContext';
import { isFullReturnValue } from '@/features/auth/api/verify';
import dayjs from 'dayjs';

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = observer(({ children }) => {
  const { setSections } = useStore('sectionStore');
  const { setInitialPreferences, resetPreferences } = useStore('userPreferencesStore');
  const { setSubscribedChannels, setUserChannelData } = useStore('channelStore');
  const { setChannelUnreads } = useStore('channelUnreadStore');
  const { setUsers, setCurrentUserId } = useStore('userStore');
  const { connectToSocketServer } = useStore('socketStore');
  const { setUserStatuses } = useStore('userStatusStore');
  const {
    setWorkspaces,
    setUserWorkspaceData,
    currentWorkspaceId,
    resetAll,
    removeTemporaryWorkspaceApi,
  } = useStore('workspaceStore');
  const [loading, setLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [fadeClass, setFadeClass] = useState('fade-enter');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  useEffect(() => {
    if (!loading && animationComplete) {
      setFadeClass('fade-enter-active');
      const timeoutId = setTimeout(() => {
        setFadeClass('');
      }, 400);

      return () => clearTimeout(timeoutId);
    }
  }, [loading, animationComplete]);

  const userLogin = async (loginCredentials: LoginData) => {
    try {
      await authApi.login(loginCredentials);
      await verifyAndLoginUser();
    } catch (error) {
      console.error(error);
    }
  };

  const removeLocalStorage = () => {
    localStorage.removeItem('navigationHistory');
    localStorage.removeItem('nodemapSettings');
    localStorage.removeItem('primaryColor');
    localStorage.removeItem('sidebarWidth');
    localStorage.removeItem('theme');
    localStorage.removeItem('emoji-mart.last');
    localStorage.removeItem('emoji-mart.frequently');
  };

  const userLogout = async () => {
    try {
      await removeTemporaryWorkspaceApi();
      removeLocalStorage();
      resetAll();
      resetPreferences();
      setCurrentUserId(undefined);
    } catch (error) {
      console.error(error);
    } finally {
      await authApi.logout();
    }
  };

  const registerUser: AuthContextData['registerUser'] = async (
    registrationData: RegisterFormData,
  ) => {
    try {
      const data = await authApi.register(registrationData);

      return data;
    } catch (error) {
      throw Error('Unable to register user');
    }
  };

  const registerAnonymous: AuthContextData['registerAnonymous'] = async () => {
    try {
      await authApi.registerAnonymous();
      await verifyAndLoginUser();
    } catch (error) {
      console.error(error);
    }
  };

  const verifyAndLoginUser = useCallback(async () => {
    try {
      setLoading(true);
      const data = await authApi.verify();

      // If no user exists, app will redirect to login
      if (!data.currentUser) {
        resetPreferences();
      }

      if (!isFullReturnValue(data)) {
        setCurrentUserId(data.currentUser.uuid);
        setUsers([data.currentUser]);
        resetPreferences();
        return;
      }

      // User exists
      const lastViewedWorkspace = data.userWorkspaces?.reduce((prev, curr) => {
        if (!prev) {
          return curr;
        }
        return dayjs(curr.lastViewed).isAfter(dayjs(prev.lastViewed)) ? curr : prev;
      });
      if (!lastViewedWorkspace) return;

      setWorkspaces(data.workspaces);
      setUserWorkspaceData(data.userWorkspaces);
      setCurrentUserId(data.currentUser.uuid);

      if (lastViewedWorkspace?.isFirstLogin) {
        setUsers([data.currentUser]);
        // setInitialPreferences(data.userPreferences);
      } else {
        setUsers(data.users);
        setInitialPreferences(data.userPreferences);
        setChannelUnreads(data.channelUnreads);
        setSections(data.sections);
        setSubscribedChannels(data.channels);
        setUserChannelData(data.channelSubscriptions);
        setUserStatuses(data.userStatuses);
        connectToSocketServer(data.currentUser);
      }
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
    registerAnonymous,
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
});
