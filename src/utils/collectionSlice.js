import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    showCollection: false,
    collectionname: null,
  },
  reducers: {
    toggleshow: (state) => {
      state.showCollection = true;
    },
    getCollectionname: (state, action) => {
      state.collectionname = action.payload;
    },
    removeShowCollection: (state, action) => {
      state.showCollection = false;
    },
  },
});
export const { toggleshow, getCollectionname, removeShowCollection } =
  collectionSlice.actions;

export default collectionSlice.reducer;
