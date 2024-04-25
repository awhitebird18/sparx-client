import { createContext } from 'react';
import { useContext } from 'react';
import { MessageStore } from '@/features/messages/stores/messageStore';
import { UserStore } from '@/features/users/stores/userStore';
import { UserPreferencesStore } from '@/features/preferences/stores/UserPreferencesStore';
import { ChannelStore } from '@/features/channels/stores/ChannelStore';
import { SectionStore } from '@/features/sections/stores/SectionStore';
import { NodemapStore } from '@/features/nodemap/stores/NodemapStore';
import { UserTypingStore } from '@/features/chatroom/stores/UserTypingStore';
import { ChannelUnreadStore } from '@/features/channels/stores/ChannelUnreadStore';
import { NotificationStore } from '@/stores/NotificationStore';
import { ModalStore } from '@/stores/ModalStore';
import { SocketStore } from '@/stores/SocketStore';
import { SidebarStore } from '@/stores/SidebarStore';
import { UserStatusStore } from '@/features/userStatus/stores/userStatusStore';
import { NotesStore } from '@/features/notes/stores/NotesStore';
import { FlashcardStore } from '@/features/flashcards/stores/FlashcardStore';
import { WorkspaceStore } from '@/features/workspaces/stores/workspaceStore';
import { SidePanelStore } from '@/layout/sidePanel/SidePanelStore';
import { MainPanelStore } from '@/layout/mainPanel/MainPanelStore';
import { ActivityStore } from '@/features/activity/stores/activityStore';
import { AssistantStore } from '@/features/assistant/stores/assistantStore';

interface RootStore {
  userStore: UserStore;
  userPreferencesStore: UserPreferencesStore;
  userTypingStore: UserTypingStore;
  channelStore: ChannelStore;
  channelUnreadStore: ChannelUnreadStore;
  nodemapStore: NodemapStore;
  messageStore: MessageStore;
  sectionStore: SectionStore;
  sidebarStore: SidebarStore;
  notificationStore: NotificationStore;
  modalStore: ModalStore;
  socketStore: SocketStore;
  userStatusStore: UserStatusStore;
  noteStore: NotesStore;
  flashcardStore: FlashcardStore;
  workspaceStore: WorkspaceStore;
  sidePanelStore: SidePanelStore;
  mainPanelStore: MainPanelStore;
  activityStore: ActivityStore;
  assistantStore: AssistantStore;
}

class RootStoreImpl implements RootStore {
  userStore = new UserStore();
  userPreferencesStore = new UserPreferencesStore();
  userTypingStore = new UserTypingStore();
  channelStore = new ChannelStore();
  channelUnreadStore = new ChannelUnreadStore();
  nodemapStore = new NodemapStore();
  messageStore = new MessageStore();
  sectionStore = new SectionStore();
  sidebarStore = new SidebarStore(this.channelStore, this.sectionStore);
  socketStore = new SocketStore();
  notificationStore = new NotificationStore();
  modalStore = new ModalStore();
  userStatusStore = new UserStatusStore();
  noteStore = new NotesStore();
  flashcardStore = new FlashcardStore();
  workspaceStore = new WorkspaceStore();
  sidePanelStore = new SidePanelStore();
  mainPanelStore = new MainPanelStore();
  activityStore = new ActivityStore();
  assistantStore = new AssistantStore();
}

export const stores = new RootStoreImpl();

export const storeContext = createContext<RootStore>(stores);

export const useStores = (): RootStore => useContext(storeContext);

export const useStore = <T extends keyof RootStore>(store: T): RootStore[T] =>
  useContext(storeContext)[store];
