
import { createSlice } from "@reduxjs/toolkit";

const storedCart = localStorage.getItem("cart");
const initialState = storedCart
  ? JSON.parse(storedCart)
  : {
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ➕ ADD TO CART
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i._id === item._id
      );

      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          ...item,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
      state.totalAmount += item.price;
      localStorage.setItem("cart", JSON.stringify(state));
    },



    // ➖ DECREMENT
    decrement(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((i) => i._id === id);
      if (!existingItem) return;
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((i) => i._id !== id);
      } else {
        existingItem.quantity--;
      }
       localStorage.setItem("cart", JSON.stringify(state));
    },



    // ❌ REMOVE COMPLETELY
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((i) => i._id === id);

      if (!existingItem) return;

      state.totalQuantity -= existingItem.quantity;
      state.totalAmount -= existingItem.price * existingItem.quantity;

      state.items = state.items.filter((i) => i._id !== id);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // 🧹 CLEAR CART
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
       localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  decrement,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
