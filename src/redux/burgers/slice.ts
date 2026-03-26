import { createSlice } from "@reduxjs/toolkit";
import { getBurgers } from "./operations";
import type { BurgerState } from "../../types/burger";

const initialState: BurgerState = {
  hits: [],
  page: 1,
  perPage: 12,
  totalPages: 0,
  hasPreviousPage: false,
  hasNextPage: false,
  totalItems: 0,
  sortBy: null,
  sortOrder: null,
  isLoading: false,
  isError: false,
};

const burgersSlice = createSlice({
  name: "burgers",
  initialState,
  reducers: {
    setPaginationParams(state, action) {
      state.page = action.payload.page;
      state.perPage = action.payload.perPage;
    },
    setSortingParams(state, action) {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBurgers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getBurgers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getBurgers.fulfilled, (state, action) => {
        const {
          hits,
          page,
          perPage,
          totalPages,
          hasPreviousPage,
          hasNextPage,
          totalItems,
        } = action.payload;

        if (page > 1) {
          const map = new Map<string, (typeof hits)[number]>([
            ...state.hits.map(
              (item) => [item._id!, item] as [string, typeof item],
            ),
            ...hits.map((item) => [item._id!, item] as [string, typeof item]),
          ]);

          state.hits = Array.from(map.values());
        } else {
          state.hits = hits || [];
        }

        state.page = page;
        state.perPage = perPage;
        state.totalPages = totalPages;
        state.hasPreviousPage = hasPreviousPage;
        state.hasNextPage = hasNextPage;
        state.totalItems = totalItems;
        state.isLoading = false;
        state.isError = false;
      });
  },
});

export const burgersReducer = burgersSlice.reducer;
export const { setPaginationParams, setSortingParams } = burgersSlice.actions;
