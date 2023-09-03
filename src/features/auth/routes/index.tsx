import { Route, Routes } from 'react-router-dom';

import Login from '../components/Login';
import Register from '../components/Register';
import VerificationSuccess from '../components/VerificationSuccess';
import { observer } from 'mobx-react-lite';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="verification-success" element={<VerificationSuccess />} />
    </Routes>
  );
};

export default observer(AuthRoutes);
