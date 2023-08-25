import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from '@/providers/auth';

import Login from '../components/Login';
import Register from '../components/Register';
import VerificationSuccess from '../components/VerificationSuccess';

export const AuthRoutes = () => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/app" />;
  }

  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="verification-success" element={<VerificationSuccess />} />
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
};
