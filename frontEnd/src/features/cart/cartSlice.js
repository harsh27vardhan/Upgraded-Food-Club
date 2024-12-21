import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.foodId === item.foodId);
      if (!existingItem) {
        state.items.push({ ...item, quantity: 1 });
      } else {
        existingItem.quantity += 1;
      }
      const response = axios.post(
        `https://upgraded-food-club.onrender.com/cart/${localStorage.getItem(
          "_id"
        )}`,
        action.payload
      );
      console.log(response);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.foodId !== action.payload
      );
      const response = axios.delete(
        `https://upgraded-food-club.onrender.com/cart/${localStorage.getItem(
          "_id"
        )}/${action.payload}`
      );
      console.log(response);
    },
  },
});

export const { setCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
