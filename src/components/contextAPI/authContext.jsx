import { createContext } from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  isLogged: 0,
  user: null,
  loading: false,
  token: null,
  message: null,
  error: null,
};

