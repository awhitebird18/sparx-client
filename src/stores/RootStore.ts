import { MessageStore } from '@/features/messages/stores/messageStore';
import { UserStore } from '@/features/users/stores/userStore';
import { SpacesStore } from '@/features/spaces/stores/spacesStore';
import { ChannelStore } from '@/features/channels/stores/ChannelStore';
import { NotificationStore } from './NotificationStore';
import { ModalStore } from './ModalStore';
import { SectionStore } from '@/features/sections/stores/SectionStore';
import { SocketStore } from './SocketStore';
import { SidebarStore } from './SidebarStore';
import { createContext } from 'react';
import { useContext } from 'react';
import { UserPreferencesStore } from '@/features/preferences/stores/UserPreferencesStore';

interface RootStore {
  messageStore: MessageStore;
  userStore: UserStore;
  spacesStore: SpacesStore;
  channelStore: ChannelStore;
  notificationStore: NotificationStore;
  modalStore: ModalStore;
  sectionStore: SectionStore;
  socketStore: SocketStore;
  sidebarStore: SidebarStore;
  userPreferencesStore: UserPreferencesStore;
}

class RootStoreImpl implements RootStore {
  socketStore = new SocketStore();
  messageStore = new MessageStore();
  userStore = new UserStore();
  spacesStore = new SpacesStore();
  channelStore = new ChannelStore();
  notificationStore = new NotificationStore();
  modalStore = new ModalStore();
  sectionStore = new SectionStore();
  userPreferencesStore = new UserPreferencesStore();
  sidebarStore = new SidebarStore(this.channelStore, this.sectionStore);
}

export const stores = new RootStoreImpl();

export const storeContext = createContext<RootStore>(stores);

export const useStores = (): RootStore => useContext(storeContext);

export const useStore = <T extends keyof RootStore>(store: T): RootStore[T] =>
  useContext(storeContext)[store];
