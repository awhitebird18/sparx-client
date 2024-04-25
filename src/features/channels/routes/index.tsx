import { Navigate, Route, Routes } from 'react-router-dom';
import NodeMap from '@/features/nodemap/components/Nodemap';

const ChannelRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<NodeMap />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

export default ChannelRoutes;
