import type { RootState } from "../store";

export const getOrdersSelector = (state: RootState) => state.orders.orders;
export const getIsLoading = (state: RootState) => state.orders.isLoading;
export const getIsError = (state: RootState) => state.orders.isError;
export const getIsSendRequest = (state: RootState) =>
  state.orders.isSendRequest;
export const getUser = (state: RootState) => state.user.user;
