import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
    qty: 0,
  },
  reducers: {
    addProductList: (state, action) => {
      state.qty += action.payload.qty;
      state.products.push(action.payload);
    },
    clearWishlist: (state) => {
      state.products = [];
      state.qty = 0;
    },
    removeFromList: (state, action) => {
      const productId = action.payload;
      const removedProduct = state.products.find(
        (product) => product._id === productId
      );
      if (removedProduct) {
        state.qty -= removedProduct.qty;
        state.products = state.products.filter(
          (product) => product._id !== productId
        );
      }
    },
  },
});

export const { addProductList, clearWishlist, removeFromList } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
