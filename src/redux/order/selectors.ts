import type { RootState } from "../store";

export const getCart = (state: RootState) => state.order.cart;
export const getTotalPrice = (state: RootState) => state.order.totalPrice;
