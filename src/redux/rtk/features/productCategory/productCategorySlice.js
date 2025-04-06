import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  total: 0,
  category: null,
  error: "",
  loading: false,
};

const BASE_URL = `https://dev-api1.3xg.africa/api/categories?sectionId=2`;

export const loadAllProductCategory = createAsyncThunk(
  "productCategory/loadAllProductCategory",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response.data, "This is the category response");
      return successHandler(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

const productCategorySlice = createSlice({
  name: "productCategory",
  initialState,
  reducers: {
    clearCategory: (state) => {
      state.category = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAllProductCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllProductCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(loadAllProductCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default productCategorySlice.reducer;
export const { clearCategory } = productCategorySlice.actions;
