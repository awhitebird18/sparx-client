import Logo from '@/components/logo/Logo';
import ForgotPasswordForm from './ForgotPasswordForm';
import { Link } from 'react-router-dom';
import { HouseFill } from 'react-bootstrap-icons';
import { LogoTextBanner } from '@/components/logo/LogoBanner';

const ForgotPassword: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background">
      <LogoTextBanner />
      <div className="card p-8 shadow-lg rounded-2xl bg-card w-full max-w-md border border-border">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
          <Logo size={28} />
          <h2 className="mt-6 text-center text-3xl font-extrabold">Reset your password</h2>
          <p className="mt-2 text-center font-light">
            To reset your password, enter the email address you use to sign in
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <ForgotPasswordForm />
          <div className="flex items-center justify-end gap-2 text-sm">
            <Link to="/login" className="font-medium text-primary flex gap-2 items-center">
              <HouseFill size={16} />
              Go back to login page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
