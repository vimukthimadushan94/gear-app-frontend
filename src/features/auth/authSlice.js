import { createSlice } from "@reduxjs/toolkit";
import { getAuthUser, updateAvatar, userLogin } from "./authActions";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  errorMessage: null,
  loading: false,
  userInfo: null,
  userToken,
  avatarUrl: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.access_token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(updateAvatar.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.avatarUrl = action.payload.data.avatar;
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getAuthUser.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.avatarUrl =
          process.env.REACT_APP_BACKEND_URL + action.payload.avatar;
        state.userInfo = action.payload;
      })
      .addCase(getAuthUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.userInfo = false;
      });
  },
});

export default authSlice.reducer;
