import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuthenticated: localStorage.getItem("isAuth")
    ? JSON.parse(localStorage.getItem("isAuth"))
    : null,
};
export const userReducer = createReducer(initialState, {
  loginRequest: (state) => {
    state.loading = true;
  },
  loginSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload.user;
    state.message = "logged in";

    state.success = true;
  },
  loginFailure: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },
  getUserDetailsRequest: (state) => {
    state.loading = true;
  },
  getUserDetailSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  getUserDetailsFailure: (state, action) => {
    state.loading = false;

    state.isAuthenticated = false;
    state.error = action.payload;
  },
  logOutRequest: (state) => {
    state.loading = true;
  },
  logOutSuccess: (state, action) => {
    state.user = {};
    state.loading = false;
    state.isAuthenticated = false;
    state.message = action.payload.message;
    state.success = action.payload.success;
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
  },
});

const initialUsersState = {
  users: [],
};
export const usersReducer = createReducer(initialUsersState, {
  getAllUsersRequest: (state) => {
    state.loading = true;
  },
  getAllUsersSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload.users;
    state.message = action.payload.message;
  },
  getAllUsersFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
