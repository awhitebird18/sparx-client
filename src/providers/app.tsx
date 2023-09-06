import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';

import data from '@emoji-mart/data/sets/14/apple.json';
import { init } from 'emoji-mart';
import '@/styles/app.css';
import '@/styles/chatroom.css';
import '@/styles/index.css';
import 'react-resizable/css/styles.css';

import { TooltipProvider } from '@/components/ui/Tooltip';
import { StoreProvider } from './store';
import AuthProvider from '@/providers/auth';
import NotificationController from '@/components/notifications/NotificationController';

init({ data });

const ErrorFallback = () => {
  return (
    <div role="alert">
      <h2>Ooops, something went wrong </h2>
      <button onClick={() => window.location.assign(window.location.origin)}>Refresh</button>
    </div>
  );
};

export type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense>
      <ErrorBoundary fallback={<ErrorFallback />}>
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
