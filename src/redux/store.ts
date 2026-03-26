import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

import { userReducer } from "./user/slice";
import { burgersReducer } from "./burgers/slice";
import { orderReducer } from "./order/slice";
import { shopsReducer } from "./shops/slice";
import { ordersListReducer } from "./orders/slice";

import type { OrderState, UserState } from "../types/burger";

const createNoopStorage = () => ({
  getItem: (_key: string) => Promise.resolve(null),
  setItem: (_key: string, value: string) => Promise.resolve(value),
  removeItem: (_key: string) => Promise.resolve(),
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const authPersistConfig = {
  key: "burger-user",
  storage,
  whitelist: ["email", "name"],
};

const cartPersistConfig = {
  key: "burger-order",
  storage,
  whitelist: ["cart", "totalPrice"],
};

export const store = configureStore({
  reducer: {
    user: persistReducer<UserState>(authPersistConfig, userReducer),
    burgers: burgersReducer,
    order: persistReducer<OrderState>(cartPersistConfig, orderReducer),
    shops: shopsReducer,
    orders: ordersListReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
