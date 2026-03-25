import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/slice.ts";
import { burgersReducer } from "./burgers/slice.ts";
import { orderReducer } from "./order/slice.ts";
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
import storage from "redux-persist/lib/storage";
import { shopsReducer } from "./shops/slice.ts";
import { ordersListReducer } from "./orders/slice.ts";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import type { UserState } from "../types/burger.ts";

const authPersistConfig = {
  key: "user",
  storage,
  whitelist: ["email", "name"],
};

const cartPersistConfig = {
  key: "order",
  storage,
  // whitelist: ["cart, totalPrice"],
};

export const store = configureStore({
  reducer: {
    user: persistReducer<UserState>(authPersistConfig, userReducer),
    burgers: burgersReducer,
    order: persistReducer(cartPersistConfig, orderReducer),
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
