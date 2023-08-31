import AppRoutes from '@/routes';
import { AppProvider } from '@/providers/app';
import { StoreProvider } from '@/providers/store';

import AuthProvider from '@/providers/auth';

import NotificationController from './components/notifications/NotificationController';

function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <AppProvider>
          <>
            <AppRoutes />
            <NotificationController />
          </>
        </AppProvider>
      </AuthProvider>
    </StoreProvider>
  );
}

export default App;
