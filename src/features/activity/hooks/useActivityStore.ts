import { createContext, useContext } from 'react';
import { ActivityStore } from '../stores/activityStore';

export const ActivityStoreContext = createContext<ActivityStore | undefined>(undefined);

export const useActivityStore = (): ActivityStore => {
  const store = useContext(ActivityStoreContext);
  if (!store) throw new Error('useActivityStore must be used within a ActivityStoreProvider');
  return store;
};
