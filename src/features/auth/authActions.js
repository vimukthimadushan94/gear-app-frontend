import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `auth/login`,
        { email, password },
        config
      );

      // store user's token in local storage
      localStorage.setItem("userToken", response.data.access_token);
      return response.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "auth/avatarUpdate",
  async (url, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + `api/user/update-avatar`,
      { avatar: url },
      config
    );
    return response;
  }
);

export const getAuthUser = createAsyncThunk("auth/getAuthUser", async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "api/user/profile",
      config
    );

    return response.data;
  } catch (error) {
    // return custom error message from API if any
    console.log(error);
    throw new AxiosError();
  }
});
