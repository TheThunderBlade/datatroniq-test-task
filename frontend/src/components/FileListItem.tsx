import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { IFileList } from "../interfaces/IFileList";

interface FileListItemProps {
  file: IFileList;
}

const FileListItem: React.FC<FileListItemProps> = ({ file }) => {
  return (
    <Card sx={{ marginBottom: "1rem" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {file.fileName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ID: {file.id}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Owner: {file.owner}
        </Typography>
      </CardContent>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button variant="contained">Show file</Button>
      </Box>
    </Card>
  );
};

export default FileListItem;
