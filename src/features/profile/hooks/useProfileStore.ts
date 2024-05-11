import { createContext, useContext } from 'react';
import { ProfileStore } from '../stores/profileStore';

export const ProfileStoreContext = createContext<ProfileStore | undefined>(undefined);

export const useProfileStore = (): ProfileStore => {
  const store = useContext(ProfileStoreContext);
  if (!store) throw new Error('useProfileStore must be used within a ActivityStoreProvider');
  return store;
};
