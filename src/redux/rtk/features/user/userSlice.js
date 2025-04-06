import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";
import config from "../../../../config/config";

const initialState = {
  list: null,
  user: null,
  error: "",
  loading: false,
  total: 0,
};

const BASE_URL = `${config.apiBaseUrl}`;
const AUTH_URL = `${BASE_URL}/api/auth`;
const MERCHANT_URL = `${BASE_URL}/api/v1/auth/merchant`;

export const createUser = createAsyncThunk(
  "user/createUser",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        url: `${MERCHANT_URL}/register`,
        data: values,
        withCredentials: true,
      });

      return successHandler(data, "Registration successful");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const addStaff = createAsyncThunk("user/addStaff", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `user/register`,
      data: {
        ...values,
      },
    });

    return successHandler(data, "Registration successful");
  } catch (error) {
    return errorHandler(error, true);
  }
});

export const updateStaff = createAsyncThunk(
  "user/updateStaff",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `user/${id}`,
        data: values,
      });

      return successHandler(data, "User updated successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
export const deleteStaff = createAsyncThunk("user/deleteStaff", async (id) => {
  try {
    const { data } = await axios({
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `user/${id}`,
      data: {
        status: "false",
      },
    });

    return successHandler(data, "User successfully deleted");
  } catch (error) {
    return errorHandler(error, true);
  }
});

export const loadSingleStaff = createAsyncThunk(
  "user/loadSingleStaff",
  async (id) => {
    try {
      const { data } = await axios.get(`user/${id}`);
      return {
        data,
        message: "success",
      };
    } catch (error) {
      errorHandler(error, false);
    }
  }
);

export const loadAllStaff = createAsyncThunk(
  "user/loadAllStaff",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`user?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addUser = createAsyncThunk("user/addUser", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `${AUTH_URL}/sign-in`,
      data: values,
    });

    // Store tokens
    localStorage.setItem("access-token", data.data.tokens.accessToken);
    localStorage.setItem("refreshToken", data.data.tokens.refreshToken);

    // Store user info
    const user = data.data.user;
    localStorage.setItem("userId", user.id);
    localStorage.setItem("email", user.email);
    localStorage.setItem("role", user.role);
    localStorage.setItem("isLogged", "true");

    return successHandler(data, "Login Successfully Done");
  } catch (error) {
    return errorHandler(error, true);
  }
});

export const forgetPassword = createAsyncThunk("user/forgetPassword", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `${AUTH_URL}/reset-password`,
      data: values,
    });
    return successHandler(data, "password reset mail sent");
  } catch (error) {
    return errorHandler(error, true);
  }
});

export const updatePassword = createAsyncThunk("user/updatePassword", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `${AUTH_URL}/update-password`,
      data: values,
    });
    console.log("Forget Password Response:", data?.status); // Added console.log
    return successHandler(data, "password changed successfully");
  } catch (error) {
    console.log("Forget Password Error:", error.response?.data); // Added error console.log
    return errorHandler(error, true);
  }
});

export const logOut = createAsyncThunk("user/addUser", async () => {
  try {
    const id = Number(localStorage.getItem("id"));
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `user/logout`,
      data: { id },
    });
    localStorage.clear();
    window.location.href = "/admin/auth/login";
    return successHandler(data, "LogOut Successfully Done");
  } catch (error) {
    return errorHandler(error, true);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllStaff ======

    builder.addCase(loadAllStaff.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllStaff.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data.getAllUser;
      state.total = action.payload?.data.totalUser;
    });

    builder.addCase(loadAllStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addUser ======

    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for addStaff ======

    builder.addCase(addStaff.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addStaff.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for addUser ======

    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.user)) {
        state.user = [];
      }
      const user = [...state.user];
      user.push(action.payload?.data);
      state.user = user;
    });

    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5) ====== builders for loadSingleStaff ======

    builder.addCase(loadSingleStaff.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleStaff.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
    });

    builder.addCase(loadSingleStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6) ====== builders for deleteStaff ======

    builder.addCase(deleteStaff.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteStaff.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // Add new builder cases for updatePassword
    builder.addCase(updatePassword.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.loading = false;
      // The success message is already handled in the thunk
      setTimeout(() => {
        window.location.href = "/admin/auth/login";
      }, 1000);
    });

    builder.addCase(updatePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Add builder cases for forgetPassword
    builder.addCase(forgetPassword.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      state.loading = false;
      // The success message is already handled in the thunk
      setTimeout(() => {
        window.location.href = "/admin/auth/login";
      }, 1000);
    });

    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default userSlice.reducer;
export const { clearUser } = userSlice.actions;
