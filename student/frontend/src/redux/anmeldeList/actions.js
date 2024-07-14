import axios from "axios";
import { baseURL } from "../../constants/api";

axios.defaults.baseURL = baseURL;

axios.defaults.withCredentials = true;
export const registerForExam = (examData, exam, length) => async (dispatch) => {
  try {
    dispatch({ type: "registerForExamRequest" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/anmeldeliste/register`,
      examData,
      config
    );
    console.log(length);
    if (length === 0) {
      // Make the second request only if length is 0
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const { data: otherData } = await axios.post(
        `/api/anmeldeliste/insert`,
        exam,
        config
      );
    }

    dispatch({ type: "registerForExamSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "registerForExamFailure",
      payload: error.response.data.message,
    });
  }
};

export const cancelExam = (examId) => async (dispatch) => {
  try {
    dispatch({ type: "cancelExamRequest" });

    const { data } = await axios.delete(`/api/anmeldeliste/cancel/${examId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "cancelExamSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "cancelExamFailure",
      payload: error.response.data.message,
    });
  }
};
export const getRegisteredExams = () => async (dispatch) => {
  try {
    dispatch({ type: "getRegisteredExamsRequest" });

    const { data } = await axios.get(`/api/anmeldeliste/get-registred-exam`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "getRegisteredExamsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getRegisteredExamsFailure",
      payload: error.response.data.message,
    });
  }
};
