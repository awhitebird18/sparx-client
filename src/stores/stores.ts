import { useContext, createContext } from 'react';

import { MessageStore } from '@/features/messages/stores/messageStore';
import { UserStore } from '@/features/users/stores/userStore';
import { SpacesStore } from '@/features/spaces/stores/spacesStore';
import { ChannelStore } from '@/features/channels/stores/ChannelStore';
import { NotificationStore } from './NotificationStore';
import { ModalStore } from './ModalStore';
import { SectionStore } from '@/features/sections/stores/SectionStore';

export const stores = Object.freeze({
  messageStore: new MessageStore(),
  userStore: new UserStore(),
  spacesStore: new SpacesStore(),
  channelStore: new ChannelStore(),
  notificationStore: new NotificationStore(),
  modalStore: new ModalStore(),
  sectionStore: new SectionStore(),
});

export const storeContext = createContext(stores);

export const useStores = () => useContext(storeContext);

export const useStore = <T extends keyof typeof stores>(store: T): (typeof stores)[T] =>
  useContext(storeContext)[store];
