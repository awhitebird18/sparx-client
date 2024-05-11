import { lazy } from 'react';

const Register = lazy(() => import('@/features/auth/components/Register'));
const ForgotPassword = lazy(() => import('@/features/auth/components/ForgotPassword'));
const ChangePassword = lazy(() => import('@/features/auth/components/ChangePassword'));

export { Register, ForgotPassword, ChangePassword };
