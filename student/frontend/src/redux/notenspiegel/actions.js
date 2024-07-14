import axios from "axios";

import { baseURL } from "../../constants/api";

axios.defaults.baseURL = baseURL;

axios.defaults.withCredentials = true;
export const getNotenspiegel = () => async (dispatch) => {
  try {
    dispatch({ type: "getNotenspiegelRequest" });

    const { data } = await axios.get(`/api/notenspiegel/get`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "getNotenspiegelSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getNotenspiegelFailure",
      payload: error.response.data.message,
    });
  }
};
