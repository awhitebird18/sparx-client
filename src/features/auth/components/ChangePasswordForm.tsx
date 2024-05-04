import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import PasswordInput from '@/components/ui/PasswordInput';
import { ChangePasswordData } from '../types/changePasswordData';
import { registrationSchema } from '@/features/auth/utils/changePasswordFormValidation';

export type Props = {
  onSubmit: (data: ChangePasswordData) => Promise<void>;
};

const ChangePasswordForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(registrationSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data: ChangePasswordData) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(submit)}>
      <PasswordField label="Password" error={errors.password?.message} {...register('password')} />
      <PasswordField
        label="Confirm Password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Button type="submit" disabled={isLoading} className="mt-4">
        Change password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;

interface PasswordFieldProps {
  label: string;
  error?: string;
  placeholder?: string;
  name?: string;
}

const PasswordField = ({ label, error, placeholder, ...rest }: PasswordFieldProps) => (
  <div className="relative">
    <label htmlFor={rest.name} className="block text-sm font-medium">
      {label}
    </label>
    <PasswordInput {...rest} placeholder={placeholder || label} />
    {error && <ErrorLabel>{error}</ErrorLabel>}
  </div>
);

const ErrorLabel = ({ children }: { children?: string }) => (
  <p className="absolute -bottom-5 left-1 mt-1 text-red-500 text-xs">{children}</p>
);
