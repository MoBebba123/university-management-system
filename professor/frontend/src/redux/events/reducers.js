import { createReducer } from "@reduxjs/toolkit";

const initialEvent = {
  event: {},
};
export const eventReducer = createReducer(initialEvent, {
  createEventRequest: (state) => {
    state.loading = true;
  },
  createEventSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;
    state.isCreated = true;
    state.event = action.payload.event;
    state.message = action.payload.message;
  },
  createEventsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteEventRequest: (state) => {
    state.loading = true;
    state.isDeleted = false;
  },
  deleteEventSuccess: (state, action) => {
    state.loading = false;
    state.isDeleted = true;
    state.success = action.payload.success;
    state.message = action.payload.message;
    state.event = null;
  },
  deleteEventFailure: (state, action) => {
    state.loading = false;
    state.isDeleted = false;
    state.error = action.payload;
  },
  updateEventRequest: (state) => {
    state.loading = true;
    state.isUpdated = false;
  },
  updateEventSuccess: (state, action) => {
    state.loading = false;
    state.isUpdated = true;
    state.success = action.payload.success;
    state.message = action.payload.message;
    state.event = action.payload.event;
  },
  updateEventFailure: (state, action) => {
    state.loading = false;
    state.isUpdated = false;
    state.error = action.payload;
  },
  resetEvent: (state, action) => {
    state.isCreated = false;
    state.isDeleted = false;
    //state.isUpdated = false;
    state.event = {};
  },
});

const initialEvents = {
  events: [],
};
export const eventsReducer = createReducer(initialEvents, {
  getEventsRequest: (state) => {
    state.loading = true;
  },
  getEventsSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.success;

    state.events = action.payload.events;
    state.message = action.payload.message;
  },
  getEventsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
