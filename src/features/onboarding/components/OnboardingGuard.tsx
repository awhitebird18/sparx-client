import { useNavigate } from 'react-router-dom';
import { useStore } from '@/stores/RootStore';
import { ReactNode, useEffect } from 'react';

const OnboardingGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { currentUser } = useStore('userStore');
  const { lastViewedWorkspace } = useStore('workspaceStore');

  useEffect(() => {
    if (currentUser && lastViewedWorkspace && !lastViewedWorkspace.isFirstLogin) {
      navigate('/app');
    }
  }, [currentUser, lastViewedWorkspace, navigate]);

  return children;
};

export default OnboardingGuard;
