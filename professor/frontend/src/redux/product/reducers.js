import { createReducer } from "@reduxjs/toolkit";

const initialUsersState = {
  product: {},
};
export const productReducer = createReducer(initialUsersState, {
  createProductRequest: (state) => {
    state.loading = true;
  },
  createProductSuccess: (state, action) => {
    state.loading = false;
    state.isCreated = true;
    state.message = action.payload.message;
  },
  createProductFailure: (state, action) => {
    state.loading = false;
    state.isCreated = false;
    state.error = action.payload;
  },
  updateProductRequest: (state) => {
    state.loading = true;
  },
  updateProductSuccess: (state, action) => {
    state.loading = false;
    state.isUpdated = true;
    state.message = action.payload.message;
  },
  updateProductFailure: (state, action) => {
    state.loading = false;
    state.isUpdated = false;
    state.error = action.payload;
  },
  deleteProductRequest: (state) => {
    state.loading = true;
  },
  deleteProductSuccess: (state, action) => {
    state.loading = false;
    state.isDeleted = true;
    state.message = action.payload.message;
  },
  deleteProductFailure: (state, action) => {
    state.loading = false;
    state.isDeleted = false;
    state.error = action.payload;
  },

  addColorRequest: (state) => {
    state.loading = true;
  },
  addColorSuccess: (state, action) => {
    state.loading = false;
    state.isUpdated = true;
    state.message = action.payload.message;
  },
  addColorFailure: (state, action) => {
    state.loading = false;
    state.isUpdated = false;
    state.error = action.payload;
  },
  deleteColorRequest: (state) => {
    state.loading = true;
  },
  deleteColorSuccess: (state, action) => {
    state.loading = false;
    state.isDeleted = true;
    state.message = action.payload.message;
  },
  deleteColorFailure: (state, action) => {
    state.loading = false;
    state.isDeleted = false;
    state.error = action.payload;
  },
  getProductByIdRequest: (state) => {
    state.loading = true;
  },
  getProductByIdSuccess: (state, action) => {
    state.loading = false;
    state.product = action.payload.product;
  },
  getProductByIdFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  resetProduct: (state, action) => {
    state.isCreated = false;
    state.isUpdated = false;

    state.isDeleted = false;
    state.error = null;
    state.message = null;
  },
});
const initialProductsState = {
  products: [],
};
export const productsReducer = createReducer(initialProductsState, {
  getAdminProductsRequest: (state) => {
    state.loading = true;
  },
  getAdminProductsSuccess: (state, action) => {
    state.loading = false;
    state.products = action.payload.products;
  },
  getAdminProductsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
