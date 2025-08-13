import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./userSlice/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
