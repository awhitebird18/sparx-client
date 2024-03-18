import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import Logo from '@/components/logo/Logo';
import { Input } from '@/components/ui/Input';
import { HouseFill } from 'react-bootstrap-icons';

import authApi from '@/features/auth/api';
import { Button } from '@/components/ui/Button';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await authApi.resetPassword(email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background">
      <div className="flex gap-2 items-center absolute top-4 left-5">
        <span className="text-2xl font-bold">Navinotes</span>
      </div>
      <div className="p-8 shadow-lg rounded-2xl bg-card w-full max-w-md border border-border">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
          <Logo size={28} />
          <h2 className="mt-6 text-center text-3xl font-extrabold">Reset your password</h2>
          <p className="mt-2 text-center font-light">
            To reset your password, enter the email address you use to sign in
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="sm:rounded-lg">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" className="mt-4">
                Get a reset link
              </Button>

              <div className="flex items-center justify-end gap-2 text-sm">
                <Link to="/login" className="font-medium text-primary flex gap-2 items-center">
                  <HouseFill size={16} />
                  Go back to login page
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
