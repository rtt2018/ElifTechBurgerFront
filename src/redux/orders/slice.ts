import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "./operations";
import type { OrdersState } from "../../types/burger";

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  isError: false,
  isSendRequest: false,
};

const ordersListSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addCreatedOrder(state, action) {
      state.orders.push(action.payload.order);
      // state.user = action.payload.user;
    },
    setIsSendRequest(state, action) {
      state.isSendRequest = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.orders = action.payload;
        // state.user = action.payload.user;
      });
  },
});

export const ordersListReducer = ordersListSlice.reducer;

export const { addCreatedOrder, setIsSendRequest, setOrders } =
  ordersListSlice.actions;
