import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Login from '../components/Login';
import Register from '../components/Register';
import ForgotPassword from '../components/ForgotPassword';
import ChangePassword from '../components/ChangePassword';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="change-password" element={<ChangePassword />} />
    </Routes>
  );
};

export default observer(AuthRoutes);
