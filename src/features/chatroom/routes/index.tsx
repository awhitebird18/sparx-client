import { Navigate, Route, Routes } from 'react-router-dom';
import Chatroom from '../components/Chatroom';

const MentionRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Chatroom />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

export default MentionRoutes;
