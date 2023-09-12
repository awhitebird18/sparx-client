import { lazy } from 'react';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';

import Login from '@/features/auth/components/Login';

const Register = lazy(() => import('@/features/auth/components/Register'));
const ForgotPassword = lazy(() => import('@/features/auth/components/ForgotPassword'));
const ChangePassword = lazy(() => import('@/features/auth/components/ChangePassword'));

const Auth = observer(() => {
  const { currentUser } = useStore('userStore');

  if (currentUser) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
});

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
