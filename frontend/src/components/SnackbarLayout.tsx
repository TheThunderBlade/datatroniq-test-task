import { Box, Snackbar, Alert, AlertColor } from "@mui/material";
import React, { ReactNode, useState, useEffect } from "react";
import { useAppSelector } from "../hooks/redux";

interface MyComponentProps {
  children: ReactNode;
}

const SnackbarLayout: React.FC<MyComponentProps> = ({ children }) => {
  const { error, message } = useAppSelector((state) => state.userReducer);
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
  }, [error, message]);

  return (
    <Box>
      {children}
      <Snackbar
        open={isOpen}
        autoHideDuration={4000}
        onClose={() => setIsOpen(false)}
      >
        <Alert severity={severity}>{String(error || message)}</Alert>
      </Snackbar>
    </Box>
  );
};

export default SnackbarLayout;
