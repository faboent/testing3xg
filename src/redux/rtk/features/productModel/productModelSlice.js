import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  total: 0,
  brand: null,
  error: "",
  loading: false,
};

// ADD_PRODUCT_MODEL
export const addProductModel = createAsyncThunk(
  "productModel/addProductModel",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product-model/`,
        data: {
          ...values,
        },
      });
      return successHandler(data, "product model added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// DELETE_PRODUCT_MODEL
export const deleteProductModel = createAsyncThunk(
  "productModel/DeleteProductModel",
  async (id) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product-model/${id}`,
        data: {
          status: "false",
        },
      });

      return successHandler(data, "Product model deleted successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// PRODUCT_BRAND_DETAILS
export const loadSingleProductModel = createAsyncThunk(
  "productModel/loadSingleProductModel",
  async (id) => {
    try {
      const { data } = await axios.get(`product-model/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// PRODUCT_BRANDS
export const loadAllProductModel = createAsyncThunk(
  "productModel/loadAllProductModel",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`product-model?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// PRODUCT_BRANDS
export const loadAllProductModelPublic = createAsyncThunk(
  "productModel/loadAllProductModelPublic",
  async () => {
    try {
      const { data } = await axios.get(`product-model/public`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
//UPDATE PRODUCT MODEL
export const updateProductModel = createAsyncThunk(
  "productModel/update",
  async ({ id, values }, { dispatch }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `/product-model/${id}`,
        data: {
          ...values,
        },
      });
      dispatch(loadSingleProductModel(id));
      return successHandler(data, data.message);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
const productModelSlice = createSlice({
  name: "productModel",
  initialState,
  reducers: {
    clearModel: (state) => {
      state.model = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllProductModel ======

    builder.addCase(loadAllProductModel.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllProductModel.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload.data)) {
        state.list = action.payload.data;
      } else {
        state.list = action?.payload?.data?.getAllProductBrand;
        state.total = action?.payload?.data?.totalProductBrand;
      }
    });

    builder.addCase(loadAllProductModel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 1) ====== builders for loadAllProductModel ======

    builder.addCase(loadAllProductModelPublic.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllProductModelPublic.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload.data)) {
        state.list = action.payload.data;
      } else {
        state.list = action?.payload?.data?.getAllProductBrand;
        state.total = action?.payload?.data?.totalProductBrand;
      }
    });

    builder.addCase(loadAllProductModelPublic.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addProductModel ======

    builder.addCase(addProductModel.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addProductModel.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      if (action.payload.data) {
        const list = [...state.list];
        list.push(action.payload.data);
        state.list = list;
      } else {
        const list = [...state.list];
        state.list = list;
      }
    });

    builder.addCase(addProductModel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleProductModel ======

    builder.addCase(loadSingleProductModel.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleProductModel.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload?.data;
    });

    builder.addCase(loadSingleProductModel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteProductBrand ======

    builder.addCase(deleteProductModel.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteProductModel.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteProductModel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default productModelSlice.reducer;
export const { clearBrand } = productModelSlice.actions;
