import type { RootState } from "../store";

export const getHits = (state: RootState) => state.burgers.hits;
export const getPage = (state: RootState) => state.burgers.page;
export const getPerPage = (state: RootState) => state.burgers.perPage;
export const getTotalPages = (state: RootState) => state.burgers.totalPages;
export const getHasPreviousPage = (state: RootState) =>
  state.burgers.hasPreviousPage;
export const getHasNextPage = (state: RootState) => state.burgers.hasNextPage;
export const getTotalItems = (state: RootState) => state.burgers.totalItems;
export const getSortBy = (state: RootState) => state.burgers.sortBy;
export const getSortOrder = (state: RootState) => state.burgers.sortOrder;
export const getIsLoading = (state: RootState) => state.burgers.isLoading;
export const getIsError = (state: RootState) => state.burgers.isError;
