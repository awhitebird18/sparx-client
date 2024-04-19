import { Navigate } from 'react-router-dom';
import { navigateToLastPage } from '@/utils/navigateToLastPage';
import NotesRoutes from '@/features/notes/routes';
import FlashcardRoutes from '@/features/flashcards/routes';
import Nodemap from '@/features/workspaceChannels/components/Nodemap';
import Search from '@/features/search/components/Search';
import Onboarding from '@/features/workspaces/components/Onboarding';
import { UserRoutes, ChatroomRoutes } from './lazyLoadComponents';
import App from './App';

const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '', element: <Navigate to="nodemap" /> },
      { path: 'members/*', element: <UserRoutes /> },
      { path: 'nodemap/*', element: <Nodemap /> },
      { path: 'user/*', element: <Nodemap /> },
      { path: 'notes/*', element: <NotesRoutes /> },
      { path: 'search/*', element: <Search /> },
      { path: 'flashcards/*', element: <FlashcardRoutes /> },
      { path: ':channelId/*', element: <ChatroomRoutes /> },
      { path: '*', element: <Navigate to={navigateToLastPage()} /> },
    ],
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    path: '*',
    element: <Navigate to={navigateToLastPage()} />,
  },
];

export default protectedRoutes;
