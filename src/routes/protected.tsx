import { Suspense, lazy } from 'react';

import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import MainLayout from '@/components/layout/MainLayout';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { navigateToLastPage } from '@/utils/navigateToLastPage';
import { ErrorBoundary } from 'react-error-boundary';
import Logo from '@/components/logo/Logo';
import { Button } from '@/components/ui/Button';

const UserRoutes = lazy(() => import('@/features/users/routes'));
const ChannelRoutes = lazy(() => import('@/features/channels/routes'));
const MentionRoutes = lazy(() => import('@/features/mentions/routes'));
const DraftRoutes = lazy(() => import('@/features/drafts/routes'));
const ChatroomRoutes = lazy(() => import('@/features/chatroom/routes'));
const ThreadRoutes = lazy(() => import('@/features/threads/routes'));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ContentErrorFallback({ error, resetErrorBoundary }: any) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <div className="flex flex-col items-center justify-center p-16 bg-background  space-y-4">
        <Logo size={16} />
        <h1 className="text-2xl font-semibold text-primary">Oops! An error occurred.</h1>
        <p className="text-muted">{error.message}</p>
        <Button
          onClick={() => {
            navigate(-1);
            resetErrorBoundary();
          }}
          variant="destructive"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}

const App = observer(() => {
  const location = useLocation();
  const { currentUser } = useStore('userStore');

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

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
