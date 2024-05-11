import { createContext, useContext } from 'react';
import { TaskStore } from '../stores/taskStore';

export const TaskStoreContext = createContext<TaskStore | undefined>(undefined);

export const useTaskStore = (): TaskStore => {
  const store = useContext(TaskStoreContext);
  if (!store) throw new Error('useTaskStore must be used within a TaskStoreProvider');
  return store;
};
