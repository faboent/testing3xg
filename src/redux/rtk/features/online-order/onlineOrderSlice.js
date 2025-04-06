import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import config from "../../../../config/config";

const initialState = {
  list: [],
  order: null,
  loading: false,
  error: null,
};

const BASE_URL = `${config.apiBaseUrl}/api/v1/merchants/orders`;




export const loadOnlineOrder = createAsyncThunk(
  "order/loadOnlineOrder",
  async (orderStatus = 'all', thunkAPI) => {
    const token = localStorage.getItem("access-token");
    try {
      const url = orderStatus === 'all'
        ? BASE_URL
        : `${BASE_URL}?orderStatus=${orderStatus}`;

      const response = await axios.get(url, {
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




// Add new thunk for IMEI update
export const updateOrderItemImei = createAsyncThunk(
  "order/updateOrderItemImei",
  async ({ orderItemId, imeiNumber }, thunkAPI) => {
    const token = localStorage.getItem("access-token");
    try {
      const response = await axios.patch(
        `${BASE_URL}/items/${orderItemId}/add-imei`,
        { imeiNumber },
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

const onlineOrderSlice = createSlice({
  name: "onlineOrder",
  initialState,
  reducers: {
    clearOrderList: (state) => {
      state.list = [];
    },
    clearOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOnlineOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadOnlineOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload?.data;
      })
      .addCase(loadOnlineOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderItemImei.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderItemImei.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update state if needed
      })
      .addCase(updateOrderItemImei.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderList, clearOrder } = onlineOrderSlice.actions;
export default onlineOrderSlice.reducer;
