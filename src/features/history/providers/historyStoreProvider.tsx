import React from 'react';
import { observer } from 'mobx-react-lite';
import { HistoryStore } from '../stores/historyStore';
import { HistoryStoreContext } from '../hooks/useHistoryStore';

type Props = {
  children: React.ReactNode;
};

export const HistoryStoreProvider: React.FC<Props> = observer(({ children }) => {
  const historyStore = new HistoryStore();

  return (
    <HistoryStoreContext.Provider value={historyStore}>{children}</HistoryStoreContext.Provider>
  );
});
