import { AppRoutes } from '@/routes';
import { AppProvider } from '@/providers/app';
import { StoreProvider } from '@/providers/store';
import { ThemeProvider } from '@/providers/theme';
import AuthProvider from '@/providers/auth';
import NotificationController from './components/notifications/NotificationController';

function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <ThemeProvider>
          <AppProvider>
            <>
              <AppRoutes />
              <NotificationController />
            </>
          </AppProvider>
        </ThemeProvider>
      </AuthProvider>
    </StoreProvider>
  );
}

export default App;
