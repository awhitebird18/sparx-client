import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '../components/Login';
import Register from '../components/Register';
import VerificationSuccess from '../components/VerificationSuccess';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const AuthRoutes = () => {
  // const { currentUser } = useStore('userStore');

  // if (currentUser) {
  //   return <Navigate to="/app" />;
  // }

  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="verification-success" element={<VerificationSuccess />} />
      {/* <Route path="*" element={<Navigate to="login" replace />} /> */}
    </Routes>
  );
};

export default observer(AuthRoutes);
