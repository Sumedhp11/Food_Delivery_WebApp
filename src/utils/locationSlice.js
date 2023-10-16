import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    lat: null,
    long: null,
  },
  reducers: {
    addLat: (state, action) => {
      state.lat = action.payload;
    },
    addLong: (state, action) => {
      state.long = action.payload;
    },
  },
});

export const { addLat, addLong } = locationSlice.actions;

export default locationSlice.reducer;
