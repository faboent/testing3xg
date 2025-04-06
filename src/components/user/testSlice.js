import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { createSlice } from "@reduxjs/toolkit";

export const addMerchant = createAsyncThunk(
  "form/addMerchant",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://merchant-api.3xg.africa/api/v1/auth/merchant/register",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to submit the form. Please try again."
      );
    }
  }
);

const merchantSlice = createSlice({
  name: "merchant",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearMerchant: (state) => {
      state.merchant = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMerchant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMerchant.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addMerchant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default merchantSlice.reducer;
export const { clearUser } = merchantSlice.actions;
