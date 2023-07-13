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
  // ... other stores go here
}

class RootStoreImpl implements RootStore {
  messageStore = new MessageStore();
  userStore = new UserStore();
  spacesStore = new SpacesStore();
  channelStore = new ChannelStore();
  notificationStore = new NotificationStore();
  modalStore = new ModalStore();
  sectionStore = new SectionStore();
  socketStore = new SocketStore();
  sidebarStore = new SidebarStore(this.channelStore, this.sectionStore);
  // ... other stores go here
}

export const stores = new RootStoreImpl();

export const storeContext = createContext<RootStore>(stores);

export const useStores = (): RootStore => useContext(storeContext);

export const useStore = <T extends keyof RootStore>(store: T): RootStore[T] =>
  useContext(storeContext)[store];
