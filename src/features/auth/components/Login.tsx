import { Link } from 'react-router-dom';
import { useAuth } from '@/providers/contexts/useAuth';
import Logo from '@/components/logo/Logo';
import { Button } from '@/components/ui/Button';
import LoginForm from './LoginForm';
import { LogoTextBanner } from '@/components/logo/LogoBanner';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background">
      <LogoTextBanner />
      <div className="card-base p-10 shadow-lg rounded-2xl w-full max-w-md relative">
        <Header />
        <LoginForm />
        <UtilityButtons />
      </div>
    </div>
  );
};

const Header = () => (
  <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center mb-8 sm:mx-auto sm:w-full sm:max-w-md">
    <Logo size={32} />
    <h2 className="mt-4 text-center text-3xl font-extrabold mb-2">Sign in to your account</h2>
    <div className="flex items-center gap-1 text-sm">
      <p className="">or</p>
      <Link
        to="/register"
        className="font-medium text-primary"
        aria-label="Register your free account"
      >
        register your free account
      </Link>
    </div>
  </div>
);

const UtilityButtons = () => {
  const { registerAnonymous } = useAuth();

  return (
    <Button className="absolute -top-4 -right-4 shadow-lg" onClick={registerAnonymous}>
      Start new workspace
    </Button>
  );
};

export default Login;
