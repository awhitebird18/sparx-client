import { Navigate, Route, Routes } from "react-router-dom";

import Users from "../components/Users";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Users />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

export default UserRoutes;
