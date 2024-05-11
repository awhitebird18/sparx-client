import React from 'react';
import { observer } from 'mobx-react-lite';
import { AssistantStore } from '../stores/assistantStore';
import { AssistantStoreContext } from '../hooks/useAssistantStore';

type Props = {
  children: React.ReactNode;
};

export const AssistantStoreProvider: React.FC<Props> = observer(({ children }) => {
  const assistantStore = new AssistantStore();

  return (
    <AssistantStoreContext.Provider value={assistantStore}>
      {children}
    </AssistantStoreContext.Provider>
  );
});
