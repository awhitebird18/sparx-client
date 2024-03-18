import { Navigate, Route, Routes } from 'react-router-dom';

import Notes from '../components/MainPage';

const NotesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Notes />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

export default NotesRoutes;
