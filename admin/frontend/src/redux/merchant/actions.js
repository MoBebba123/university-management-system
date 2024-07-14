import axios from "axios";
import { baseURL } from "../../constants/api";

axios.defaults.baseURL = baseURL;

export const getMerchantDetails = () => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  try {
    dispatch({ type: "getMerchantDetailsRequest" });
    const { data } = await axios.get(`/merchant/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      withCredentials: false,
    });
    dispatch({ type: "getMerchantDetailsSuccess", payload: data });
  } catch (error) {
    console.log(error);

    dispatch({
      type: "getMerchantDetailsFailure",
      payload: error?.response?.data?.message,
    });
  }
};
