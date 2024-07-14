import axios from "axios";



export const getExams = () => async (dispatch) => {
  try {
    dispatch({ type: "getExamListRequest" });

    const { data } = await axios.get(`/api/exam/get`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "getExamListuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getExamListFailure",
      payload: error.response.data.message,
    });
  }
};
