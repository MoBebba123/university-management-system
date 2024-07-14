import { Box, Button, Modal, TextField, useTheme } from "@mui/material";

import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { tokens } from "../../../theme";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { getStudiengangList } from "../../../redux/studiengang/actions";
import Loader from "../../../components/Loader";
import * as yup from "yup";
import { MultiSelect } from "react-multi-select-component";
import { createStudent } from "../../../redux/student/actions";
import { useAlert } from "react-alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddModal = ({ open, handleClose, loading }) => {
  const theme = useTheme();
  const alert = useAlert();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [studiengang, setStudiengang] = useState([]);
  const { loading: loadingStudiengang, studiengangList } = useSelector(
    (state) => state.studiengang
  );
  const [options, setOptions] = useState([]);
  useEffect(() => {
    dispatch(getStudiengangList());
  }, [dispatch]);

  useEffect(() => {
    if (studiengangList) {
      setOptions((prev) =>
        studiengangList.map((element) => ({
          label: element.title,
          value: element.id,
        }))
      );
    }
  }, [studiengangList]);
  const [studentData, setStudentData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    studiengangId: "",
  });

  const { username, firstname, lastname, email, password, studiengangId } =
    studentData;
  const handleInput = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };
  const handelSubmit = (e) => {
    if (e) e.preventDefault();

    const myForrm = new FormData();
    myForrm.set("username", username);
    myForrm.set("firstname", firstname);
    myForrm.set("lastname", lastname);
    myForrm.set("email", email);
    myForrm.set("password", password);
    myForrm.set("studiengangId", studiengangId);

    dispatch(createStudent(myForrm));
    setStudentData({
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });

    handleClose();
  };

  const handleCancel = (e) => {
    setStudentData({
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      studiengangId: "",
    });
    handleClose();
  };
  return (
    <>
      <Loader loading={loading} />
      <Loader loading={loadingStudiengang} />
      <Modal open={open} style={{}}>
        <Box sx={style}>
          <Header title="ADD STUDENT" subtitle="create a new STUDENT" />

          <Formik
            onSubmit={() => {}}
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
              <form onSubmit={handelSubmit} className="login_form">
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
                    type="text"
                    label="username"
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleInput(e);
                      handleChange(e);
                    }}
                    name="username"
                    error={!!touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="firstname"
                    value={values.firstname}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleInput(e);
                      handleChange(e);
                    }}
                    name="firstname"
                    error={!!touched.firstname && !!errors.firstname}
                    helperText={touched.firstname && errors.firstname}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="lastname"
                    value={values.lastname}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleInput(e);
                      handleChange(e);
                    }}
                    name="lastname"
                    error={!!touched.lastname && !!errors.lastname}
                    helperText={touched.lastname && errors.lastname}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleInput(e);
                      handleChange(e);
                    }}
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
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleInput(e);
                      handleChange(e);
                    }}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <Box
                    sx={{ gridColumn: "span 1" }}
                    style={{ color: colors.greenAccent[500] }}
                  >
                    <span>Select studiengang *</span>
                    <MultiSelect
                      isCreatable
                      className="multiSelect"
                      options={options}
                      value={studiengang}
                      onChange={(e) => {
                        if (e.length > 1) {
                          alert.error("select only one");
                          return;
                        }
                        if (e.length) {
                          setStudentData({
                            ...studentData,
                            studiengangId: e[0].value,
                          });
                        } else {
                          setStudentData({
                            ...studentData,
                            studiengangId: "",
                          });
                        }
                        setStudiengang(e);
                      }}
                      labelledBy="Select"
                    />
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" mt="20px">
                  <Button
                    type="reset"
                    color="error"
                    variant="contained"
                    onClick={handleCancel}
                  >
                    CANCEL
                  </Button>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={
                      !username ||
                      !email ||
                      !password ||
                      !firstname ||
                      !studiengangId ||
                      !lastname
                    }
                  >
                    CREATE
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};
const checkoutSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  firstname: yup.string().required("firstname is required"),
  lastname: yup.string().required("lastname is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
const initialValues = {
  email: "",
  password: "",
  username: "",
  firstname: "",
  lastname: "",
};
export default AddModal;
