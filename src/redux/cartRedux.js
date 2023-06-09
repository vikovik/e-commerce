import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    qty: 0,
    totalPrice: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.qty += 1;
      state.products.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.qty;
    },
    clearCart: (state) => {
      state.products = [];
      state.qty = 0;
      state.totalPrice = 0;
    },
    increaseQty: (state, action) => {
      state.qty += 1;
      state.totalPrice += action.payload.price;
    },
    decreaseQty: (state, action) => {
      state.qty -= 1;
      state.totalPrice -= action.payload.price;
    },
  },
});

export const {
  addProduct,
  clearCart,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;
export default cartSlice.reducer;
