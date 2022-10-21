import { createSlice, createSelector } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const taxCalculate = (total) => {
  return (total * 10) / 100;
};

const generalTotalCalculate = (price) => {
  return price + taxCalculate(price);
};

export const productSlice = createSlice({
  name: "product",
  initialState: {
    data: {},
    basket: {
      products: {},
      total: 0,
      taxes: 0,
      generalTotal: 0,
      currency: "TL",
    },
  },

  reducers: {
    setProductData(state, action) {
      state.data = action.payload;
    },
    setBasketData(state, action) {
      const item = action.payload;

      if (!state.basket.products[item.id]) {
        state.basket.products[item.id] = action.payload;
      } else {
        delete state.basket.products[item.id];
      }

      state.basket.total += item.price;

      state.basket.taxes += taxCalculate(item.price);

      state.basket.generalTotal += generalTotalCalculate(item.price);
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.product,
      };
    },
  },
});

export const { setBasketData } = productSlice.actions;

export const product = (state) => state.product.data;
export const basketData = (state) => state.product.basket;

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3100/api/products/");
    const result = await response.json();
    const toObject = Object.assign({}, result);

    dispatch(productSlice.actions.setProductData(toObject));
  } catch (error) {
    console.log(error);
  }
};

export const productsData = createSelector(product, (data) =>
  Object.values(data)
);
