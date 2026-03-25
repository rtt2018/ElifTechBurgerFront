import { createSlice } from "@reduxjs/toolkit";
import { getShopsNames } from "./operations";

const initialState = {
  shops: [],
  isLoading: false,
  isError: false,
};

const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getShopsNames.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getShopsNames.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getShopsNames.fulfilled, (state, actions) => {
        state.shops = actions.payload.data.shops;
        state.isLoading = false;
        state.isError = false;
      }),
});

export const shopsReducer = shopsSlice.reducer;
