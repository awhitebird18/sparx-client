import { FallbackProps } from 'react-error-boundary';
import Logo from '../logo/Logo';
import { Button } from '../ui/Button';

function AppErrorFallback({ error }: FallbackProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-background">
      <div className="card flex flex-col items-center justify-center p-16 bg-card border border-border rounded-3xl shadow space-y-6">
        <Logo size={24} />
        <div className="space-y-2 flex flex-col items-center pb-4">
          <h1 className="text-2xl font-semibold text-rose-500">Oops! An error occurred.</h1>
          <p className="text-muted">{error.message}</p>
        </div>
        <Button
          onClick={() => window.location.assign('/app')}
          variant="destructive"
          className="bg-rose-300 border-rose-500 border rounded-lg"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default AppErrorFallback;
