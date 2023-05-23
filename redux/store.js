import {configureStore} from "@reduxjs/toolkit";
import cartReducer, { loadCartFromLocalStorage, saveCartToLocalStorage } from './cartSlice.js';

const preloadedState = {
  cart: loadCartFromLocalStorage(),
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  saveCartToLocalStorage(state.cart);
});

export default store;