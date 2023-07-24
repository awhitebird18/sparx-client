import 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';

import { publicRoutes } from '@/routes/public';
import { protectedRoutes } from '@/routes/protected';
import { useAuth } from '@/providers/auth';

const navigateToPath = () => {
  const savedHistory = localStorage.getItem('navigationHistory');
  const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];
  if (parsedHistory.length) {
    return parsedHistory[parsedHistory.length - 1].primaryView;
  }

  return '/app';
};

export const AppRoutes = () => {
  const { currentUser } = useAuth();
  const commonRoutes = [
    {
      path: '*',
      element: (
        <Navigate to={currentUser ? `/app/${navigateToPath()}` : 'auth/login'} replace={true} />
      ),
    },
  ];

  const routes = currentUser ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
