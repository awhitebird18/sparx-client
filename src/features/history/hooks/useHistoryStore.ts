import { createContext, useContext } from 'react';
import { HistoryStore } from '../stores/historyStore';

export const HistoryStoreContext = createContext<HistoryStore | undefined>(undefined);

export const useHistoryStore = (): HistoryStore => {
  const store = useContext(HistoryStoreContext);
  if (!store) throw new Error('useHistoryStore must be used within a HistoryStoreProvider');
  return store;
};
