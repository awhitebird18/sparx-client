import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '../components/Login';
import Register from '../components/Register';
import { useAuth } from '@/providers/auth';

export const AuthRoutes = () => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/app" />;
  }

  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
};
