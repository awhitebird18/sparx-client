import { createContext, useContext } from 'react';
import { NodemapStore } from '../stores/NodemapStore';

export const NodemapStoreContext = createContext<NodemapStore | undefined>(undefined);

export const useNodemapStore = (): NodemapStore => {
  const store = useContext(NodemapStoreContext);
  if (!store) throw new Error('useNodemapStore must be used within a NodemapStoreProvider');
  return store;
};
