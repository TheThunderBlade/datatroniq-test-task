import React from "react";
import { Box, Button, Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../store/actionCreators/User.AC";
import { useNavigate } from "react-router-dom";

const UserFiles: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  return (
    <Container>
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
      <p>{user.userName}</p>
      <p>{user?.token}</p>
    </Container>
  );
};

export default UserFiles;
