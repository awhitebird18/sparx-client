import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/providers/auth';

import { Input } from '@/components/ui/Input';
import Logo from '@/components/logo/Logo';

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

// Zod schema
const registrationSchema = z
  .object({
    email: z.string().nonempty('Email is required').email('Invalid email address.'),
    firstName: z
      .string()
      .nonempty('First Name is required')
      .min(1, 'First Name is too short.')
      .max(50, 'First Name is too long.'),
    lastName: z
      .string()
      .nonempty('Last Name is required')
      .min(1, 'Last Name is too short.')
      .max(50, 'Last Name is too long.'),
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

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
  });
  const { registerUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      await registerUser(data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="p-8 shadow-lg rounded-2xl bg-card w-full max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
          <Logo size={20} />
          <h2 className="mt-6 text-center text-3xl font-extrabold">Register for an account</h2>
          <div className="flex items-center gap-1 text-sm mt-2">
            <p className="">Already have an account?</p>
            <Link to="/auth/login" className="font-medium text-userLight">
              Login here
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <div className="mt-8">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative pb-6">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email address
                </label>
                <div className="mt-1">
                  <Input
                    {...register('email', { required: 'Email is required.' })}
                    type="email"
                    placeholder="Email address"
                  />
                </div>
                {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
              </div>

              <div className="relative pb-6">
                <label htmlFor="firstName" className="block text-sm font-medium">
                  First Name
                </label>
                <div className="mt-1">
                  <Input
                    {...register('firstName', { required: 'First Name is required.' })}
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                {errors.firstName && <ErrorLabel>{errors.firstName.message}</ErrorLabel>}
              </div>

              <div className="relative pb-6">
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
                </label>
                <div className="mt-1">
                  <Input
                    {...register('lastName', { required: 'Last Name is required.' })}
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
                {errors.lastName && <ErrorLabel>{errors.lastName.message}</ErrorLabel>}
              </div>

              <div className="relative pb-6">
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

              <div className="relative pb-6 mb-6">
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
                className="relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-userDark hover:bg-userDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-userDark"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

const ErrorLabel = ({ children }: { children?: string }) => (
  <p className="absolute bottom-1.5 left-1 mt-1 text-red-500 text-xs">{children}</p>
);
