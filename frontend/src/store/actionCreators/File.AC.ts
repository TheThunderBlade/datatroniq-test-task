import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "../../api/api";

interface IUserIdPayload {
  id: number;
}

interface IUploadPayload {
  file: File | undefined;
}

export const getFileById = createAsyncThunk(
  "file/get",
  async (payload: IUserIdPayload, thunkApi): Promise<string | unknown> => {
    try {
      const response = await api.get(`/getFileData/${payload.id}`);

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

export const deleteFileById = createAsyncThunk(
  "file/delete",
  async (payload: IUserIdPayload, thunkApi): Promise<string | unknown> => {
    try {
      const response = await api.delete(`/deleteFile/${payload.id}`);

      return response.data.message;
    } catch (e) {
      let errorMessage = "Failed to do something exceptional";
      if (e instanceof AxiosError) {
        errorMessage = e.response?.data.message;
      }
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const uploadFile = createAsyncThunk(
  "file/upload",
  async (payload: IUploadPayload, thunkApi): Promise<string | unknown> => {
    try {
      const formData = new FormData();
      formData.append("file", payload.file as Blob);
      const response = await api.post("/upload", formData);

      return response.data.message;
    } catch (e) {
      let errorMessage = "Failed to do something exceptional";
      if (e instanceof AxiosError) {
        errorMessage = e.response?.data.message;
      }
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);
