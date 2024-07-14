import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  mechant: {},
  isAuthenticated: localStorage.getItem("access_token") ? true : null,
  token: localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : null,
};
export const authReducer = createReducer(initialState, {
  loginRequest: (state) => {
    state.loading = true;
  },
  loginSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.token = action.payload.access_token;
    state.message = "logged in";
    state.success = true;
  },
  loginFailure: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
    state.success = false;
  },

  logOutRequest: (state) => {
    state.loading = true;
  },
  logOutSuccess: (state, action) => {
    state.mechant = {};
    state.loading = false;
    state.isAuthenticated = false;
    state.message = "logged out";
  },
  logOutFailure: (state, action) => {
    state.isAuthenticated = false;
    state.error = action.payload;
    state.loading = false;
  },
  clearMessage: (state) => {
    state.message = null;
    state.success = null;
  },
  clearError: (state) => {
    state.error = null;
    state.success = null;
  },
});
