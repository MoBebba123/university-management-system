import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/users/actions";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";

import * as yup from "yup";
// import useMediaQuery from "@mui/matErial/useMediaQuery";
import Header from "../../components/Header";
import "./login.css";

import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../../components/Loader";
const Login = () => {
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const alert = useAlert();
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, message, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;
  const loginUser = (e) => {
    if (e) {
      e.preventDefault();
    }
    const myForrm = new FormData();
    myForrm.append("email", email);
    myForrm.append("password", password);
    dispatch(login(email, password));
    setUser({ email: "", password: "" });
    dispatch({ type: "clearMessage" });
  };
  const handleChnage = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }

    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, message, navigate, dispatch, alert]);

  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="login_container">
          <Box m="20px" width={"30%"}>
            <Header title="LOG IN" subtitle="Log in to your dashboard now " />

            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={loginUser} className="login_form">
                  <Box
                    display="grid"
                    gridColumn="auto"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: "span 4",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="email"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChnage}
                      value={email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="password"
                      label="password"
                      onBlur={handleBlur}
                      onChange={handleChnage}
                      value={password}
                      name="password"
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      Log in
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </div>
      )}
    </>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
const initialValues = {
  email: "",
  password: "",
};

export default Login;
