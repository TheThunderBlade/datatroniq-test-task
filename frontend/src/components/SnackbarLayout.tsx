import { Box, Snackbar, Alert, AlertColor } from "@mui/material";
import React, { ReactNode, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { clearAlerts } from "../store/reducers/User.slice";

interface SnackbarLayoutProps {
  children: ReactNode;
}

const SnackbarLayout: React.FC<SnackbarLayoutProps> = ({ children }) => {
  const { error, message } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");

  useEffect(() => {
    if (error) {
      setSeverity("error");
      setIsOpen(true);
    }
    if (message) {
      setSeverity("success");
      setIsOpen(true);
    }
    setTimeout(() => {
      dispatch(clearAlerts());
      setIsOpen(false);
    }, 5000);
  }, [error, message]);

  return (
    <Box>
      {children}
      <Snackbar open={isOpen} onClose={() => setIsOpen(false)}>
        <Alert onClose={() => setIsOpen(false)} severity={severity}>
          {String(error || message)}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SnackbarLayout;
