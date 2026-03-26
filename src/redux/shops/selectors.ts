import type { RootState } from "../store";

export const getShopsNameSelector = (state: RootState) => state.shops.shops;
export const getIsLoading = (state: RootState) => state.shops.isLoading;
