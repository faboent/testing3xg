import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";
import config from "@/config/config";

const initialState = {
  list: null,
  bank: null,
  error: "",
  loading: false,
};

const BASE_URL = `${config.apiBaseUrl}/api/utils/get-banks`;


export const loadAllBank = createAsyncThunk(
  "bankList/loadAllBank",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response.data);
      return successHandler(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

const bankListSlice = createSlice({
  name: "bankList",
  initialState,
  reducers: {
    clearBank: (state) => {
      state.bank = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAllBank.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllBank.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(loadAllBank.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default bankListSlice.reducer;
export const { clearBank } = bankListSlice.actions;
