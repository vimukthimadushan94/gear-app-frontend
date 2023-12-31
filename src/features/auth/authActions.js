import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
        `http://localhost:8080/auth/login`,
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
      `http://localhost:8080/api/user/update-avatar`,
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
      `http://localhost:8080/api/user/profile`,
      config
    );
    return response;
  } catch (error) {
    // return custom error message from API if any
    console.log("error");
  }
});
