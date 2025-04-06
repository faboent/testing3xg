import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  total: null,
  subCategory: null,
  error: "",
  loading: false,
};

const BASE_URL = `https://merchant-api.3xg.africa/api/v1/category/sub`;

export const loadAllProductSubCategory = createAsyncThunk(
  "productSubCategory/loadAllProductSubCategory",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      return successHandler(response.data.body);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

const productSubCategorySlice = createSlice({
  name: "productSubCategory",
  initialState,
  reducers: {
    clearSubCategory: (state) => {
      state.subCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAllProductSubCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllProductSubCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(loadAllProductSubCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default productSubCategorySlice.reducer;
export const { clearSubCategory } = productSubCategorySlice.actions;
