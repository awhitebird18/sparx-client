import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';

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

type ChangePasswordFormProps = {
  onSubmit: (data: FormData) => Promise<void>;
};

const ChangePasswordForm = ({ onSubmit }: ChangePasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data: FormData) => {
    setIsLoading(true);
    await onSubmit(data);
    setIsLoading(false);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(submit)}>
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
        {errors.confirmPassword && <ErrorLabel>{errors.confirmPassword.message}</ErrorLabel>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-userMedium hover:bg-userDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-userDark"
      >
        Change password
      </button>
    </form>
  );
};

export default ChangePasswordForm;

const ErrorLabel = ({ children }: { children?: string }) => (
  <p className="absolute bottom-1.5 left-1 mt-1 text-red-500 text-xs">{children}</p>
);
