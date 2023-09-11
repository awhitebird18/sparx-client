import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';

import Login from '@/features/auth/components/Login';
import Register from '@/features/auth/components/Register';
import VerificationSuccess from '@/features/auth/components/VerificationSuccess';
import ForgotPassword from '@/features/auth/components/ForgotPassword';
import ChangePassword from '@/features/auth/components/ChangePassword';

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
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'change-password', element: <ChangePassword /> },
      { path: 'verification-success', element: <VerificationSuccess /> },
      { path: '*', element: <Navigate to="/login" /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/auth/login" replace />,
  },
];
