import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "../../types/burger";

const initialState: UserState = {
  user: { name: null, email: null, phone: null },
  isLoggedIn: false,
  isLoading: false,
  error: null,
  token: null,
  isRefreshing: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  // extraReducers: (builder) => builder.addCase({}),
});

export const userReducer = userSlice.reducer;
