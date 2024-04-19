import { lazy } from 'react';
const Users = lazy(() => import('@/features/users/components/Users'));
const ChatRoom = lazy(() => import('@/features/chatroom/components/Chatroom'));
const Overview = lazy(() => import('@/features/flashcards/components/Overview'));
const ViewNotes = lazy(() => import('@/features/notes/components/ViewNotes'));
const TaskList = lazy(() => import('@/features/tasks/components/TaskList'));
const WorkspaceActivity = lazy(() => import('@/features/activity/components/WorkspaceActivity'));
const ShortcutMenu = lazy(() => import('@/components/shortcutMenu/ShortcutMenu'));
const Assistant = lazy(() => import('@/features/assistant/components/Assistant'));
const NotesSidePanel = lazy(() => import('@/features/notes/components/NotesSidePanel'));
const StatsPanel = lazy(() => import('@/features/stats/components/StatsPanel'));

export {
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
};
