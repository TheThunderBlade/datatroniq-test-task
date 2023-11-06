import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getFileList } from "../../store/actionCreators/FileList.AC";
import LogoutButton from "../../components/LogoutButton";
import FileListItem from "../../components/FileListItem";
import Loader from "../../components/Loader";

const UserFiles: React.FC = () => {
  const { fileList, isLoading } = useAppSelector(
    (state) => state.fileListReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFileList());
  }, []);

  return (
    <Container sx={{ paddingTop: "5%" }}>
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
    </Container>
  );
};

export default UserFiles;
