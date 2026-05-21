import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../src/redux/features/products/productSlice";
import cartReducer from "../../src/redux/features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});