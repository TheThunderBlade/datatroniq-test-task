import { createSlice, createAction } from "@reduxjs/toolkit";
import { IFileList } from "../../interfaces/IFileList";
import { getFileList } from "../actionCreators/FileList.AC";

interface IFileState {
  fileList: IFileList[];
  isLoading: boolean;
  message: null | string | undefined | unknown;
  error: null | string | unknown;
}

export const clearAlerts = createAction("user/clearAlerts");

const initialState: IFileState = {
  fileList: [],
  isLoading: false,
  message: null,
  error: null,
};

export const FileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(clearAlerts, (state) => {
      state.error = null;
      state.message = null;
    });

    builder
    .addCase(getFileList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getFileList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.fileList = action.payload as IFileList[];
    })
    .addCase(getFileList.rejected, (state, action) => {
      state.isLoading = false;
      state.message = "";
      state.error = action.payload;
    });
  },
});

export default FileSlice.reducer;
