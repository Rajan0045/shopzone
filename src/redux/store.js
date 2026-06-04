import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "../redux/features/products/productSlice";
import cartReducer from "../redux/features/cart/cartSlice";
import orderReducer from "../redux/features/order/orderSlice";
import storageImport from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
const storage =  storageImport.default || storageImport;

const persistConfig = {
  key: "root",
  storage,

  whitelist: [
    "cart",
    "orders",
  ],
};

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore( store);