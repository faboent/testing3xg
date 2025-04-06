import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";
import config from "../../../../config/config";

const initialState = {
  list: [],
  product: null,
  report: null,
  info: null,
  posProduct: null,
  error: "",
  loading: false,
  total: 0,
  newProduct: null,
  toSellingLoading: false,
  topSellingProduct: null,
  card: null,
};

const BASE_URL = `${config.apiBaseUrl}/api/v1/merchants/products`;

export const loadProduct = createAsyncThunk(
  "product/loadProduct",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("access-token");
    try {
      const response = await axios.get(`${BASE_URL}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      });
      console.log("API Response:", response.data);
      return successHandler(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);



// export const loadProduct = createAsyncThunk(
//   "product/loadProduct",
//   async (arg) => {
//     try {
//       const query = queryGenerator(arg);
//       const { data } = await axios.get(`product?${query}`);
//       return successHandler(data);
//     } catch (error) {
//       return errorHandler(error);
//     }
//   }
// );

export const loadProductCard = createAsyncThunk(
  "product/loadProductCard",
  async () => {
    try {
      const { data } = await axios.get(`product?query=card`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
export const loadProductPublic = createAsyncThunk(
  "product/loadProductPublic",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`product/public?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadReportNewProduct = createAsyncThunk(
  "product/loadReportNewProduct",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`product-reports?${arg}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadReportTopSellingProduct = createAsyncThunk(
  "product/loadReportTopSellingProduct",
  async (arg) => {
    try {
      // const query = queryGenerator(arg);
      const { data } = await axios.get(`product-reports?${arg}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (values) => {
    console.log(values);
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + localStorage.getItem("access-token"),
        },
        url: `https://dev-api1.3xg.africa/api/v1/merchants/products`,
        data: values,
        withCredentials: true,
      });
      return successHandler(data, "Product added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formData: values, fileConfig }) => {
    try {
      const { data } = await axios({
        method: fileConfig() === "laravel" ? "post" : "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product/${id}`,
        data: values,
      });
      return successHandler(data, "Product updated successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const loadSingleProduct = createAsyncThunk(
  "product/loadSingleProduct",
  async (productId) => {
    const token = localStorage.getItem("access-token");
    try {
      const response = await axios.get(
        `https://dev-api1.3xg.africa/api/v1/merchants/products/${productId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          withCredentials: true,
        }
      );
console.log("response", response.data.data)
      return successHandler(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

export const loadSinglePublicProduct = createAsyncThunk(
  "product/loadSinglePublicProduct",
  async (id) => {
    try {
      const { data } = await axios.get(`product/public/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadPosProduct = createAsyncThunk(
  "product/loadPosProduct",
  async (id) => {
    try {
      const { data } = await axios.get(`product?query=search&key=${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadShortProduct = createAsyncThunk(
  "product/loadShortProduct",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("access-token");
    try {
      const response = await axios.get(`${BASE_URL}/shortage`, {
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

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product/${id}`,
        data: {
          status: "false",
        },
      });
      return successHandler(data, "Product deleted successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const searchProduct = createAsyncThunk(
  "product/searchProduct",
  async (prod) => {
    try {
      const { data } = await axios.get(`product?query=search&key=${prod}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
export const loadProductReport = createAsyncThunk(
  "product/loadProductReport",
  async (prod) => {
    try {
      const { data } = await axios.get(`product?query=report`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const productSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
    productWishlistUpdate: (state) => {
      if (state.product.isInWishlist === "false") {
        state.product.isInWishlist = "true";
      } else {
        state.product.isInWishlist = "false";
      }
    },
    clearProductList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadProduct ======


    builder.addCase(loadShortProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadShortProduct.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload.data)) {
        state.list = action.payload?.data;
      } else {
        state.list = action.payload?.data;
      }
    });

    builder.addCase(loadShortProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    builder.addCase(loadProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadProduct.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload.data)) {
        state.list = action.payload?.data;
      } else {
        state.list = action.payload?.data;
        // state.total = action.payload?.data;
      }
    });

    builder.addCase(loadProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 1) ====== builders for loadProductPublic ======

    builder.addCase(loadProductPublic.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadProductPublic.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllProduct;
      state.total = action.payload?.data?.totalProduct;
    });

    builder.addCase(loadProductPublic.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 1) ====== builders for load product card ======

    builder.addCase(loadProductCard.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadProductCard.fulfilled, (state, action) => {
      state.loading = false;
      state.card = action.payload?.data;
    });

    builder.addCase(loadProductCard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 1) ====== builders for loadReportNewProduct ======

    builder.addCase(loadReportNewProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadReportNewProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.newProduct = action.payload?.data?.getAllNewProduct;
    });

    builder.addCase(loadReportNewProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 1) ====== builders for loadReportTopSellingProduct ======

    builder.addCase(loadReportTopSellingProduct.pending, (state) => {
      state.toSellingLoading = true;
    });

    builder.addCase(loadReportTopSellingProduct.fulfilled, (state, action) => {
      state.toSellingLoading = false;
      state.topSellingProduct = action.payload?.data?.getAllTopSellingProduct;
    });

    // 2) ====== builders for addProduct ======

    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleProduct ======

    builder.addCase(loadSingleProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload?.data;
    });

    builder.addCase(loadSingleProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 3) ====== builders for loadSinglePublicProduct ======

    builder.addCase(loadSinglePublicProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSinglePublicProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload?.data;
    });

    builder.addCase(loadSinglePublicProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for loadPosProduct ======

    builder.addCase(loadPosProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadPosProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(loadPosProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5) ====== builders for deleteProduct ======

    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6) ====== builders for searchProduct ======

    builder.addCase(searchProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(searchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(searchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 7) ======= builders for update product =============
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });

    // 7) ======= builders for report product =============
    builder.addCase(loadProductReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadProductReport.fulfilled, (state, action) => {
      state.loading = false;
      state.report = action.payload?.data?.getAllProduct;
      state.info = action.payload?.data.aggregations._sum;
    });
    builder.addCase(loadProductReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
  },
});

export default productSlice.reducer;
export const { clearProduct, clearProductList, productWishlistUpdate } =
  productSlice.actions;
