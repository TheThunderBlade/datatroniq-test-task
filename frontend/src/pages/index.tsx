import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./auth/Auth";

const Index: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="*" element={<Navigate replace to={"/LangtonsAnt"} />} />
    </Routes>
  );
};

export default Index;
