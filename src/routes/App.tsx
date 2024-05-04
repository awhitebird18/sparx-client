import { Outlet, useLocation } from 'react-router-dom';
import MainLayout from '@/layout/mainLayout/MainLayout';
import { observer } from 'mobx-react-lite';
import { ErrorBoundary } from 'react-error-boundary';
import ContentErrorFallback from '@/components/ErrorFallback/ContentErrorFallback';
import { handleApiError } from '@/utils/handleApiError';
import useInitializeEmojis from '@/hooks/useInitializeEmojis';
import usePreventZoom from '@/hooks/usePreventZoom';

const App = observer(() => {
  const location = useLocation();
  useInitializeEmojis();
  usePreventZoom();

  return (
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
  );
});

export default App;
