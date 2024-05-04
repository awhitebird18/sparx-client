import { createContext, useContext } from 'react';
import { MessageStore } from '../stores/messageStore';

export const MessageStoreContext = createContext<MessageStore | undefined>(undefined);

export const useMessageStore = (): MessageStore => {
  const store = useContext(MessageStoreContext);
  if (!store) throw new Error('useMessageStore must be used within a MessageStoreProvider');
  return store;
};
