import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "item",
  initialState: {
    isvegOnly: false,
  },
  reducers: {
    toggleVegOnly: (state, action) => {
      state.isvegOnly = !state.isvegOnly;
    },
  },
});

export const { toggleVegOnly } = itemSlice.actions;
export default itemSlice.reducer;
