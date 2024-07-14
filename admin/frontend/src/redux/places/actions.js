import axios from "axios";
import { baseURL } from "../../constants/api";

axios.defaults.baseURL = baseURL;

export const addExam = (examData) => async (dispatch) => {
  try {
    dispatch({ type: "addExamRequest" });

    const { data } = await axios.post(`/api/exam/add`, examData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "addExamSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addExamFailure",
      payload: error.response.data.message,
    });
  }
};
export const getPlaces = () => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  try {
    dispatch({ type: "getPlaceListRequest" });

    const { data } = await axios.get(`/places`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });
    dispatch({ type: "getPlaceListuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getPlaceListFailure",
      payload: error?.response?.data?.message,
    });
  }
};
export const deleteExam = (examId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteExamRequest" });

    const { data } = await axios.delete(`/api/exam/delete/${examId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "deleteExamSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteExamFailure",
      payload: error?.response?.data?.message,
    });
  }
};
export const getExamById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getExamRequest" });

    const { data } = await axios.get(`/api/exam/get/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "getExamSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getExamFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateExam = (id, examData) => async (dispatch) => {
  try {
    dispatch({ type: "updateExamRequest" });

    const { data } = await axios.put(`/api/Exam/update/${id}`, examData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "updateExamSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateExamFailure",
      payload: error.response.data.message,
    });
  }
};
