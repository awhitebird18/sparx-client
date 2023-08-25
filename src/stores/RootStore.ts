import { createContext } from 'react';
import { useContext } from 'react';

import { MessageStore } from '@/features/messages/stores/messageStore';
import { UserStore } from '@/features/users/stores/userStore';
import { UserPreferencesStore } from '@/features/preferences/stores/UserPreferencesStore';
import { ChannelStore } from '@/features/channels/stores/ChannelStore';
import { SectionStore } from '@/features/sections/stores/SectionStore';
import { WorkspaceChannelStore } from '@/features/workspaceChannels/stores/WorkspaceChannelStore';
import { UserTypingStore } from '@/features/userTyping/stores/UserTypingStore';
import { ChannelUnreadStore } from '@/features/channels/stores/ChannelUnreadStore';

import { NotificationStore } from '@/stores/NotificationStore';
import { ModalStore } from '@/stores/ModalStore';
import { SocketStore } from '@/stores/SocketStore';
import { SidebarStore } from '@/stores/SidebarStore';

interface RootStore {
  userStore: UserStore;
  userPreferencesStore: UserPreferencesStore;
  userTypingStore: UserTypingStore;
  channelStore: ChannelStore;
  channelUnreadStore: ChannelUnreadStore;
  workspaceChannelStore: WorkspaceChannelStore;
  messageStore: MessageStore;
  sectionStore: SectionStore;
  sidebarStore: SidebarStore;
  notificationStore: NotificationStore;
  modalStore: ModalStore;
  socketStore: SocketStore;
}

class RootStoreImpl implements RootStore {
  userStore = new UserStore();
  userPreferencesStore = new UserPreferencesStore();
  userTypingStore = new UserTypingStore();
  channelStore = new ChannelStore();
  channelUnreadStore = new ChannelUnreadStore();
  workspaceChannelStore = new WorkspaceChannelStore();
  messageStore = new MessageStore();
  sectionStore = new SectionStore();
  sidebarStore = new SidebarStore(this.channelStore, this.sectionStore);
  socketStore = new SocketStore();
  notificationStore = new NotificationStore();
  modalStore = new ModalStore();
}

export const stores = new RootStoreImpl();

export const storeContext = createContext<RootStore>(stores);

export const useStores = (): RootStore => useContext(storeContext);

export const useStore = <T extends keyof RootStore>(store: T): RootStore[T] =>
  useContext(storeContext)[store];
