import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  notenspiegel: [],
};
export const notenspiegelReducer = createReducer(initialState, {
  getNotenspiegelRequest: (state) => {
    state.loading = true;
  },
  getNotenspiegelSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.notenspiegel = action.payload.notenspiegel;
  },
  getNotenspiegelFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  resetNotenspiegelData: (state) => {
    state.message = null;
    state.success = null;
    state.error = null;
  },
});
