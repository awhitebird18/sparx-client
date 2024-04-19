import { Suspense, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import MainLayout from '@/layout/mainLayout/MainLayout';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { ErrorBoundary } from 'react-error-boundary';
import ContentErrorFallback from '@/components/ErrorFallback/ContentErrorFallback';
import { init } from 'emoji-mart';
import { handleApiError } from '@/utils/handleApiError';
import useHistoryState from '@/hooks/useHistoryState';

const App = observer(() => {
  const location = useLocation();
  const { currentUser } = useStore('userStore');
  const { workspaces, lastViewedWorkspace } = useStore('workspaceStore');
  const { setCurrentChannelUuid, subscribedChannels, findChannelByUuid } = useStore('channelStore');
  const history = useHistoryState();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (workspaces.length === 0 || !lastViewedWorkspace || lastViewedWorkspace?.isFirstLogin) {
    return <Navigate to="/onboarding" replace />;
  }

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

export default App;
