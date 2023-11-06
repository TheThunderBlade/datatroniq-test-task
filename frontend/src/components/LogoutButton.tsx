import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/actionCreators/User.AC";
import { useAppDispatch } from "../hooks/redux";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Box position={"fixed"} top={10} right={10}>
      <Button
        variant="contained"
        onClick={() =>
          dispatch(logout()).then((data) => {
            if (data.type !== "auth/logout/rejected") {
              navigate("/");
            }
          })
        }
      >
        Logout
      </Button>
    </Box>
  );
};

export default LogoutButton;
