import { Navigate } from 'react-router-dom';
import Login from '@/features/auth/components/Login';
import { ChangePassword, ForgotPassword, Register } from './lazyLoadComponents';
import Auth from './Auth';

export const publicRoutes = [
  {
    path: '/*',
    element: <Auth />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'change-password', element: <ChangePassword /> },
      { path: '*', element: <Navigate to="/login" /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/auth/login" replace />,
  },
];
