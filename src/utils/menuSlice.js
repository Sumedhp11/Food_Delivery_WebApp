import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    showRestaurantmenu: false,
    id: null,
  },
  reducers: {
    toggleShowResMenu: (state, action) => {
      state.showRestaurantmenu = true;
    },
    removeShowResMenu: (state, action) => {
      state.showRestaurantmenu = false;
    },
    getResId: (state, action) => {
      state.id = action.payload;
    },
    removeResId: (state, action) => {
      state.id = null;
    },
  },
});

export const { toggleShowResMenu, getResId, removeShowResMenu, removeResId } =
  menuSlice.actions;
export default menuSlice.reducer;
