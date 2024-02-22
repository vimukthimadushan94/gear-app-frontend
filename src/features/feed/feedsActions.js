import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const getPosts = createAsyncThunk("auth/getPosts", async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + `api/posts/?page=1&limit=2`,
      config
    );

    return response.data;
  } catch (error) {
    // return custom error message from API if any
    console.log(error);
    throw new AxiosError();
  }
});
