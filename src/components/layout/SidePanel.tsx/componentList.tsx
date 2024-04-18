import Users from '@/features/users/components/Users';
import Chatroom from '@/features/chatroom/components/Chatroom';
import Overview from '@/features/flashcards/components/Overview';
import ViewNotes from '@/features/notes/components/ViewNotes';
import TaskList from '@/features/overview/components/TaskList';
import WorkspaceActivity from '@/features/overview/components/WorkspaceActivity';
import ShortcutMenu from '@/components/shortcutMenu/ShortcutMenu';
import Assistant from '@/features/Assistant/components/Assistant';
import Profile from '@/features/profile/components/Profile';
import NotesSidePanel from '@/features/notes/components/NotesSidePanel';
import StatsPanel from '@/features/stats/components/StatsPanel';
import FlashcardReviews from '@/features/flashcards/components/FlashcardReviews';

const sidePanelComponents = {
  users: (props: any) => <Users {...props} />,
  discussions: (props: any) => <Chatroom {...props} />,
  flashcards: (props: any) => <Overview {...props} />,
  notes: (props: any) => <ViewNotes {...props} />,
  tasks: (props: any) => <TaskList {...props} />,
  activity: (props: any) => <WorkspaceActivity {...props} />,
  shortcutKeys: (props: any) => <ShortcutMenu {...props} />,
  assistant: (props: any) => <Assistant {...props} />,
  note: (props: any) => <NotesSidePanel {...props} />,
  profile: (props: any) => <Profile {...props} />,
  stats: (props: any) => <StatsPanel {...props} />,
};

export type SidePanelComponent = keyof typeof sidePanelComponents;

export default sidePanelComponents;
