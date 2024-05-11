import React from 'react';
import { observer } from 'mobx-react-lite';
import { TaskStore } from '../stores/taskStore';
import { TaskStoreContext } from '../hooks/useTaskStore';

type Props = {
  children: React.ReactNode;
};

export const TaskStoreProvider: React.FC<Props> = observer(({ children }) => {
  const taskStore = new TaskStore();

  return <TaskStoreContext.Provider value={taskStore}>{children}</TaskStoreContext.Provider>;
});
