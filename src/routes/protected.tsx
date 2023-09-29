import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import MainLayout from '@/components/layout/MainLayout';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { navigateToLastPage } from '@/utils/navigateToLastPage';
import { ErrorBoundary } from 'react-error-boundary';
import ContentErrorFallback from '@/components/ErrorFallback/ContentErrorFallback';

import { init } from 'emoji-mart';

const Home = lazy(() => import('@/components/layout/Home'));
const UserRoutes = lazy(() => import('@/features/users/routes'));
const ChannelRoutes = lazy(() => import('@/features/channels/routes'));
const MentionRoutes = lazy(() => import('@/features/mentions/routes'));
const DraftRoutes = lazy(() => import('@/features/drafts/routes'));
const ChatroomRoutes = lazy(() => import('@/features/chatroom/routes'));
const ThreadRoutes = lazy(() => import('@/features/threads/routes'));

const App = observer(() => {
  const location = useLocation();
  const { currentUser } = useStore('userStore');

  if (!currentUser) {
    return <Navigate to="/login" replace />;
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

  return (
    <MainLayout>
      <Suspense>
        <ErrorBoundary FallbackComponent={ContentErrorFallback} key={location.pathname}>
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </MainLayout>
  );
});

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'users/*', element: <UserRoutes /> },
      { path: 'channels/*', element: <ChannelRoutes /> },
      { path: 'mentions/*', element: <MentionRoutes /> },
      { path: 'drafts/*', element: <DraftRoutes /> },
      { path: 'threads/*', element: <ThreadRoutes /> },
      { path: ':channelId/*', element: <ChatroomRoutes /> },
      { path: '*', element: <Navigate to={navigateToLastPage()} /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to={navigateToLastPage()} replace />,
  },
];
