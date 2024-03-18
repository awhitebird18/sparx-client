import 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';

import { publicRoutes } from '@/routes/public';
import { protectedRoutes } from '@/routes/protected';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const AppRoutes = () => {
  const { currentUser } = useStore('userStore');
  const { workspaces } = useStore('workspaceStore');

  const commonRoutes = [{ path: '*', element: <Navigate to="/" /> }];

  const routes = currentUser && workspaces ? protectedRoutes : publicRoutes;

  return useRoutes([...routes, ...commonRoutes]);
};

export default observer(AppRoutes);
