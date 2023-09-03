import 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';

import { publicRoutes } from '@/routes/public';
import { protectedRoutes } from '@/routes/protected';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import storage from '@/utils/storage';

const navigateToPath = () => {
  const savedHistory = storage.getNavigationHistory();
  const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];
  if (parsedHistory.length) {
    return `/app/${parsedHistory[parsedHistory.length - 1].primaryView}`;
  }

  return '/app';
};

const AppRoutes = () => {
  const { currentUser } = useStore('userStore');
  const commonRoutes = [{ path: '*', element: <Navigate to={navigateToPath()} /> }];

  const routes = currentUser ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};

export default observer(AppRoutes);
