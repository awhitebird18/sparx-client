import { FallbackProps } from 'react-error-boundary';
import Logo from '../logo/Logo';
import { Button } from '../ui/Button';

function AppErrorFallback({ error }: FallbackProps) {
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

export default AppErrorFallback;
