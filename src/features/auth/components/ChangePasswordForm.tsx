import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import PasswordInput from '@/components/ui/PasswordInput';

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
      .min(1, 'Password is required.')
      .refine(
        (value) => passwordRegex.test(value),
        'Password must contain at least one lowercase, upper, and number.',
      ),
    confirmPassword: z.string().min(1, 'Confirm password is required.'),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  });

type ChangePasswordFormProps = {
  onSubmit: (data: FormData) => Promise<void>;
};

const ChangePasswordForm = ({ onSubmit }: ChangePasswordFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
    } catch (error) {
      console.error(error);
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(submit)}>
      <div className="relative">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>

        <PasswordInput {...register('password')} placeholder="Password" />
        {errors.password && <ErrorLabel>{errors.password.message}</ErrorLabel>}
      </div>

      <div className="relative">
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm Password
        </label>

        <PasswordInput {...register('confirmPassword')} placeholder="Confirm Password" />

        {errors.confirmPassword && <ErrorLabel>{errors.confirmPassword.message}</ErrorLabel>}
      </div>

      <Button type="submit" disabled={isLoading} className="mt-4">
        Change password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;

const ErrorLabel = ({ children }: { children?: string }) => (
  <p className="absolute -bottom-5 left-1 mt-1 text-red-500 text-xs">{children}</p>
);
