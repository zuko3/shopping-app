import { createReducer, createAction } from "@reduxjs/toolkit";

const addProduct = createAction("cart/addProduct", function (product) {
  return {
    payload: {
      name: product.name,
      id: product.id,
      price: parseInt(product.price),
      quantity: 1,
      totalPrice: parseInt(product.price),
    },
  };
});

const deleteProduct = createAction("cart/deleteProduct", function (id) {
  return {
    payload: { id },
  };
});

const incrementQuantity = createAction("cart/incrementQuantity", function (id) {
  return {
    payload: { id },
  };
});

const decrementQuantity = createAction("cart/decrementQuantity", function (id) {
  return {
    payload: { id },
  };
});

const deleteCart = createAction("cart/deleteCart");

const initialState = {
  cartLines: {},
};

//Flat updates as redux @redux/toolkit uses immerjs internally
export const cartLinesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addProduct, (state, action) => {
      state.cartLines[action.payload.id] = action.payload;
    })
    .addCase(incrementQuantity, (state, action) => {
      const id = parseInt(action.payload.id);
      state.cartLines[id].quantity = state.cartLines[id].quantity + 1;
      state.cartLines[id].totalPrice =
        state.cartLines[id].totalPrice + state.cartLines[id].price;
    })
    .addCase(decrementQuantity, (state, action) => {
      const id = parseInt(action.payload.id);
      if (state.cartLines[id].quantity === 1) {
        delete state.cartLines[id];
        return;
      }
      state.cartLines[id].quantity = state.cartLines[id].quantity - 1;
      state.cartLines[id].totalPrice =
        state.cartLines[id].totalPrice - state.cartLines[id].price;
    })
    .addCase(deleteProduct, (state, action) => {
      const id = parseInt(action.payload.id);
      delete state.cartLines[id];
    })
    .addCase(deleteCart, (state) => {
      state.cartLines = {};
    });
});

export {
  addProduct,
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
  deleteCart,
};
