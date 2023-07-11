import 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';

import { publicRoutes } from '@/routes/public';
import { protectedRoutes } from '@/routes/protected';
import { useAuth } from '@/providers/auth';

export const AppRoutes = () => {
  const { currentUser } = useAuth();
  const commonRoutes = [
    { path: '*', element: <Navigate to={currentUser ? '/app' : 'auth/login'} /> },
  ];

  const routes = currentUser ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
