import { createSlice } from "@reduxjs/toolkit";
import type { Burger, OrderState } from "../../types/burger";
import { addOrder } from "./operations";

const initialState: OrderState = {
  cart: [],
  totalPrice: 0,
  status: "creating",
  createdAt: null,
  isLoading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addPositionToCart(state, action) {
      const { burger, amount }: { burger: Burger; amount: number } =
        action.payload;

      const existingItem = state.cart.find(
        (item) => item.burger._id === burger._id,
      );

      if (existingItem) {
        existingItem.amount += amount;
      } else {
        state.cart.push({ burger, amount });
      }
      state.totalPrice = state.cart.reduce((sum, item) => {
        return sum + Number(item.burger.price) * Number(item.amount);
      }, 0);

      state.createdAt = new Date().toISOString();
    },
    deletePosition(state, action) {
      state.cart = state.cart.filter(
        (pos) => pos.burger._id !== action.payload.burger._id,
      );
      state.totalPrice = state.cart.reduce(
        (sum, item) => sum + Number(item.burger.price) * Number(item.amount),
        0,
      );
      state.createdAt = new Date().toISOString();
    },
    clearCart(state) {
      state.cart = [];
      state.totalPrice = 0;
      state.createdAt = null;
    },
    upPositionCount(state, action) {
      state.cart = state.cart.map((item) =>
        item.burger._id === action.payload.burger._id
          ? { ...item, amount: Number(item.amount) + 1 }
          : item,
      );
      state.totalPrice = state.cart.reduce((sum, item) => {
        return sum + Number(item.burger.price) * Number(item.amount);
      }, 0);
    },
    downPositionCount(state, action) {
      state.cart = state.cart.map((item) =>
        item.burger._id === action.payload.burger._id
          ? {
              ...item,
              amount:
                Number(item.amount) > 1 ? Number(item.amount) - 1 : item.amount,
            }
          : item,
      );
      state.totalPrice = state.cart.reduce((sum, item) => {
        return sum + Number(item.burger.price) * Number(item.amount);
      }, 0);
    },
    setCartFromOrder(state, action) {
      state.cart = action.payload;
      state.totalPrice = state.cart.reduce((sum, item) => {
        return sum + Number(item.burger.price) * Number(item.amount);
      }, 0);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addOrder.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const orderReducer = orderSlice.reducer;

export const {
  addPositionToCart,
  clearCart,
  upPositionCount,
  downPositionCount,
  deletePosition,
  setCartFromOrder,
} = orderSlice.actions;
