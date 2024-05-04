import FormField from './RegisterFormField';
import { registrationSchema } from '../utils/registerFormValidation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData } from '../types/registerFormData';
import { useAuth } from '@/providers/contexts/useAuth';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import VerifyEmail from './VerifyEmail';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registrationSchema),
  });
  const { registerUser, verifyAndLoginUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userIdToBeVerified, setUserIdToBeVerified] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      const { userId } = await registerUser(data);
      setUserIdToBeVerified(userId);

      verifyAndLoginUser();
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (userIdToBeVerified) {
    return <VerifyEmail userId={userIdToBeVerified} />;
  }

  return (
    <form className="flex flex-col mt-8" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label="Email address"
        type="email"
        name="email"
        register={register}
        errors={errors}
      />
      <FormField
        label="First Name"
        type="text"
        name="firstName"
        register={register}
        errors={errors}
      />
      <FormField
        label="Last Name"
        type="text"
        name="lastName"
        register={register}
        errors={errors}
      />
      <FormField
        label="Password"
        type="password"
        name="password"
        register={register}
        errors={errors}
      />
      <FormField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        register={register}
        errors={errors}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};

export default RegisterForm;
