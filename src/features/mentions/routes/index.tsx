import { Navigate, Route, Routes } from "react-router-dom";

import Mentions from "../components/Mentions";

const MentionRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Mentions />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

export default MentionRoutes;
