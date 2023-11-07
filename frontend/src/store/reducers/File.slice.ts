import { createSlice, createAction } from "@reduxjs/toolkit";
import { deleteFileById, getFileById, uploadFile } from "../actionCreators/File.AC";

interface IFileState {
  file: string;
  isLoading: boolean;
  message: null | string | undefined | unknown;
  error: null | string | unknown;
}

export const clearAlerts = createAction("file/clearAlerts");

const initialState: IFileState = {
  file: '',
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
    .addCase(getFileById.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getFileById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.file = action.payload as string;
    })
    .addCase(getFileById.rejected, (state, action) => {
      state.isLoading = false;
      state.message = "";
      state.error = action.payload;
    });

    builder
    .addCase(deleteFileById.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteFileById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.message = action.payload;
    })
    .addCase(deleteFileById.rejected, (state, action) => {
      state.isLoading = false;
      state.message = "";
      state.error = action.payload;
    });

    builder
    .addCase(uploadFile.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(uploadFile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.message = action.payload;
    })
    .addCase(uploadFile.rejected, (state, action) => {
      state.isLoading = false;
      state.message = "";
      state.error = action.payload;
    });
  },
});

export default FileSlice.reducer;
