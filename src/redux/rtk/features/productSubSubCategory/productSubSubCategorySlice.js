import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";

const initialState = {
  list: null,
  total: null,
  subSubCategory: null,
  error: "",
  loading: false,
};

const BASE_URL = `https://merchant-api.3xg.africa/api/v1/category/sub/sub-category`;

export const loadAllProductSubSubCategory = createAsyncThunk(
  "productSubSubCategory/loadAllProductSubCategory",
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

const productSubSubCategorySlice = createSlice({
  name: "productSubSubCategory",
  initialState,
  reducers: {
    clearSubSubCategory: (state) => {
      state.subSubCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAllProductSubSubCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllProductSubSubCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(loadAllProductSubSubCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default productSubSubCategorySlice.reducer;
export const { clearSubCategory } = productSubSubCategorySlice.actions;
