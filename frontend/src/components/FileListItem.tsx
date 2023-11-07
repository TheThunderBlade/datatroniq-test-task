import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { IFileList } from "../interfaces/IFileList";
import { useNavigate } from "react-router-dom";

interface FileListItemProps {
  file: IFileList;
}

const FileListItem: React.FC<FileListItemProps> = ({ file }) => {
  const navigate = useNavigate();
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
        <Button
          variant="contained"
          onClick={() => navigate(`/file/${file.id}`)}
        >
          Show file
        </Button>
      </Box>
    </Card>
  );
};

export default FileListItem;
