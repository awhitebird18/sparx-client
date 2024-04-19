import { lazy } from 'react';
const UserRoutes = lazy(() => import('@/features/users/routes'));
const ChatroomRoutes = lazy(() => import('@/features/chatroom/routes'));
const Register = lazy(() => import('@/features/auth/components/Register'));
const ForgotPassword = lazy(() => import('@/features/auth/components/ForgotPassword'));
const ChangePassword = lazy(() => import('@/features/auth/components/ChangePassword'));

export { UserRoutes, ChatroomRoutes, Register, ForgotPassword, ChangePassword };
