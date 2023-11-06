import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ButtonGroup,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SignInForm from "./forms/SignIn";
import SignUpForm from "./forms/SignUp";
import { useAppDispatch } from "../../hooks/redux";
import { signIn, signUp } from "../../store/actionCreators/User.AC";
import { IAuth } from "../../interfaces/IAuth";

const Auth: React.FC = () => {
  const [authOption, setAuthOption] = useState("SignIn");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<IAuth>({
    userName: "",
    email: "",
    password: "",
  });

  const handleButtonGroup = (
    seterFunc: React.Dispatch<React.SetStateAction<void>>
  ) => {
    seterFunc();
    setUserData({
      userName: "",
      email: "",
      password: "",
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authOption === "SignUp") {
      dispatch(signUp(userData)).then((data) => {
        if (data.type !== "auth/signUp/rejected") {
          setAuthOption("SignIn");
          setUserData({
            userName: "",
            email: "",
            password: "",
          });
        }
      });
    } else if (authOption === "SignIn") {
      dispatch(signIn(userData)).then((data) => {
        if (data.type !== "auth/signIn/rejected") {
          navigate("/userFiles");
        }
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={2}
        direction={"column"}
        justifyContent="center"
        alignItems="center"
        minHeight={"100vh"}
      >
        <Grid item>
          <ButtonGroup fullWidth>
            <Button
              color={"info"}
              onClick={() => handleButtonGroup(() => setAuthOption("SignIn"))}
              variant={authOption === "SignIn" ? "outlined" : "contained"}
            >
              SignIn
            </Button>
            <Button
              color={"info"}
              onClick={() => handleButtonGroup(() => setAuthOption("SignUp"))}
              variant={authOption === "SignUp" ? "outlined" : "contained"}
            >
              SignUp
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <Typography textAlign={"center"} variant={"h4"}>
            {authOption}
          </Typography>
          {authOption === "SignIn" ? (
            <SignInForm setUserData={setUserData} userData={userData} />
          ) : (
            <SignUpForm setUserData={setUserData} userData={userData} />
          )}
        </Grid>
        <Grid item>
          <Button
            onClick={(e) => onSubmit(e)}
            variant={"contained"}
            color={"success"}
          >
            {authOption}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Auth;
