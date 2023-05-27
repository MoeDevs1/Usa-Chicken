import { createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const { id, extras, quantity, price } = action.payload;
    
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === id && isEqual(product.extras, extras)
      );
    
      if (existingProductIndex !== -1) {
        // Product already exists in the cart
        state.products[existingProductIndex].quantity += quantity;
        state.total += price * quantity;
      } else {
        // Add new product to the cart
        state.products.push({
          id,
          extras,
          quantity,
          price,
        });
        state.quantity += quantity;
        state.total += price * quantity;
      }
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    deleteProduct: (state, action) => {
      const productIndex = action.payload;
    
      if (productIndex >= 0 && productIndex < state.products.length) {
        const deletedProduct = state.products[productIndex];
        state.products.splice(productIndex, 1);
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


}