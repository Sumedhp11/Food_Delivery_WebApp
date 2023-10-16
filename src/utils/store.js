import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../utils/locationSlice";
import userReducer from "./userSlice";
import collectionReducer from "./collectionSlice";
import itemReducer from "./itemSlice";
import menuReducer from "./menuSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
    collection: collectionReducer,
    item: itemReducer,
    menu: menuReducer,
    cart: cartReducer,
  },
});

export default store;
