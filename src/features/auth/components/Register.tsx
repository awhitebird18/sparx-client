import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/logo/Logo';
import { LogoTextBanner } from '@/components/logo/LogoBanner';
import RegisterForm from './RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="card min-h-screen flex flex-col justify-center items-center p-4 bg-background">
      <LogoTextBanner />
      <div className="p-8 shadow-lg rounded-2xl bg-card w-full max-w-md border border-border">
        <Header />
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;

const Header = () => (
  <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
    <Logo size={28} />
    <h2 className="mt-6 text-center text-3xl font-extrabold">Register for an account</h2>
    <div className="flex items-center gap-1 text-sm mt-2">
      <p className="">Already have an account?</p>
      <Link to="/login" className="font-medium text-primary">
        Login here
      </Link>
    </div>
  </div>
);
