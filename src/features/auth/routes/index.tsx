import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '../components/Login';
import Register from '../components/Register';
import { isUser } from '@/utils/isUser';
import { useAuth } from '@/providers/auth';

export const AuthRoutes = () => {
  const { currentUser } = useAuth();

  if (isUser(currentUser)) {
    return <Navigate to="/app" />;
  }

  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
