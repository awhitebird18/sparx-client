import 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';
import { publicRoutes } from '@/routes/public';
import protectedRoutes from '@/routes/protected';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import VerificationSuccessful from '@/features/auth/components/VerificationSuccessful';

const AppRoutes = observer(() => {
  const { currentUser } = useStore('userStore');

  const commonRoutes = [
    { path: '/verified', element: <VerificationSuccessful /> },
    { path: '*', element: <Navigate to="/" /> },
  ];

  const routes = currentUser ? protectedRoutes : publicRoutes;

  return useRoutes([...routes, ...commonRoutes]);
});

export default AppRoutes;
