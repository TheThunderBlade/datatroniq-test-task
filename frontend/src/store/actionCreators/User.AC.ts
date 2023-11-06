import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { IAuth } from "../../interfaces/IAuth";
import { AxiosError } from "axios";
import { IUser } from "../../interfaces/IUser";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (payload: IAuth, thunkApi): Promise<string | undefined | unknown> => {
    try {
      const response = await api.post("/signUp", {
        email: payload.email,
        password: payload.password,
        userName: payload.userName,
      });

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

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload: IAuth, thunkApi): Promise<IUser | unknown> => {
    try {
      const response = await api.post("/signIn", {
        password: payload.password,
        userName: payload.userName,
      });
      localStorage.setItem("token", response.data.token);

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

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi): Promise<string | unknown> => {
    try {
      const response = await api.get("/logout");
      localStorage.removeItem("token");

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

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi): Promise<IUser | unknown> => {
    try {
      const response = await api.get("/refresh");
      localStorage.setItem("token", response.data.token);

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
