import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;

      const deletedProductIndex = state.products.findIndex(
        (product) => product._id === productId
  
        );

      if (deletedProductIndex !== -1) {
        const deletedProduct = state.products[deletedProductIndex];
        state.products.splice(deletedProductIndex, 1);
        state.quantity -= deletedProduct.quantity;
        state.total -= deletedProduct.price * deletedProduct.quantity;
      }
    },
  },
});

export const { addProduct, reset, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;

// Local storage integration
const localStorageKey = 'cart';

export const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem(localStorageKey, serializedCart);
  } catch (error) {
    // Handle error if unable to save to local storage
  }
};

export const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem(localStorageKey);
    if (serializedCart === null) {
      return undefined; // Return undefined if no data is found
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    // Handle error if unable to retrieve data from local storage
    return undefined;
  }
};