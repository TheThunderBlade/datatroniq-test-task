import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton, Paper } from "@mui/material";
import { useState } from "react";

const SignUpForm: React.FC = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <Paper elevation={2} sx={{ padding: 2 }}>
      <TextField
        required
        onChange={() => {}}
        label="UserName"
        placeholder="Enter your UserName"
        margin="normal"
        autoComplete="off"
        fullWidth
      />
      <TextField
        required
        onChange={() => {}}
        label="Email"
        placeholder="Enter your Email"
        margin="normal"
        autoComplete="off"
        fullWidth
      />
      <TextField
        required
        onChange={() => {}}
        type={showPass ? "text" : "password"}
        label="Password"
        placeholder="Enter your password"
        margin="normal"
        autoComplete="off"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPass(!showPass)}>
                {showPass ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
}

export default SignUpForm;
