import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/providers/auth';

import Logo from '@/components/logo/Logo';
import { Input } from '@/components/ui/Input';

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
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="p-8 shadow-lg rounded-2xl bg-card w-full max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
          <Logo size={20} />
          <h2 className="mt-6 text-center text-3xl font-extrabold">Sign in to your account</h2>
          <div className="flex items-center gap-1 text-sm mt-2">
            <p className="">or</p>
            <Link to="/auth/register" className="font-medium text-userLight">
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-userDark focus:ring-userDark border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm ">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-userLight">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-userMedium hover:bg-userDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-userDark"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
