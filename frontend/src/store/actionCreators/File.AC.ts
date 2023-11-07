import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "../../api/api";

interface IPayload {
    id: number
}

export const getFileById = createAsyncThunk(
    "file/get",
    async (payload: IPayload, thunkApi): Promise<string | unknown> => {
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