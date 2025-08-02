import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_CONFIG from "../../config/api";

const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData) => {
    const response = await axios.post(
      `${API_CONFIG.BASE_URL}/api/auth/register`,
      formData
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData) => {
    const response = await axios.post(
      `${API_CONFIG.BASE_URL}/api/auth/login`,
      formData
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
