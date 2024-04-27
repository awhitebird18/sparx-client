import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { StoreProvider } from './store';
import { AuthProvider } from '@/providers/auth';
import NotificationController from '@/components/notifications/NotificationController';
import AppErrorFallback from '@/components/ErrorFallback/AppErrorFallback';
import '@/config/sentry.ts';
import '@/styles/app.css';
import '@/styles/chatroom.css';
import '@/styles/index.css';
import '@/styles/globals.css';

export type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense>
      <ErrorBoundary FallbackComponent={AppErrorFallback}>
        <StoreProvider>
          <AuthProvider>
            <TooltipProvider>
              <NotificationController />
              <Router>{children}</Router>
            </TooltipProvider>
          </AuthProvider>
        </StoreProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
