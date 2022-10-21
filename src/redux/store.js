import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { productSlice } from "./product/productSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      product: productSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
