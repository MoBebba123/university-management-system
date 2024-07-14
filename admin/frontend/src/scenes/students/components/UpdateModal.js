import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import Loader from "../../../components/Loader";
import { tokens } from "../../../theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckboxTree from "react-checkbox-tree";
import { useAlert } from "react-alert";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

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

const UpdateModal = ({
  open,
  handleClose,
  categoryList,
  initialValues,
  category,
  loading,
}) => {
  const renderCategoriesList = useCallback(
    (categories) => {
      let myCategories = [];
      if (!Array.isArray(categories)) return null;
      categories = categories.filter((cat) => cat.id !== category.id);
      for (let category of categories) {
        myCategories.push({
          label: category.name,
          value: category.id,
          children:
            category.children.length > 0 &&
            renderCategoriesList(category.children),
        });
      }
      return myCategories;
    },
    [category.id]
  );
  const theme = useTheme();
  const alert = useAlert();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [newCategoryData, setNewCategoryData] = useState({
    name: category.name,
    parentid: category.parentid,
    img: category.image_url,
    public_id: category.image_public_id,
  });

  const { name, parentid, img, public_id } = newCategoryData;
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(img);

  useEffect(() => {
    setNewCategoryData({
      name: category.name,
      parentid: category.parentid,
      img: category.image_url,
      public_id: category.image_public_id,
    });
  }, [
    category.name,
    category.parentid,
    category.image_url,
    category.image_public_id,
  ]);
  const handelSubmit = (e) => {
    if (e) e.preventDefault();
    const form = new FormData();

    form.set("name", name);
    if (parentid) form.set("parentid", parentid);
    if (image) {
      form.set("image", image);
      form.set("public_id", public_id);
    }

    // dispatch(updateCategory(category.id, form));

    setChecked([]);
    setImagePreview("");
    dispatch({ type: "clearMessage" });
    dispatch({ type: "resetData" });
    handleClose();
  };

  const handleInput = (e) => {
    setNewCategoryData({ ...newCategoryData, [e.target.name]: e.target.value });
  };
  const [isReady, setIsReady] = useState(false);
  const createProductImagesChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadstart = (e) => {
      setIsReady(true);
    };
    reader.onloadend = (e) => {
      setIsReady(false);
    };
    reader.onload = (event) => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Loader loading={isReady} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header title="UPDATE CATEGORY" subtitle={category.name} />

          <Formik
            onSubmit={() => {}}
            initialValues={initialValues}
            validationSchema={initialValues}
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
                    label="name"
                    value={name}
                    onBlur={handleBlur}
                    onChange={handleInput}
                    name="name"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 1" }}
                  />

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography color={colors.greenAccent[500]} variant="h5">
                        Change Parent category
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <CheckboxTree
                        nodes={renderCategoriesList(categoryList)}
                        noCascade
                        checked={checked}
                        expanded={expanded}
                        onClick={(e) => {
                          if (checked.length < 1) {
                            setNewCategoryData({
                              ...newCategoryData,
                              parentid: e.value,
                            });
                            checked.push(e.value);
                          } else {
                            alert.error("you can pick only one category");
                          }
                        }}
                        onCheck={(checked) => {
                          if (checked.length > 1) {
                            alert.error("you can pick only one category");
                            return;
                          }
                          setChecked(checked);

                          setNewCategoryData({
                            ...newCategoryData,
                            parentid: checked[0],
                          });
                        }}
                        onExpand={(expanded) => setExpanded(expanded)}
                        icons={{
                          check: <IoIosCheckbox style={{}} />,
                          uncheck: <IoIosCheckboxOutline style={{}} />,
                          halfCheck: <IoIosCheckboxOutline style={{}} />,
                          expandClose: <IoIosArrowForward style={{}} />,
                          expandOpen: <IoIosArrowDown />,
                        }}
                      />
                    </AccordionDetails>
                  </Accordion>
                  {imagePreview ? (
                    <Box id="createProductFormImage">
                      <img src={imagePreview} alt="category" />
                    </Box>
                  ) : category.image_url ? (
                    <Box id="createProductFormImage">
                      <img src={category.image_url} alt="category" />
                    </Box>
                  ) : (
                    <p>No image</p>
                  )}
                  <TextField
                    type="file"
                    onBlur={handleBlur}
                    name="avatar"
                    accept="image/*"
                    onChange={createProductImagesChange}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    UPDATE
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

export default UpdateModal;
