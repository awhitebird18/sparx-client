import React from 'react';
import { observer } from 'mobx-react-lite';
import { UserTypingStore } from '../stores/UserTypingStore';
import { UserTypingStoreContext } from './useUserTypingStore';

type Props = {
  children: React.ReactNode;
};

export const UserTypingStoreProvider: React.FC<Props> = observer(({ children }) => {
  const userTypingStore = new UserTypingStore();

  return (
    <UserTypingStoreContext.Provider value={userTypingStore}>
      {children}
    </UserTypingStoreContext.Provider>
  );
});
