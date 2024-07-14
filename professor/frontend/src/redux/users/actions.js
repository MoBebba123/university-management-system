import axios from "axios";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `/api/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
    localStorage.setItem("isAuth", true);
  } catch (error) {
    localStorage.setItem("isAuth", false);

    dispatch({ type: "loginFailure", payload: error.response.data.message });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch({ type: "logOutRequest" });

    const { data } = await axios.get(`/api/auth/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: "logOutSuccess", payload: data });
    localStorage.setItem("isAuth", false);
  } catch (error) {
    dispatch({
      type: "logOutFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserDetails = () => async (dispatch) => {
  try {
    dispatch({ type: "getUserDetailsRequest" });

    const { data } = await axios.get(`/api/professor/get-details`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    dispatch({ type: "getUserDetailSuccess", payload: data });
  } catch (error) {
    localStorage.setItem("isAuth", false);

    dispatch({
      type: "getUserDetailsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllUsersRequest" });

    const { data } = await axios.get(`/all-users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "getAllUsersSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailure",
      payload: error.response.data.message,
    });
  }
};
