import axios from "axios";

export const createEvent = (eventData) => async (dispatch) => {
  try {
    dispatch({ type: "createEventRequest" });

    const { data } = await axios.post(`/event-create`, eventData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    dispatch({ type: "createEventSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createEventsFailure",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({ type: "getEventsRequest" });

    const { data } = await axios.get(`/events-get`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "getEventsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getEventssFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteEventRequest" });

    const { data } = await axios.delete(`/event-delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "deleteEventSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteEventFailure",
      payload: error.response.data.message,
    });
  }
};
export const updateEvent = (id, eventupdateData) => async (dispatch) => {
  try {
    dispatch({ type: "updateEventRequest" });

    const { data } = await axios.put(`/event-update/${id}`, eventupdateData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "updateEventSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteEventFailure",
      payload: error.response.data.message,
    });
  }
};
