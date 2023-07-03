import { useContext, createContext } from 'react';

import { MessageStore } from '@/features/messages/stores/messageStore';
import { UserStore } from '@/features/users/stores/userStore';
import { SpacesStore } from '@/features/spaces/stores/spacesStore';

export const stores = Object.freeze({
  messageStore: new MessageStore(),
  userStore: new UserStore(),
  spacesStore: new SpacesStore(),
});

export const storeContext = createContext(stores);

export const useStores = () => useContext(storeContext);

export const useStore = <T extends keyof typeof stores>(store: T): (typeof stores)[T] =>
  useContext(storeContext)[store];
