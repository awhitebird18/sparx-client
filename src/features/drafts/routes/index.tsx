import { Navigate, Route, Routes } from "react-router-dom";

import Drafts from "../components/Drafts";

const DraftRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Drafts />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

export default DraftRoutes;
