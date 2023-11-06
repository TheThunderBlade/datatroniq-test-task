import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";
import { logout, refresh, signIn, signUp } from "../actionCreators/User.AC";

interface IUserState {
  user: IUser;
  isLoading: boolean;
  message: null | string | undefined | unknown;
  error: null | string | unknown;
}

const initialState: IUserState = {
  user: {
    userId: 0,
    userName: "",
    token: "",
  },
  isLoading: false,
  message: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.message = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.error = action.payload;
      });

    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload as IUser;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.error = action.payload;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.message = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.error = action.payload;
      });

    builder
      .addCase(refresh.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload as IUser;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
