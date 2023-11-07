import React, { useEffect, useState } from "react";
import { Box, Container, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getFileList } from "../../store/actionCreators/FileList.AC";
import LogoutButton from "../../components/LogoutButton";
import FileListItem from "../../components/FileListItem";
import Loader from "../../components/Loader";
import UploadModal from "../../components/UploadModal";

const UserFiles: React.FC = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { fileList, isLoading } = useAppSelector(
    (state) => state.fileListReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFileList());
  }, []);

  return (
    <Container sx={{ paddingTop: "5%" }}>
      <Box position={"fixed"} top={10} right={120}>
        <Button variant="contained" onClick={() => setUploadModalOpen(true)}>
          Open upload modal
        </Button>
      </Box>
      <LogoutButton />
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          {fileList.map((file) => (
            <FileListItem key={file.id} file={file} />
          ))}
        </Box>
      )}
      <UploadModal
        uploadModalOpen={uploadModalOpen}
        setUploadModalOpen={setUploadModalOpen}
      />
    </Container>
  );
};

export default UserFiles;
