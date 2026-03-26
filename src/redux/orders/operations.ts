import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.ts";
import { AxiosError } from "axios";
import type { Order, GetOrdersParams } from "../../types/burger.ts";

export const getOrders = createAsyncThunk<
  Order[],
  GetOrdersParams,
  { rejectValue: string }
>("orders/getAllOrders", async ({ patch, searchParams }, thunkAPI) => {
  try {
    const response = await api.post(patch, { params: searchParams });
    // console.log("🚀 ~ response:", response);
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }

    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    return thunkAPI.rejectWithValue("Unknown error");
  }
});
