import Logo from '@/components/logo/Logo';
import ChangePasswordForm from './ChangePasswordForm';
import { useNavigate } from 'react-router-dom';
import authApi from '@/features/auth/api';
import { useAuth } from '@/providers/contexts/useAuth';
import { ChangePasswordData } from '../types/changePasswordData';
import { LogoTextBanner } from '@/components/logo/LogoBanner';

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const { verifyAndLoginUser } = useAuth();

  const onSubmit = async (data: ChangePasswordData) => {
    try {
      const token = new URLSearchParams(window.location.search).get('token');
      if (!token) return;

      await authApi.changePassword({ password: data.password, token });
      verifyAndLoginUser();
      navigate('/app');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background">
      <LogoTextBanner />
      <div className="card border border-border p-8 shadow-lg rounded-2xl bg-card w-full max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
          <Logo size={28} />
          <h2 className="mt-6 text-center text-3xl font-extrabold">Change your password</h2>
          <p className="mt-2 text-center font-light">Set yourself a new password below</p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg">
          <ChangePasswordForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
