import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import PasswordInput from '@/components/ui/PasswordInput';
import { useAuth } from '@/providers/contexts/useAuth';
import { Label } from '@/components/ui/Label';

const LoginForm: React.FC = () => {
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
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <InputField id="email" label="Email" value={email} onChange={setEmail} autoFocus />
      <PasswordInputField id="password" label="Password" value={password} onChange={setPassword} />
      <Button type="submit" className="mt-4">
        Sign in
      </Button>
      <div className="flex items-center justify-end gap-2 text-sm">
        Forgot your password?
        <Link to="/forgot-password" className="font-medium text-primary">
          Get help signing in
        </Link>
      </div>
    </form>
  );
};

const InputField = ({
  id,
  label,
  value,
  onChange,
  autoFocus,
}: {
  id: string;
  label: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  autoFocus?: boolean;
}) => (
  <div className="space-y-1.5">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      name={id}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoFocus={autoFocus}
    />
  </div>
);

const PasswordInputField = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <div className="space-y-1.5">
    <Label htmlFor={id}>{label}</Label>
    <PasswordInput
      id={id}
      name={id}
      placeholder="Password"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default LoginForm;
