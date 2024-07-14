import axios from "axios";

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "getcategoryListRequest" });

    const { data } = await axios.get(`/api/category/get-all`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "getcategoryListuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getcategoryListFailure",
      payload: error.response.data.message,
    });
  }
};

export const getCategoryById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getcategoryRequest" });

    const { data } = await axios.get(`/api/category/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "getcategorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getcategoryFailure",
      payload: error.response.data.message,
    });
  }
};
export const addCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: "addcategoryRequest" });

    const { data } = await axios.post(`/api/category/create`, categoryData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: "addcategorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addcategoryFailure",
      payload: error.response.data.message,
    });
  }
};
export const updateCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: "updatecategoryRequest" });

    const { data } = await axios.post(
      `/api/category/update/${id}`,
      categoryData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: "updatecategorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updatecategoryFailure",
      payload: error.response.data.message,
    });
  }
};
export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: "deletecategoryRequest" });

    const { data } = await axios.delete(`/api/category/delete/${categoryId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "deletecategorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deletecategoryFailure",
      payload: error.response.data.message,
    });
  }
};
