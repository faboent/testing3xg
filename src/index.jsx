import axios from "axios";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";

import store from "./redux/rtk/app/store";
import getQuery from "./utils/getQuery";
const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.baseURL = import.meta.env.VITE_APP_API;
axios.interceptors.request.use(async (config) => {
  const query = getQuery();
  const isAdminPath = window.location.pathname.includes("/admin");

  const token = localStorage.getItem("access-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.withCredentials = true;
  return config;
});

const refreshAccessToken = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}/user/refresh-token`,
      {
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();
    if (data?.token) {
      localStorage.setItem("access-token", data.token);
      return data.token;
    } else {
      localStorage.clear();
      window.location.replace("/admin/auth/login");
      return undefined;
    }
  } catch (err) {
    localStorage.clear();
    window.location.replace("/admin/auth/login");
    return undefined;
  }
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    const isLoginPath = window.location.pathname.includes("/login");
    const isOnboardingPath = window.location.pathname.includes("/onboarding");
    const isAdminPath = window.location.pathname.includes("/admin");
    if (
      error?.response?.status === 401 &&
      !prevRequest?.sent &&
      isAdminPath &&
      !isLoginPath &&
      !isOnboardingPath
    ) {
      prevRequest.sent = true;

      const refreshedToken = await refreshAccessToken();

      if (refreshedToken) {
        error.config.headers.Authorization = `Bearer ${refreshedToken}`;
        return axios(error.config);
      }
    } else if (error?.response?.status === 401 && !isAdminPath) {
      localStorage.removeItem("id");
      localStorage.removeItem("access-token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      localStorage.removeItem("isLogged");
    } else if (isLoginPath) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
