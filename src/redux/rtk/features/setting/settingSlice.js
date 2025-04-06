import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import config from "../../../../config/config";

const initialState = {
  loading: false,
  data: null,
  merchantData: null,
  error: false,
  errorMassage: "",
};

const BASE_URL = `${config.apiBaseUrl}`;
const API_URL = `${BASE_URL}/api/v1`;
const MERCHANT_API_URL = `${BASE_URL}/api/v1/merchants`;

export const getSetting = createAsyncThunk("data/settingData", async () => {
  try {
    const token = localStorage.getItem("access-token");
    const { data } = await axios.get(
      `${API_URL}/users/me`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return successHandler(data);
  } catch (error) {
    return errorHandler(error);
  }
});

export const getProfile = createAsyncThunk("data/settingData", async () => {
  try {
    const token = localStorage.getItem("access-token");
    const { data } = await axios.get(
      `${MERCHANT_API_URL}/business-profile`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const user = data.data;
    localStorage.setItem("businessName", user.name);
    localStorage.setItem("isLogged", "true");
    localStorage.setItem("businessId", user.id);

    return successHandler(data);
  } catch (error) {
    return errorHandler(error);
  }
});

export const getMerchantSetting = createAsyncThunk(
  "data/merchantSettingData",
  async () => {
    try {
      const token = localStorage.getItem("access-token");
      const { data } = await axios.get(
        `${MERCHANT_API_URL}/app-settings-info`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const updateSetting = createAsyncThunk(
  "data/updateSetting",
  async (values) => {
    try {
      const { data } = await axios.post(`setting`, values);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSetting.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getSetting.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data?.body?.appSettings[0];
      if (action.payload?.error) {
        state.error = action.payload?.error;
      }
    });

    builder.addCase(getMerchantSetting.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getMerchantSetting.fulfilled, (state, action) => {
      state.loading = false;
      state.merchantData = action.payload?.data?.body;
      if (action.payload?.error) {
        state.error = action.payload?.error;
      }
    });

    builder.addCase(updateSetting.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateSetting.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });

    builder.addCase(updateSetting.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMassage = action.payload.message;
    });
  },
});

export default settingSlice.reducer;
