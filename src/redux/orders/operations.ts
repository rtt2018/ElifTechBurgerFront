import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.ts";
import { AxiosError } from "axios";

export const getOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (reqParams, thunkAPI) => {
    const { patch, params } = reqParams;
    try {
      const response = await api.post(patch, params);
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
  },
);
