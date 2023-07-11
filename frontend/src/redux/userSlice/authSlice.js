import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authService from "../../services/auth.service";
import baseApi from "../../Utils/Axios";

export const signin = createAsyncThunk("auth/signin", async (userData) => {
  const response = await baseApi.post("/signin", userData);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    pending: false,
    error: false,
    isloading: false,
    message: "",
    token: "",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      authService.logout();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.message = "loading";
        state.isloading = false;
        state.error = "sai tên đang nhập hoặc mật khẩu";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.message = "succeeded";
        console.log("action.payload.content", action.payload.content);
        state.user = action.payload.content;
        localStorage.setItem("user", JSON.stringify(action.payload.content));
        state.message = "";
        state.error = "";
      })
      .addCase(signin.rejected, (state, action) => {
        state.message = action.payload.content.message;
        state.error = "error";
        state.isloading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
