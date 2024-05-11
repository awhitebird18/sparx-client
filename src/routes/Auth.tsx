import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

const Auth = observer(() => {
  return <Outlet />;
});

export default Auth;
