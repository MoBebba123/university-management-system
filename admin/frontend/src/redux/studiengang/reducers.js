import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  studiengang: {},
  studiengangList: [],
};
export const studiengangReducer = createReducer(initialState, {
  createStudiengangRequest: (state) => {
    state.loading = true;
  },
  createStudiengangSuccess: (state, action) => {
    state.success = true;
    state.loading = false;
    state.isCreated = true;
    state.message = action.payload.message;
  },
  createStudiengangFailure: (state, action) => {
    state.loading = false;
    state.isCreated = false;
    state.error = action.payload;
  },
  updateSudiengangRequest: (state) => {
    state.loading = true;
  },
  updateSudiengangSuccess: (state, action) => {
    state.success = true;
    state.loading = false;
    state.isUpdated = true;
    state.message = action.payload.message;
  },
  updateSudiengangFailure: (state, action) => {
    state.loading = false;
    state.isUpdated = false;
    state.error = action.payload;
  },
  getstudiengangListRequest: (state) => {
    state.loading = true;
  },
  getstudiengangListSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.studiengangList = action.payload.studiengangList;
  },
  getstudiengangListFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  deleteSudiengangRequest: (state) => {
    state.loading = true;
  },
  deleteSudiengangSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.isDeleted = true;
    state.message = action.payload.message;
  },
  deleteSudiengangFailure: (state, action) => {
    state.loading = false;
    state.isDeleted = false;
    state.error = action.payload;
  },
  clearMessage: (state) => {
    state.message = null;
    state.success = null;
  },

  clearStudiengang: (state) => {
    state.studiengang = {};
  },
  clearError: (state) => {
    state.error = null;
  },
  resetStudiengang: (state) => {
    state.error = null;
    state.message = null;
    state.success = null;
    state.isCreated = false;
    state.isDeleted = false;
    state.isUpdated = false;
  },
});
