import React, { useState } from "react";
import {
  ButtonGroup,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SignInForm from "./forms/SignIn";
import SignUpForm from "./forms/SignUp";

const Auth: React.FC = () => {
  const [authOption, setAuthOption] = useState("SignIn");

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
              onClick={() => setAuthOption("SignIn")}
              variant="contained"
            >
              SignIn
            </Button>
            <Button
              color={"info"}
              onClick={() => setAuthOption("SignUp")}
              variant="contained"
            >
              SignUp
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <Typography textAlign={"center"} variant={"h4"}>
            {authOption}
          </Typography>
          {authOption === "SignIn" ? <SignInForm /> : <SignUpForm />}
        </Grid>
        <Grid item>
          <Button variant={"contained"} color={"success"}>
            {authOption}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Auth;
