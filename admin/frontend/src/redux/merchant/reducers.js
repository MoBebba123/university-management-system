import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  merchant: {},
};
export const merchantReducer = createReducer(initialState, {
  getMerchantDetailsRequest: (state) => {
    state.loading = true;
  },
  getMerchantDetailsSuccess: (state, action) => {
    state.loading = false;
    state.merchant = action.payload;
    state.message = "logged in";
    state.success = true;
  },
  getMerchantDetailsFailure: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
    state.success = false;
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
