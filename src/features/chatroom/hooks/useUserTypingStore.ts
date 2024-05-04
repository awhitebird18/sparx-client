import { createContext, useContext } from 'react';
import { UserTypingStore } from '../stores/UserTypingStore';

export const UserTypingStoreContext = createContext<UserTypingStore | undefined>(undefined);

export const useUserTypingStore = (): UserTypingStore => {
  const store = useContext(UserTypingStoreContext);
  if (!store) throw new Error('useUserTypingStore must be used within a UserTypingStoreProvider');
  return store;
};
