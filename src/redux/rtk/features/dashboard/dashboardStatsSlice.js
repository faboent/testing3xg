import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import config from "../../../../config/config";

const initialState = {
  stats: null,
  loading: false,
  error: null,
};

const BASE_URL = `${config.apiBaseUrl}/api/v1/merchants/dashboard/stats`;

export const loadDashboardStats = createAsyncThunk(
  "dashboard/loadDashboardStats",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("access-token");
    try {
      const response = await axios.get(BASE_URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      });

      return successHandler(response.data.data);
    } catch (error) {
      console.error('API Error:', error);
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

// Add this new thunk in dashboardStatsSlice.js
export const loadWalletBalance = createAsyncThunk(
  "dashboard/loadWalletBalance",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("access-token");
    try {
      const response = await axios.get(`${config.apiBaseUrl}/api/v1/wallets/balance`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      });

      return successHandler(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

const dashboardStatsSlice = createSlice({
  name: "dashboardStats",
  initialState,
  reducers: {
    clearStats: (state) => {
      state.stats = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload?.data;
      })
      .addCase(loadDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStats } = dashboardStatsSlice.actions;
export default dashboardStatsSlice.reducer;