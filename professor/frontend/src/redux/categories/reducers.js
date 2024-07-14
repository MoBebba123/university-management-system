import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  categoryList: [],
  category: {},
};
export const categoryReducer = createReducer(initialState, {
  getcategoryListRequest: (state) => {
    state.loading = true;
  },
  getcategoryListuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.categoryList = action.payload.categoryList;
  },
  getcategoryListFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  getcategoryRequest: (state) => {
    state.loading = true;
  },
  getcategorySuccess: (state, action) => {
    state.loading = false;
    state.success = true;
    state.category = action.payload;
  },

  getcategoryFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updatecategoryRequest: (state) => {
    state.loading = true;
  },
  updatecategorySuccess: (state, action) => {
    state.loading = false;
    state.isUpdated = true;

    state.success = action.payload.success;
    state.message = action.payload.message;
    state.updatedCategory = action.payload.updated_category;
  },

  updatecategoryFailure: (state, action) => {
    state.loading = false;
    state.isUpdated = false;

    state.error = action.payload;
  },
  addcategoryRequest: (state) => {
    state.loading = true;
  },
  addcategorySuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.isCreated = true;
    state.message = action.payload.message;
  },
  addcategoryFailure: (state, action) => {
    state.loading = false;
    state.isCreated = false;
    state.error = action.payload;
  },
  deletecategoryRequest: (state) => {
    state.loading = true;
  },
  deletecategorySuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.isDeleted = true;
    state.message = action.payload.message;
  },
  deletecategoryFailure: (state, action) => {
    state.loading = false;
    state.isDeleted = false;
    state.error = action.payload;
  },
  clearMessage: (state) => {
    state.message = null;
    state.success = null;
  },
  resetData: (state) => {
    state.isCreated = false;
    state.isUpdated = false;
    state.isDeleted = false;
  },
  clearError: (state) => {
    state.error = null;
  },
});
