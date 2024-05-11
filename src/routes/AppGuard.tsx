import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

const AppGuard = observer(({ children }: Props) => {
  const { currentUser } = useStore('userStore');
  const { workspaces, lastViewedWorkspace } = useStore('workspaceStore');

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (workspaces.length === 0 || !lastViewedWorkspace || lastViewedWorkspace?.isFirstLogin) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
});

export default AppGuard;
