import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  examList: [],
  exam: {},
};
export const examReducer = createReducer(initialState, {
  addExamRequest: (state) => {
    state.loading = true;
  },
  addExamSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.isCreated = true;
    state.message = action.payload.message;
  },
  addExamFailure: (state, action) => {
    state.loading = false;
    state.isCreated = false;
    state.error = action.payload;
  },
  getExamListRequest: (state) => {
    state.loading = true;
  },
  getExamListuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.examList = action.payload.examList;
  },
  getExamListFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  getExamRequest: (state) => {
    state.loading = true;
  },
  getExamSuccess: (state, action) => {
    state.loading = false;
    state.success = true;
    state.exam = action.payload.exam;
  },

  getExamFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updateExamRequest: (state) => {
    state.loading = true;
  },
  updateExamSuccess: (state, action) => {
    state.loading = false;
    state.isUpdated = true;

    state.success = action.payload.success;
    state.message = action.payload.message;
  },

  updateExamFailure: (state, action) => {
    state.loading = false;
    state.isUpdated = false;

    state.error = action.payload;
  },

  deleteExamRequest: (state) => {
    state.loading = true;
  },
  deleteExamSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.isDeleted = true;
    state.message = action.payload.message;
  },
  deleteExamFailure: (state, action) => {
    state.loading = false;
    state.isDeleted = false;
    state.error = action.payload;
  },
  clearMessage: (state) => {
    state.message = null;
    state.success = null;
  },
  resetExamData: (state) => {
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