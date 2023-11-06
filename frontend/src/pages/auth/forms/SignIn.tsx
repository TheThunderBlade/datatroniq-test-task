import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton, Paper } from "@mui/material";
import { useState } from "react";

import { IAuth } from "../../../interfaces/IAuth";

interface SignInFormProps {
  setUserData: React.Dispatch<React.SetStateAction<IAuth>>;
  userData: IAuth;
}

const SignInForm: React.FC<SignInFormProps> = ({ setUserData, userData }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <Paper elevation={2} sx={{ padding: 2 }}>
      <TextField
        required
        value={userData.userName}
        onChange={(e) =>
          setUserData((state: IAuth) => ({
            ...state,
            userName: e.target.value,
          }))
        }
        label="UserName"
        placeholder="Enter your UserName"
        margin="normal"
        fullWidth
      />
      <TextField
        required
        value={userData.password}
        onChange={(e) =>
          setUserData((state: IAuth) => ({
            ...state,
            password: e.target.value,
          }))
        }
        type={showPass ? "text" : "password"}
        label="Password"
        placeholder="Enter your password"
        margin="normal"
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
};

export default SignInForm;
