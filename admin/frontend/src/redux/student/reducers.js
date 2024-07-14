import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  student: {},
  studentList: [],
};
export const studentReducer = createReducer(initialState, {
  createStudentRequest: (state) => {
    state.loading = true;
  },
  createStudentSuccess: (state, action) => {
    state.success = true;
    state.loading = false;
    state.isCreated = true;
    state.message = action.payload.message;
  },
  createStudentFailure: (state, action) => {
    state.loading = false;
    state.isCreated = false;
    state.error = action.payload;
  },

  getStudentListRequest: (state) => {
    state.loading = true;
  },
  getStudentListSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.studentList = action.payload.studentList;
  },
  getStudentListFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  deleteStudentRequest: (state) => {
    state.loading = true;
  },
  deleteStudentSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.isDeleted = true;
    state.message = action.payload.message;
  },
  deleteStudentFailure: (state, action) => {
    state.loading = false;
    state.isDeleted = false;
    state.error = action.payload;
  },

  clearMessage: (state) => {
    state.message = null;
    state.success = null;
  },

  clearStudent: (state) => {
    state.student = {};
  },
  clearError: (state) => {
    state.error = null;
  },
  resetStudent: (state) => {
    state.error = null;
    state.message = null;
    state.success = null;
    state.isCreated = null;
    state.isDeleted = null;
  },
});
