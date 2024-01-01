import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  errorMessage: null,
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
        state.errorMessage = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.access_token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export default authSlice.reducer;
