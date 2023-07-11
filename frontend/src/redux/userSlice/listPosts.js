import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import authHeader from "../../services/auth.header";

const listPostSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    pending: false,
    error: false,
    isloading: false,
    message: "",
  },
  reducers: {
    getlistpost: (state, action) => {
      state.posts = action.payload.data.title;
      state.message = "Successed";
    },
  },
});

export const { getlistpost } = listPostSlice.actions;
export default listPostSlice.reducer;
