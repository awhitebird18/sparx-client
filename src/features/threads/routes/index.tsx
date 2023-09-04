import { Navigate, Route, Routes } from 'react-router-dom';

import Threads from '../components/Threads';

const ThreadRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Threads />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

export default ThreadRoutes;
