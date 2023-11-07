import { Modal, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { uploadFile } from "../store/actionCreators/File.AC";
import { getFileList } from "../store/actionCreators/FileList.AC";

interface UploadModalProps {
  setUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uploadModalOpen: boolean;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '90%',
  height: '50%',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
};

const UploadModal: React.FC<UploadModalProps> = ({
  uploadModalOpen,
  setUploadModalOpen,
}) => {
  const [file, setFile] = useState<File>();
  const dispatch = useAppDispatch();

  const fileSelectorHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const inputElement = e.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    setFile(selectedFile);
  };

  const uploadFileHandler = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(uploadFile({ file })).then((data) => {
      if (data.type !== "file/upload/rejected") {
        setUploadModalOpen(false);
        setFile(undefined);
        dispatch(getFileList());
      }
    });
  };

  return (
    <Modal
      open={uploadModalOpen}
      onClose={() => {
        setUploadModalOpen(false);
        setFile(undefined);
      }}
    >
      <Box sx={style}>
        <Box flexGrow={1} sx={{ color: "black" }}>
          <Typography variant="h5">Name: {file?.name}</Typography>
          <Typography variant="h5">Type: {file?.type}</Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-around"}>
          <Button
            variant="contained"
            color="secondary"
            component="label"
            sx={{ mr: 1 }}
          >
            Select xlsx
            <input
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              hidden
              onChange={fileSelectorHandler}
            />
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={!file}
            onClick={(e) => uploadFileHandler(e)}
          >
            Upload file
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadModal;
