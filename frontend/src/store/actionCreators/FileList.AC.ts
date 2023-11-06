import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "../../api/api";
import { IFileList } from "../../interfaces/IFileList";

export const getFileList = createAsyncThunk(
    "fileList/get",
    async (_, thunkApi): Promise<IFileList[] | unknown> => {
      try {
        const response = await api.get("/getFileList");

        return response.data;
      } catch (e) {
        let errorMessage = "Failed to do something exceptional";
        if (e instanceof AxiosError) {
          errorMessage = e.response?.data.message;
        }
        return thunkApi.rejectWithValue(errorMessage);
      }
    }
  );