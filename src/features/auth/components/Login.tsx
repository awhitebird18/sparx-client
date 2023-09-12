import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/providers/auth';

import Logo from '@/components/logo/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import PasswordInput from '@/components/ui/PasswordInput';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userLogin } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await userLogin({ email, password });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-zinc-900">
      <div className="p-8 shadow-lg rounded-2xl bg-background w-full max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
          <Logo size={20} />
          <h2 className="mt-6 text-center text-3xl font-extrabold">Sign in to your account</h2>
          <div className="flex items-center gap-1 text-sm mt-2">
            <p className="">or</p>
            <Link to="/register" className="font-medium text-primary">
              register your free account
            </Link>
          </div>
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

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>

                <PasswordInput
                  id="password"
                  name="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="mt-4">
                Sign in
              </Button>

              <div className="flex items-center justify-end mb-6 gap-2 text-sm">
                Forgot your password?
                <Link to="/forgot-password" className="font-medium text-primary">
                  Get help signing in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
