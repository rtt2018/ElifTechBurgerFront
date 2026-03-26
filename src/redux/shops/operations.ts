import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { AxiosError } from "axios";

export const getShopsNames = createAsyncThunk(
  "shops/getShopsNames",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/shops", {});
      return response.data;
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
