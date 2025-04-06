import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import config from "../../../../config/config";

const initialState = {
  list: null,
  user: null,
  token: null,
  error: "",
  loading: false,
};

const BASE_URL = `${config.apiBaseUrl}`;
const MERCHANT_URL = `${BASE_URL}/api/v1/auth/merchant`;
const AUTH_URL = `${BASE_URL}/api/auth`;
const MERCHANT_API_URL = `${BASE_URL}/api/v1/merchants`;

export const loadPermissionById = createAsyncThunk(
  "auth/loadPermissionById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${MERCHANT_API_URL}/permission/role/${id}`
      );
      return successHandler(data);
    } catch (error) {
      return rejectWithValue(errorHandler(error));
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${MERCHANT_URL}/register`,
        values,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return successHandler(data, "Registration successful");
    } catch (error) {
      return rejectWithValue(errorHandler(error, true));
    }
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AUTH_URL}/sign-up`,
        values,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          withCredentials: true,
        }
      );
      return successHandler(data, "Merchant registered successfully");
    } catch (error) {
      return rejectWithValue(errorHandler(error, true));
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AUTH_URL}/verify-otp`,
        values,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      localStorage.setItem("otp-verified", true);
      return successHandler(data, "OTP verification successful");
    } catch (error) {
      return rejectWithValue(errorHandler(error, true));
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${MERCHANT_URL}/login`,
        credentials,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(data.body));
      return successHandler(data, "Login successful");
    } catch (error) {
      return rejectWithValue(errorHandler(error, true));
    }
  }
);

export const resendOtp = createAsyncThunk(
  "user/resendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AUTH_URL}/resend-otp`,
        { email },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      return successHandler(data, "OTP resend successful");
    } catch (error) {
      return rejectWithValue(errorHandler(error, true));
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    // Load Permission By ID
    builder
      .addCase(loadPermissionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPermissionById.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload?.data?.body;
      })
      .addCase(loadPermissionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load permissions.";
      });

    // Create User
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Add User
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Verify OTP
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, otpVerified: true };
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Resend OTP
    builder
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.loading = false;
        alert(action.payload.message);
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default authSlice.reducer;
