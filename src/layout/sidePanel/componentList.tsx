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
import { Props as WorkspaceActivityProps } from '@/features/activity/components/WorkspaceActivity';

const sidePanelComponents = {
  users: () => <Users />,
  discussions: () => <ChatRoom />,
  flashcards: () => <Overview />,
  notes: () => <ViewNotes />,
  tasks: () => <TaskList />,
  activity: (props: WorkspaceActivityProps) => <WorkspaceActivity {...props} />,
  shortcutKeys: () => <ShortcutMenu />,
  assistant: () => <Assistant />,
  note: () => <NotesSidePanel />,
  stats: () => <StatsPanel />,
};

export type SidePanelComponent = keyof typeof sidePanelComponents;

export default sidePanelComponents;
