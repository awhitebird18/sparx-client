import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';

const Auth = observer(() => {
  const { currentUser } = useStore('userStore');
  const { workspaces } = useStore('workspaceStore');

  if (currentUser && workspaces.length) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
});

export default Auth;
