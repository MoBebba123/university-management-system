import { createReducer } from "@reduxjs/toolkit";
export const billingPlanReducer = createReducer(
  { billingPlan: {} },
  {
    createBillingRequest: (state) => {
      state.loading = true;
    },
    createBillingSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.billingPlan = action.payload.createdBillingPlan;
    },
    createBillingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createBillingReset: (state, action) => {
      state.billingPlan = {};
    },
    deleteBillingPlanRequest: (state) => {
      state.loading = true;
    },
    deleteBillingPlanSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.isDeleted = true;
      state.billingPlan = {};
    },
    deleteBillingPlanFailure: (state, action) => {
      state.isDeleted = false;
      state.loading = false;
      state.error = action.payload;
    },
    deleteBillingPlanReset: (state) => {
      state.isDeleted = false;
    },
  }
);
