import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import MainLayout from '@/components/layout/MainLayout';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { navigateToLastPage } from '@/utils/navigateToLastPage';
import { ErrorBoundary } from 'react-error-boundary';
import ContentErrorFallback from '@/components/ErrorFallback/ContentErrorFallback';
import { init } from 'emoji-mart';
import { handleApiError } from '@/utils/handleApiError';
import NotesRoutes from '@/features/notes/routes';
import FlashcardRoutes from '@/features/flashcards/routes';
import OverviewRoutes from '@/features/overview/routes';
import useHistoryState from '@/hooks/useHistoryState';
import Nodemap from '@/features/workspaceChannels/components/Nodemap';
import Profile from '@/features/profile/components/Profile';
import Search from '@/features/search/components/Search';
import CreateWorkspaceOnboarding from '@/features/workspaces/components/CreateWorkspaceOnboarding';

const Home = lazy(() => import('@/components/layout/Home'));
const UserRoutes = lazy(() => import('@/features/users/routes'));
const ChatroomRoutes = lazy(() => import('@/features/chatroom/routes'));
const ThreadRoutes = lazy(() => import('@/features/threads/routes'));

const App = observer(() => {
  const location = useLocation();
  const { currentUser } = useStore('userStore');
  const { workspaces } = useStore('workspaceStore');
  const { setCurrentChannelUuid } = useStore('channelStore');
  const history = useHistoryState();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser && !workspaces.length) {
    return <Navigate to="/onboarding" replace />;
  }

  // Initializes emojis
  useEffect(() => {
    import('@emoji-mart/data/sets/14/apple.json')
      .then(({ default: data }) => {
        init({ data });
      })
      .catch((error) => {
        console.error('Failed to load emoji data', error);
      });
  }, []);

  useEffect(() => {
    if (history && history[history.length - 1]?.nodeId) {
      setCurrentChannelUuid(history[history.length - 1]?.nodeId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense>
      <MainLayout>
        <ErrorBoundary
          FallbackComponent={ContentErrorFallback}
          key={location.pathname}
          onError={(error) => {
            handleApiError(error);
          }}
        >
          <Outlet />
        </ErrorBoundary>
      </MainLayout>
    </Suspense>
  );
});

const Onboarding = observer(() => {
  const { currentUser } = useStore('userStore');
  const { workspaces } = useStore('workspaceStore');

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser && workspaces.length) {
    return <Navigate to="/app" replace />;
  }

  return <CreateWorkspaceOnboarding />;
});

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'members/*', element: <UserRoutes /> },
      { path: 'nodemap/*', element: <Nodemap /> },
      { path: 'onboarding/*', element: <CreateWorkspaceOnboarding /> },
      { path: 'user/*', element: <Nodemap /> },
      { path: 'profile/:userId', element: <Profile /> },
      { path: 'notes/*', element: <NotesRoutes /> },
      { path: 'search/*', element: <Search /> },
      { path: 'home/*', element: <OverviewRoutes /> },
      { path: 'flashcards/*', element: <FlashcardRoutes /> },
      { path: 'threads/*', element: <ThreadRoutes /> },
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
    element: <Navigate to={navigateToLastPage()} replace />,
  },
];
