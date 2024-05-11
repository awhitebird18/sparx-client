import React from 'react';
import { observer } from 'mobx-react-lite';
import { MessageStore } from '../stores/messageStore';
import { MessageStoreContext } from '../hooks/useMessageStore';

type Props = {
  children: React.ReactNode;
};

export const MessageStoreProvider: React.FC<Props> = observer(({ children }) => {
  const messageStore = new MessageStore();

  return (
    <MessageStoreContext.Provider value={messageStore}>{children}</MessageStoreContext.Provider>
  );
});
