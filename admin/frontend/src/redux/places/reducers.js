import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  placeList: [],
  place: {},
};
export const placesReducer = createReducer(initialState, {
  addPlaceRequest: (state) => {
    state.loading = true;
  },
  addPlaceSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.isCreated = true;
    state.message = action.payload.message;
  },
  addPlaceFailure: (state, action) => {
    state.loading = false;
    state.isCreated = false;
    state.error = action.payload;
  },
  getPlaceListRequest: (state) => {
    state.loading = true;
  },
  getPlaceListuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.placeList = action.payload;
  },
  getPlaceListFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  getPlaceRequest: (state) => {
    state.loading = true;
  },
  getPlaceSuccess: (state, action) => {
    state.loading = false;
    state.success = true;
    state.place = action.payload.place;
  },

  getPlaceFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updateplaceRequest: (state) => {
    state.loading = true;
  },
  updateplaceSuccess: (state, action) => {
    state.loading = false;
    state.isUpdated = true;

    state.success = action.payload.success;
    state.message = action.payload.message;
  },

  updateplaceFailure: (state, action) => {
    state.loading = false;
    state.isUpdated = false;

    state.error = action.payload;
  },

  deleteplaceRequest: (state) => {
    state.loading = true;
  },
  deleteplaceSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.isDeleted = true;
    state.message = action.payload.message;
  },
  deleteplaceFailure: (state, action) => {
    state.loading = false;
    state.isDeleted = false;
    state.error = action.payload;
  },
  clearMessage: (state) => {
    state.message = null;
    state.success = null;
  },
  resetPlaceData: (state) => {
    state.isCreated = false;
    state.isUpdated = false;
    state.isDeleted = false;
    state.message = null;
    state.success = null;
    state.error = null;
  },
  clearError: (state) => {
    state.error = null;
  },
});
