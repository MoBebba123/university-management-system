import axios from "axios";
export const getNotenspiegel = () => async (dispatch) => {
  try {
    dispatch({ type: "getNotenspiegelRequest" });

    const { data } = await axios.get(`/api/notenspiegel/get`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    dispatch({ type: "getNotenspiegelSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getNotenspiegelFailure",
      payload: error.response.data.message,
    });
  }
};
