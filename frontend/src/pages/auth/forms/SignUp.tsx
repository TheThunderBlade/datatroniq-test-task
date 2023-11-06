import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton, Paper } from "@mui/material";
import { useState } from "react";

import { IAuth } from "../../../interfaces/IAuth";

interface SignUpFormProps {
  setUserData: React.Dispatch<React.SetStateAction<IAuth>>;
  userData: IAuth;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ setUserData, userData }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <Paper elevation={2} sx={{ padding: 2 }}>
      <TextField
        required
        value={userData.userName}
        onChange={(e) =>
          setUserData((state: IAuth) => ({ ...state, userName: e.target.value }))
        }
        label="UserName"
        placeholder="Enter your UserName"
        margin="normal"
        autoComplete="off"
        fullWidth
      />
      <TextField
        required
        value={userData.email}
        onChange={(e) =>
          setUserData((state: IAuth) => ({ ...state, email: e.target.value }))
        }
        label="Email"
        placeholder="Enter your Email"
        margin="normal"
        autoComplete="off"
        fullWidth
      />
      <TextField
        required
        value={userData.password}
        onChange={(e) =>
          setUserData((state: IAuth) => ({ ...state, password: e.target.value }))
        }
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
};

export default SignUpForm;
