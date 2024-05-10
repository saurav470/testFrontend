import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { IProducts } from '../Types';

const initialState = {
  cart: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')!)
    : [],
  total: localStorage.getItem('total')
    ? JSON.parse(localStorage.getItem('total')!)
    : 0,
  totalItems: localStorage.getItem('totalItems')
    ? JSON.parse(localStorage.getItem('totalItems')!)
    : 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const index = state.cart.findIndex(
        (item: IProducts) => item.id === product.id,
      );

      if (index >= 0) {
        toast.error('only one product can be added at a time');
        return;
      }

      state.cart.push(product);

      state.totalItems++;
      state.total += product.price;

      localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('total', JSON.stringify(state.total));
      localStorage.setItem('totalItems', JSON.stringify(state.totalItems));

      toast.success('Product added to cart');
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const index = state.cart.findIndex(
        (item: IProducts) => item.id === productId,
      );

      if (index >= 0) {
        state.totalItems--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);
        // Update to localstorage
        localStorage.setItem('cart', JSON.stringify(state.cart));
        localStorage.setItem('total', JSON.stringify(state.total));
        localStorage.setItem('totalItems', JSON.stringify(state.totalItems));
        // show toast
        toast.success('product removed from cart');
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
      // Update to localstorage
      localStorage.removeItem('cart');
      localStorage.removeItem('total');
      localStorage.removeItem('totalItems');
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
