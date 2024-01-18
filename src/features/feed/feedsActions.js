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

    const response = await axios.get(`http://localhost:8080/api/posts`, config);

    return response.data;
  } catch (error) {
    // return custom error message from API if any
    console.log(error);
    throw new AxiosError();
  }
});
