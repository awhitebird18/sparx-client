import { Navigate, Route, Routes } from 'react-router-dom';
import Overview from '../components/Overview';

const OverviewRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Overview />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

export default OverviewRoutes;
