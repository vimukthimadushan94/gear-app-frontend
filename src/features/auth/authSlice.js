import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action;
        state.userToken = action.access_token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action;
      });
  },
});

export default authSlice.reducer;
