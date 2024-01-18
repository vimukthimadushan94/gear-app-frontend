import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "./feedsActions";

const initialState = {
  errorMessage: null,
  loading: false,
  posts: [],
};

const feedSlice = createSlice({
  name: "load-posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export default feedSlice.reducer;
