import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';

import '@/config/sentry';

import { TooltipProvider } from '@/components/ui/Tooltip';
import { StoreProvider } from './store';
import AuthProvider from '@/providers/auth';
import NotificationController from '@/components/notifications/NotificationController';
import AppErrorFallback from '@/components/ErrorFallback/AppErrorFallback';

import '@/styles/app.css';
import '@/styles/chatroom.css';
import '@/styles/index.css';
import 'react-resizable/css/styles.css';

import data from '@emoji-mart/data/sets/14/apple.json';
import { init } from 'emoji-mart';

init({ data });

export type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense>
      <ErrorBoundary FallbackComponent={AppErrorFallback}>
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
