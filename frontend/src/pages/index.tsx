import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./auth/Auth";
import SnackbarLayout from "../components/SnackbarLayout";
import UserFiles from "./userFiles/UserFiles";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { refresh } from "../store/actionCreators/User.AC";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(refresh()).then((data) => {
        if (data.type !== "auth/refresh/rejected") {
          navigate("/userFiles");
        }
      });
    }
  }, []);

  return (
    <SnackbarLayout>
      <Routes>
        <Route path="/" element={<Auth />} />
        {user?.token ? (
          <Route path="/userFiles" element={<UserFiles />} />
        ) : null}
        <Route path="*" element={<Navigate replace to={"/"} />} />
      </Routes>
    </SnackbarLayout>
  );
};

export default Index;
