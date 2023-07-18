import { AppRoutes } from '@/routes';
import { AppProvider } from '@/providers/app';
import { StoreProvider } from '@/providers/store';
import { ThemeProvider } from '@/providers/theme';
import AuthProvider from '@/providers/auth';
import data from '@emoji-mart/data/sets/14/apple.json';
import { init } from 'emoji-mart';
import '@/styles/app.css';
import '@/styles/chatroom.css';

init({ data });

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
