import axios from "axios";

export const createBilling = (billingData) => async (dispatch) => {
  try {
    dispatch({ type: "createBillingRequest" });

    const { data } = await axios.post(`/billingPlan-create`, billingData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: "createBillingSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createBillingFailure",
      payload: error.response.data.message,
    });
  }
};
