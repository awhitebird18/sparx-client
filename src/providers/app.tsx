import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';

import '@/styles/app.css';
import '@/styles/chatroom.css';
import '@/styles/index.css';
import 'react-resizable/css/styles.css';

import { TooltipProvider } from '@/components/ui/Tooltip';
import { StoreProvider } from './store';
import AuthProvider from '@/providers/auth';
import NotificationController from '@/components/notifications/NotificationController';
import Logo from '@/components/logo/Logo';
import { Button } from '@/components/ui/Button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ErrorFallback({ error }: any) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-zinc-950">
      <div className="flex flex-col items-center justify-center p-16 bg-background border border-card rounded-2xl shadow space-y-4">
        <Logo size={16} />
        <h1 className="text-2xl font-semibold text-primary">Oops! An error occurred.</h1>
        <p className="text-muted">{error.message}</p>
        <Button onClick={() => window.location.assign('/app')} variant="destructive">
          Go Home
        </Button>
      </div>
    </div>
  );
}

export type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <StoreProvider>
          <AuthProvider>
            <NotificationController />
            <TooltipProvider>
              <Router>{children}</Router>
            </TooltipProvider>
          </AuthProvider>
        </StoreProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
