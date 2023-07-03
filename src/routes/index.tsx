import 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';

import { publicRoutes } from '@/routes/public';
import { protectedRoutes } from '@/routes/protected';
import { useAuth } from '@/providers/auth';
import { isUser } from '@/utils/isUser';

export const AppRoutes = () => {
  const { currentUser } = useAuth();
  const commonRoutes = [{ path: '', element: <Navigate to="/app" /> }];

  const routes = isUser(currentUser) ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
