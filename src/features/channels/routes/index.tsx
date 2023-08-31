import { Navigate, Route, Routes } from 'react-router-dom';

import WorkspaceChannels from '@/features/workspaceChannels/components/WorkspaceChannels';

const ChannelRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<WorkspaceChannels />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

export default ChannelRoutes;
