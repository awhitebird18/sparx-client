import React, { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import authApi from '@/features/auth/api';

const ForgotPasswordForm: React.FC = () => {
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
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          className="mt-1"
          name="email"
          placeholder="Email"
          type="email"
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button type="submit" className="mt-4">
        Get a reset link
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
