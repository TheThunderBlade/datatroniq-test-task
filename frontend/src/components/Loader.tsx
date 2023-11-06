import { Box, LinearProgress } from "@mui/material";
import React from "react";

const Loader: React.FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
};

export default Loader;
