import { AppRoutes } from '@/routes';
import { AppProvider } from '@/providers/app';
import { StoreProvider } from '@/providers/store';
import { ThemeProvider } from '@/providers/theme';
import AuthProvider from '@/providers/auth';

import '@/styles/app.css';
import '@/styles/chatroom.css';

function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <ThemeProvider>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </ThemeProvider>
      </AuthProvider>
    </StoreProvider>
  );
}

export default App;
