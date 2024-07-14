import axios from "axios";
import { baseURL } from "../../constants/api";

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

export const createProfessor = (ProfessorData) => async (dispatch) => {
  try {
    dispatch({ type: "createProfessorRequest" });

    const { data } = await axios.post(`/api/professor/add`, ProfessorData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "createProfessorSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createProfessorFailure",
      payload: error.response.data.message,
    });
  }
};
export const getProfessorList = () => async (dispatch) => {
  try {
    dispatch({ type: "getProfessorListRequest" });

    const { data } = await axios.get(`/api/professor/get`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "getProfessorListSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getProfessorListFailure",
      payload: error.response.data.message,
    });
  }
};
export const deleteProfessor = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProfessorRequest" });

    const { data } = await axios.delete(`/api/professor/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "deleteProfessorSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteProfessorFailure",
      payload: error.response.data.message,
    });
  }
};
