import axios from "axios";
import { baseURL } from "../../constants/api";

axios.defaults.baseURL = baseURL;
export const createStudent = (studentData) => async (dispatch) => {
  try {
    dispatch({ type: "createStudentRequest" });

    const { data } = await axios.post(`/api/student/add`, studentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "createStudentSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createStudentFailure",
      payload: error.response.data.message,
    });
  }
};
export const getStudentList = () => async (dispatch) => {
  try {
    dispatch({ type: "getStudentListRequest" });

    const { data } = await axios.get(`/api/student/get`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "getStudentListSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getStudentListFailure",
      payload: error.response.data.message,
    });
  }
};
export const deleteStudent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteStudentRequest" });

    const { data } = await axios.delete(`/api/student/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "deleteStudentSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteStudentFailure",
      payload: error.response.data.message,
    });
  }
};
