import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  professor: {},
  professorList: [],
};
export const professorReducer = createReducer(initialState, {
  createProfessorRequest: (state) => {
    state.loading = true;
  },
  createProfessorSuccess: (state, action) => {
    state.success = true;
    state.loading = false;
    state.isCreated = true;
    state.message = action.payload.message;
  },
  createProfessorFailure: (state, action) => {
    state.loading = false;
    state.isCreated = false;
    state.error = action.payload;
  },

  getProfessorListRequest: (state) => {
    state.loading = true;
  },
  getProfessorListSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.professorList = action.payload.professorList;
  },
  getProfessorListFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  deleteProfessorRequest: (state) => {
    state.loading = true;
  },
  deleteProfessorSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.isDeleted = true;
    state.message = action.payload.message;
  },
  deleteProfessorFailure: (state, action) => {
    state.loading = false;
    state.isDeleted = false;
    state.error = action.payload;
  },

  clearMessage: (state) => {
    state.message = null;
    state.success = null;
  },

  clearprofessor: (state) => {
    state.professor = {};
  },
  clearError: (state) => {
    state.error = null;
  },
  resetProfessor: (state) => {
    state.error = null;
    state.message = null;
    state.success = null;
    state.isDeleted = null;
    state.isCreated = null;
  },
});
