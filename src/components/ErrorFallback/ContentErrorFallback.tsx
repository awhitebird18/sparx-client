import { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import Logo from '../logo/Logo';
import { Button } from '../ui/Button';

const ContentErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <div className="flex flex-col items-center justify-center p-16 bg-background space-y-2">
        <Logo size={20} />
        <h1 className="text-2xl font-semibold text-primary">Oops! An error occurred.</h1>
        <p className="text-muted">{error.message}</p>
        <Button
          onClick={() => {
            navigate(-1);
            resetErrorBoundary();
          }}
          variant="destructive"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ContentErrorFallback;
