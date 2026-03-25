import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://eliftechburger.onrender.com/";

export const getBurgers = createAsyncThunk(
  "burgers/getAllBurgers",
  async (
    { patch, searchParams }: { patch: string; searchParams: string },
    thunkAPI,
  ) => {
    try {
      const response = await axios.get(patch, {
        params: searchParams,
      });
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
