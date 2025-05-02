import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRequest } from "./types";

const initialState = {
  auth: {
    token: "",
    name: "",
  },
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    requestLogin: (_state, _action: PayloadAction<LoginRequest>) => {},
    setUser: (state, action) => {
      state.auth = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
