import { configureStore } from "@reduxjs/toolkit";
import categoryWidgetReducer from "./item";

const store = configureStore({
  reducer: {
    categories: categoryWidgetReducer,
  },
});

export default store;
