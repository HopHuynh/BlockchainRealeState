import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const chatBoxSlice = createSlice({
  name: "post",
  initialState: {
    room: null,
    receiverId: null,
    pending: false,
    error: false,
    isloading: false,
    message: "",
  },
  reducers: {
    createBox: (state, action) => {
      state.room = action.payload.data;
      state.message = "Successed";
    },
    createReceiver: (state, action) => {
      state.receiverId = action.payload;
    },
    updateReceiver: (state, action) => {
      state.receiverId = action.payload;
    },
  },
});

export const { createBox, createReceiver, updateReceiver } =
  chatBoxSlice.actions;
export default chatBoxSlice.reducer;
