import axios from "axios";

export const registerForExam = (examData) => async (dispatch) => {
  try {
    dispatch({ type: "registerForExamRequest" });

    const { data } = await axios.post(`/api/anmeldeliste/register`, examData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
