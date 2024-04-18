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
import Onboarding from '@/features/workspaces/components/Onboarding';

const UserRoutes = lazy(() => import('@/features/users/routes'));
const ChatroomRoutes = lazy(() => import('@/features/chatroom/routes'));
const ThreadRoutes = lazy(() => import('@/features/threads/routes'));

const App = observer(() => {
  const location = useLocation();
  const { currentUser } = useStore('userStore');
  // const { theme } = useStore('userPreferencesStore');
  const { workspaces, lastViewedWorkspace } = useStore('workspaceStore');
  const { setCurrentChannelUuid, subscribedChannels, findChannelByUuid } = useStore('channelStore');
  const history = useHistoryState();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // if (!workspaces.length || !lastViewedWorkspace) {
  //   return <Navigate to="/workspace-onboarding?section=workspace" replace />;
  // }

  // if (!theme) {
  //   return <Navigate to="/workspace-onboarding?section=theme" replace />;
  // }

  if (workspaces.length === 0 || !lastViewedWorkspace || lastViewedWorkspace?.isFirstLogin) {
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
    if (
      history &&
      history[history.length - 1]?.nodeId &&
      findChannelByUuid(history[history.length - 1]?.nodeId)
    ) {
      setCurrentChannelUuid(history[history.length - 1]?.nodeId);
    } else {
      const defaultChannel = subscribedChannels.find((channel) => channel.isDefault);

      setCurrentChannelUuid(defaultChannel?.uuid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribedChannels]);

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

// const OnboardingNav = observer(() => {
//   const { currentUser } = useStore('userStore');
//   const { workspaces, lastViewedWorkspace } = useStore('workspaceStore');
//   const { theme } = useStore('userPreferencesStore');

//   if (!currentUser) {
//     return <Navigate to="/login" replace />;
//   }

//   if (workspaces.length && theme && !lastViewedWorkspace.firstLogin) {
//     return <Navigate to="/app/nodemap" replace />;
//   }

//   if (!theme) {
//     return <Navigate to="/workspace-onboarding?section=theme" replace />;
//   }

//   if (lastViewedWorkspace?.isFirstLogin) {
//     return <Navigate to="/workspace-onboarding?section=workspace" replace />;
//   }

//   return <Onboarding />;
// });

export const protectedRoutes = [
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
      { path: 'home/*', element: <OverviewRoutes /> },
      { path: 'flashcards/*', element: <FlashcardRoutes /> },
      { path: 'threads/*', element: <ThreadRoutes /> },
      { path: ':channelId/*', element: <ChatroomRoutes /> },
      { path: '*', element: <Navigate to={navigateToLastPage()} /> },
    ],
  },
  // {
  //   path: '/onboarding',
  //   element: <OnboardingNav />,
  // },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    path: '*',
    element: <Navigate to={navigateToLastPage()} />,
  },
];
