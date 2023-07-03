import { Navigate, Route, Routes } from "react-router-dom";

import Channels from "../components/Channels";

const ChannelRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Channels />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

export default ChannelRoutes;
