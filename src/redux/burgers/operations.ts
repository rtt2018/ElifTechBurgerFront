import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GetBurgersParams, GetBurgersResponse } from "../../types/burger";
import api from "../../api/api";

export const getBurgers = createAsyncThunk<
  GetBurgersResponse,
  GetBurgersParams,
  { rejectValue: string }
>("burgers/getAllBurgers", async ({ patch, searchParams }, thunkAPI) => {
  try {
    const response = await api.get(patch, {
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
});
