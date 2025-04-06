import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";
import config from "../../../../config/config";

const initialState = {
  list: null,
  total: 0,
  brand: null,
  error: "",
  loading: false,
};

const BASE_URL = `${config.apiBaseUrl}/api/v1/merchants/brands`;

export const loadAllProductBrand = createAsyncThunk(
  "productBrand/loadAllProductBrand",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response.data, "This is the brand response");
      return successHandler(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

const productBrandSlice = createSlice({
  name: "productBrand",
  initialState,
  reducers: {
    clearBrand: (state) => {
      state.brand = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAllProductBrand.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllProductBrand.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload.data)) {
        state.list = action.payload.data;
      } else {
        state.list = action?.payload?.data?.getAllProductBrand;
        state.total = action?.payload?.data?.totalProductBrand;
      }
    });

    builder.addCase(loadAllProductBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default productBrandSlice.reducer;
export const { clearBrand } = productBrandSlice.actions;
