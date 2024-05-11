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

const sidePanelComponents = {
  users: () => <Users />,
  discussions: () => (
    <MessageStoreProvider>
      <UserTypingStoreProvider>
        <ChatRoom />
      </UserTypingStoreProvider>
    </MessageStoreProvider>
  ),
  flashcards: () => <Overview />,
  notes: () => <ViewNotes />,
  tasks: () => <TaskList />,
  activity: () => (
    <ActivityStoreProvider>
      <WorkspaceActivity />
    </ActivityStoreProvider>
  ),
  shortcutKeys: () => <ShortcutMenu />,
  assistant: () => (
    <AssistantStoreProvider>
      <Assistant />
    </AssistantStoreProvider>
  ),
  note: () => <NotesSidePanel />,
  stats: () => <StatsPanel />,
};

export type SidePanelComponent = keyof typeof sidePanelComponents;

export default sidePanelComponents;
