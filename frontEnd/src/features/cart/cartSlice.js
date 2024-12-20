import { createSlice } from "@reduxjs/toolkit";

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
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.foodId !== action.payload
      );
    },
  },
});

export const { setCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
