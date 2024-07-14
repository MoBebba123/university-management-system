import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import React, { useCallback, useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { tokens } from "../../../theme";
import { useAlert } from "react-alert";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { createStudiengang } from "../../../redux/studiengang/actions";
import Loader from "../../../components/Loader";
import * as yup from "yup";

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

const AddStudiengangModal = ({
  open,
  handleClose,
  categoryList,
  catParentid,
  setCatParentid,
}) => {
  const alert = useAlert();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { loading, error, isCreated, message } = useSelector(
    (state) => state.studiengang
  );
  const [studiengangData, setStudiengangData] = useState({
    title: "",
    po_version: "",
  });
  const { title, po_version } = studiengangData;
  const handleInput = (e) => {
    setStudiengangData({ ...studiengangData, [e.target.name]: e.target.value });
  };
  const handelSubmit = (e) => {
    if (e) e.preventDefault();

    const myForrm = new FormData();
    myForrm.set("title", title);
    myForrm.set("po_version", po_version);
    dispatch(createStudiengang(myForrm));
    setStudiengangData({
      title: "",
      po_version: "",
    });
    handleClose();
  };

  const handleCancel = (e) => {
    setStudiengangData({
      title: "",
      po_version: "",
    });
    handleClose();
  };
  return (
    <>
      <Loader loading={loading} />
      <Modal open={open} style={{}}>
        <Box sx={style}>
          <Header title="ADD STUDIENGANG" subtitle="create a new studiengang" />

          <Formik
            onSubmit={() => {}}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
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
                    label="title"
                    value={values.title}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleInput(e);
                      handleChange(e);
                    }}
                    name="title"
                    error={!!touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="po_version"
                    value={values.po_version}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleInput(e);
                      handleChange(e);
                    }}
                    name="po_version"
                    error={!!touched.po_version && !!errors.po_version}
                    helperText={touched.po_version && errors.po_version}
                    sx={{ gridColumn: "span 1" }}
                  />
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
                    disabled={!title || !po_version}
                    type="submit"
                    color="secondary"
                    variant="contained"
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
  title: yup.string().required("title is required"),
  po_version: yup.string().required("po_version is required"),
});
const initialValues = {
  title: "",
  po_version: "",
};
export default AddStudiengangModal;
