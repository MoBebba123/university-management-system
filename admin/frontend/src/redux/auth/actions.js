import axios from "axios";
import { baseURL } from "../../constants/api";

axios.defaults.baseURL = baseURL;

export const login = (loginData) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(`/merchant/login`, loginData, {
      headers: {
        "Content-Type": "application/json",
      },

      withCredentials: false,
    });
    dispatch({ type: "loginSuccess", payload: data });
    localStorage.setItem("access_token", data.access_token);
  } catch (error) {
    console.log(error);

    dispatch({ type: "loginFailure", payload: error?.response?.data?.message });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch({ type: "logOutRequest" });

    dispatch({ type: "logOutSuccess" });

    localStorage.removeItem("access_token");
  } catch (error) {
    dispatch({
      type: "logOutFailure",
      payload: error.response.data.message,
    });
  }
};
