import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/providers/auth';

import { Input } from '@/components/ui/Input';
import Logo from '@/components/logo/Logo';
import { Button } from '@/components/ui/Button';
import PasswordInput from '@/components/ui/PasswordInput';

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
    reset,
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
      reset();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-secondary dark:bg-popover">
      <div className="p-8 shadow-lg rounded-2xl bg-background w-full max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
          <Logo size={20} />
          <h2 className="mt-6 text-center text-3xl font-extrabold">Register for an account</h2>
          <div className="flex items-center gap-1 text-sm mt-2">
            <p className="">Already have an account?</p>
            <Link to="/login" className="font-medium text-primary">
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
                    autoFocus
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
                  <PasswordInput
                    {...register('password', { required: 'Password is required.' })}
                    placeholder="Password"
                  />
                </div>
                {errors.password && <ErrorLabel>{errors.password.message}</ErrorLabel>}
              </div>

              <div className="relative pb-6 mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <PasswordInput
                    {...register('confirmPassword', { required: 'Confirm Password is required.' })}
                    placeholder="Confirm Password"
                  />
                </div>
                {errors.confirmPassword && (
                  <ErrorLabel>{errors.confirmPassword.message}</ErrorLabel>
                )}
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
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
