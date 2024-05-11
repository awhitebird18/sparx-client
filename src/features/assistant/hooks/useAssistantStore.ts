import { createContext, useContext } from 'react';
import { AssistantStore } from '../stores/assistantStore';

export const AssistantStoreContext = createContext<AssistantStore | undefined>(undefined);

export const useAssistantStore = (): AssistantStore => {
  const store = useContext(AssistantStoreContext);
  if (!store) throw new Error('useAssistantStore must be used within a ActivityStoreProvider');
  return store;
};
