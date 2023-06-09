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
      state.qty += action.payload.qty;
      state.products.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.qty;
    },
    clearCart: (state) => {
      state.products = [];
      state.qty = 0;
      state.totalPrice = 0;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const removedProduct = state.products.find(
        (product) => product._id === productId
      );
      if (removedProduct) {
        state.qty -= removedProduct.qty;
        state.totalPrice -= removedProduct.price * removedProduct.qty;
        state.products = state.products.filter(
          (product) => product._id !== productId
        );
      }
    },
  },
});

export const { addProduct, clearCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
