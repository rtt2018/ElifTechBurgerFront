import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "../user/slice";
import { setOrders } from "../orders/slice";
import api from "../../api/api";

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/order", data);

      const { user, orders } = res.data.data;

      dispatch(setUser(user));
      dispatch(setOrders(orders));

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
