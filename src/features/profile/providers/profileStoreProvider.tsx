import React from 'react';
import { observer } from 'mobx-react-lite';
import { ProfileStore } from '../stores/profileStore';
import { ProfileStoreContext } from '../hooks/useProfileStore';

type Props = {
  children: React.ReactNode;
};

export const ProfileStoreProvider: React.FC<Props> = observer(({ children }) => {
  const profileStore = new ProfileStore();

  return (
    <ProfileStoreContext.Provider value={profileStore}>{children}</ProfileStoreContext.Provider>
  );
});
