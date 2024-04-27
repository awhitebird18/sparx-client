import { Navigate } from 'react-router-dom';
import { navigateToLastPage } from '@/utils/navigateToLastPage';
import Nodemap from '@/features/nodemap/components/Nodemap';
import Onboarding from '@/features/onboarding/components/Onboarding';
import App from './App';

const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '', element: <Nodemap /> },
      { path: '*', element: <Navigate to={navigateToLastPage()} /> },
    ],
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    path: '*',
    element: <Navigate to="/app" />,
  },
];

export default protectedRoutes;
