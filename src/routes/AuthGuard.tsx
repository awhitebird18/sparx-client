import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

const AuthgGuard = observer(({ children }: Props) => {
  const { currentUser } = useStore('userStore');
  const { workspaces } = useStore('workspaceStore');

  if (currentUser && workspaces.length) {
    return <Navigate to="/app" replace />;
  }

  return children;
});

export default AuthgGuard;
