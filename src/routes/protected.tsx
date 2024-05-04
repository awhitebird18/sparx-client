import { Navigate } from 'react-router-dom';
import { navigateToLastPage } from '@/utils/navigateToLastPage';
import Onboarding from '@/features/onboarding/components/Onboarding';
import App from './App';
import { OnboardingStoreProvider } from '@/features/onboarding/providers/onboardingStoreProvider';
import { NodemapStoreProvider } from '@/features/nodemap/providers/nodemapStoreProvider';
import OnboardingGuard from '@/features/onboarding/components/OnboardingGuard';
import AppGuard from './AppGuard';

const protectedRoutes = [
  {
    path: '/app',
    element: (
      <AppGuard>
        <App />
      </AppGuard>
    ),
    children: [
      {
        path: '',
        element: <NodemapStoreProvider />,
      },
      { path: '*', element: <Navigate to={navigateToLastPage()} /> },
    ],
  },
  {
    path: '/onboarding',
    element: (
      <OnboardingGuard>
        <OnboardingStoreProvider>
          <Onboarding />
        </OnboardingStoreProvider>
      </OnboardingGuard>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/app" />,
  },
];

export default protectedRoutes;
