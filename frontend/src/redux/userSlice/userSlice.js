import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    pending: false,
    error: false,
  },
  reducers: {
    registerStart: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    registerError: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginStart: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginError: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { addProduct } = auth.actions;
export default auth.reducer;
