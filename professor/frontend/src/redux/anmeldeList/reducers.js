import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  anmeldeliste: [],
};
export const anmeldeListeReducer = createReducer(initialState, {
  registerForExamRequest: (state) => {
    state.loading = true;
  },
  registerForExamSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.isCreated = true;
    state.message = action.payload.message;
  },
  registerForExamFailure: (state, action) => {
    state.loading = false;
    state.isCreated = false;
    state.error = action.payload;
  },
  cancelExamRequest: (state) => {
    state.loading = true;
  },
  cancelExamSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.isDeleted = true;
    state.message = action.payload.message;
  },
  cancelExamFailure: (state, action) => {
    state.loading = false;
    state.isDeleted = false;
    state.error = action.payload;
  },
  getRegisteredExamsRequest: (state) => {
    state.loading = true;
  },
  getRegisteredExamsSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.anmeldeliste = action.payload.anmeldeliste;
  },
  getRegisteredExamsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  resetExamRegistrationData: (state) => {
    state.isCreated = false;
    state.message = null;
    state.isDeleted = false;

    state.success = null;
    state.error = null;
  },
});
