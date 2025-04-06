import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import config from "../../../../config/config";

const initialState = {
  stats: null,
  loading: false,
  error: null,
};

export const loadOrderStats = createAsyncThunk(
  "dashboard/loadOrderStats",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("access-token");
    try {
      const response = await axios.get(
        `${config.apiBaseUrl}/api/v1/merchants/dashboard/order-stats`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          withCredentials: true,
        }
      );
      return successHandler(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

const orderStatsSlice = createSlice({
  name: "orderStats",
  initialState,
  reducers: {
    clearOrderStats: (state) => {
      state.stats = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrderStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadOrderStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload?.data;
      })
      .addCase(loadOrderStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderStats } = orderStatsSlice.actions;
export default orderStatsSlice.reducer;