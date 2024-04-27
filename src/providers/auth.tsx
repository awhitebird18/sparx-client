import React, { useState, useEffect, ReactNode, useCallback } from 'react';
import { useStore } from '@/stores/RootStore';
import authApi from '@/features/auth/api';
import { LoginData, RegistrationData } from '@/features/auth/types';
import AppSkeleton from '@/components/loaders/AppSkeleton';
import { observer } from 'mobx-react-lite';
import { AuthContextData } from './types/AuthContextData';
import { AuthContext } from './contexts/AuthContext';
import { PrimaryColors, Theme } from '@/features/preferences/enums';

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
    currentUserWorkspaceData,
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

  const userLogout = async () => {
    try {
      await authApi.logout();
      localStorage.removeItem('navigationHistory');
      localStorage.removeItem('primaryColor');
      localStorage.removeItem('sidebarWidth');
      localStorage.removeItem('theme');
      localStorage.removeItem('emoji-mart.last');
      localStorage.removeItem('emoji-mart.frequently');
      resetAll();
      resetPreferences();
      setCurrentUserId(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  const registerUser: AuthContextData['registerUser'] = async (
    registrationData: RegistrationData,
  ) => {
    try {
      const user = await authApi.register(registrationData);
      return user;
    } catch (error) {
      console.error(error);
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
      const data = await authApi.verify();

      setInitialPreferences({ primaryColor: PrimaryColors.PURPLE, theme: Theme.LIGHT });

      if (!data.currentUser) return;

      setUsers(data.users);
      setCurrentUserId(data.currentUser.uuid);

      if (!data.workspaces) return;
      setWorkspaces(data.workspaces);
      setUserWorkspaceData(data.userWorkspaces);

      if (currentUserWorkspaceData?.isFirstLogin) return;

      setInitialPreferences(data.userPreferences);
      connectToSocketServer(data.currentUser);
      setChannelUnreads(data.channelUnreads);
      setSections(data.sections);
      setSubscribedChannels(data.channels);
      setUserChannelData(data.channelSubscriptions);
      setUserStatuses(data?.userStatuses);
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
