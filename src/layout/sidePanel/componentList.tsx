import { ActivityStoreProvider } from '@/features/activity/providers/activityStoreProvider';
import {
  Users,
  ChatRoom,
  Overview,
  ViewNotes,
  TaskList,
  WorkspaceActivity,
  ShortcutMenu,
  Assistant,
  NotesSidePanel,
  StatsPanel,
} from './lazyLoadComponents';
import { AssistantStoreProvider } from '@/features/assistant/providers/assistantStoreProvider';
import { UserTypingStoreProvider } from '@/features/chatroom/hooks/useChatroomStore';
import { MessageStoreProvider } from '@/features/messages/providers/messageStoreProvider';
import SuspenseWrapper from '@/components/SuspenseWrapper';

const sidePanelComponents = {
  users: () => (
    <SuspenseWrapper>
      <Users />
    </SuspenseWrapper>
  ),
  discussions: () => (
    <MessageStoreProvider>
      <UserTypingStoreProvider>
        <SuspenseWrapper>
          <ChatRoom />
        </SuspenseWrapper>
      </UserTypingStoreProvider>
    </MessageStoreProvider>
  ),
  flashcards: () => (
    <SuspenseWrapper>
      <Overview />
    </SuspenseWrapper>
  ),
  notes: () => (
    <SuspenseWrapper>
      <ViewNotes />
    </SuspenseWrapper>
  ),
  tasks: () => (
    <SuspenseWrapper>
      <TaskList />
    </SuspenseWrapper>
  ),
  activity: () => (
    <ActivityStoreProvider>
      <SuspenseWrapper>
        <WorkspaceActivity />
      </SuspenseWrapper>
    </ActivityStoreProvider>
  ),
  shortcutKeys: () => (
    <SuspenseWrapper>
      <ShortcutMenu />
    </SuspenseWrapper>
  ),
  assistant: () => (
    <AssistantStoreProvider>
      <SuspenseWrapper>
        <Assistant />
      </SuspenseWrapper>
    </AssistantStoreProvider>
  ),
  note: () => (
    <SuspenseWrapper>
      <NotesSidePanel />
    </SuspenseWrapper>
  ),
  stats: () => (
    <SuspenseWrapper>
      <StatsPanel />
    </SuspenseWrapper>
  ),
};

export type SidePanelComponent = keyof typeof sidePanelComponents;

export default sidePanelComponents;
