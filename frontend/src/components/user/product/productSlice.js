import { createSlice } from "@reduxjs/toolkit";

const product = createSlice({
  name: "products",
  initialState: {
    product: [],
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = action.payload;
      state.product.push(newProduct);
    },
  },
});

export const { addProduct } = product.actions;
export default product.reducer;
