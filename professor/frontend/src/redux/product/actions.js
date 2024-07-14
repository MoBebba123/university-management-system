import axios from "axios";
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "createProductRequest" });

    const { data } = await axios.post(`/api/product/create`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
    dispatch({ type: "createProductSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createProductFailure",
      payload: error.response.data.message,
    });
  }
};
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: "updateProductRequest" });

    const { data } = await axios.put(`/api/product/update/${id}`, productData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "updateProductSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateProductFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });

    const { data } = await axios.delete(
      `/api/product/get-admin-products/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "deleteProductSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteProductFailure",
      payload: error.response.data.message,
    });
  }
};
export const addColor = (id, ColorData) => async (dispatch) => {
  try {
    dispatch({ type: "addColorRequest" });

    const { data } = await axios.put(`/api/productColor/add/${id}`, ColorData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: "addColorSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addColorFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteProductColor = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteColorRequest" });

    const { data } = await axios.delete(`/api/productColor/delete/${id}`);
    dispatch({ type: "deleteColorSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteColorFailure",
      payload: error.response.data.message,
    });
  }
};
export const getAdminproducts = () => async (dispatch) => {
  try {
    dispatch({ type: "getAdminProductsRequest" });

    const { data } = await axios.get(`/api/product/get-admin-products`);
    dispatch({ type: "getAdminProductsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAdminProductsFailure",
      payload: error.response.data.message,
    });
  }
};
export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getProductByIdRequest" });

    const { data } = await axios.get(`/api/product/${id}`);
    dispatch({ type: "getProductByIdSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getProductByIdFailure",
      payload: error.response.data.message,
    });
  }
};
