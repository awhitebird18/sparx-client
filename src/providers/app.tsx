import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";

const ErrorFallback = () => {
  return (
    <div role="alert">
      <h2>Ooops, something went wrong </h2>
      <button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </button>
    </div>
  );
};

export type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense fallback={<div></div>}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <TooltipProvider>
          <Router>{children}</Router>
        </TooltipProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
