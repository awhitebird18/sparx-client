import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import Logo from '@/components/logo/Logo';
import { Input } from '@/components/ui/Input';

import authApi from '@/features/auth/api';
import { useAuth } from '@/providers/auth';

type FormData = {
  password: string;
  confirmPassword: string;
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

// Zod schema
const registrationSchema = z
  .object({
    password: z
      .string()
      .refine(
        (value) => passwordRegex.test(value),
        'Password must contain at least one lowercase, upper, and number.',
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  });

const ChangePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { verifyAndLoginUser } = useAuth();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const token = new URLSearchParams(window.location.search).get('token');
      if (!token) return;

      await authApi.changePassword(data.password, token);
    } catch (error) {
      setIsLoading(false);
    } finally {
      await verifyAndLoginUser();
      navigate('/');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="p-8 shadow-lg rounded-2xl bg-card w-full max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
          <Logo size={20} />
          <h2 className="mt-6 text-center text-3xl font-extrabold">Change your password</h2>
          <p className="mt-2 text-center font-light">Set yourself a new password below</p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="sm:rounded-lg">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <div className="mt-1">
                  <Input
                    {...register('password', { required: 'Password is required.' })}
                    type="password"
                    placeholder="Password"
                  />
                </div>
                {errors.password && <ErrorLabel>{errors.password.message}</ErrorLabel>}
              </div>

              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <Input
                    {...register('confirmPassword', { required: 'Confirm Password is required.' })}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
                {errors.confirmPassword && (
                  <ErrorLabel>{errors.confirmPassword.message}</ErrorLabel>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-userMedium hover:bg-userDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-userDark"
              >
                Change password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

const ErrorLabel = ({ children }: { children?: string }) => (
  <p className="absolute bottom-1.5 left-1 mt-1 text-red-500 text-xs">{children}</p>
);
