import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";

import Header from "../../../components/Header";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { tokens } from "../../../theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckboxTree from "react-checkbox-tree";
import { useAlert } from "react-alert";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { addExam } from "../../../redux/places/actions";
import { MultiSelect } from "react-multi-select-component";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import ExamTree from "../../../components/ExamTree";
import { getProfessorList } from "../../../redux/professor/actions";
import { getStudiengangList } from "../../../redux/studiengang/actions";
import Loader from "../../../components/Loader";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddCategoryModal = ({
  open,
  handleClose,
  examList,
  catParentid,
  setCatParentid,
  studiengangIdFromParent,
  setStudiengangIdFromParent,
}) => {
  const alert = useAlert();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { loading, error, isCreated, message, success } = useSelector(
    (state) => state.exam
  );
  const { loading: loadingProfessor, professorList } = useSelector(
    (state) => state.professor
  );
  const { loading: loadingStudiengang, studiengangList } = useSelector(
    (state) => state.studiengang
  );
  const [options, setOptions] = useState([]);
  const [prueferOption, setPrueferOption] = useState([]);
  const [professor, setProfessor] = useState([]);
  const [studiengang, setStudiengang] = useState([]);
  useEffect(() => {
    dispatch(getProfessorList());
    dispatch(getStudiengangList());
  }, [dispatch]);
  useEffect(() => {
    if (professorList) {
      setPrueferOption((prev) =>
        professorList.map((element) => ({
          label: element.lastname,
          value: element.id,
        }))
      );
    }

    if (studiengangList) {
      setOptions((prev) =>
        studiengangList.map((element) => ({
          label: element.title,
          value: element.id,
        }))
      );
    }
  }, [professorList, studiengangList]);

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [professorData, setProfessorData] = useState({
    parentId: null,
    title: "",
    datum: "",
    beginn: "",
    ende: "",
    ruecktrittbis: "",
    pruefer: "",
    semester: "",
    pruefungensnr: "",
    studiengangId: "",
    raum: "",
    credit_point: "",
  });
  const {
    parentId,
    title,
    datum,
    beginn,
    ende,
    pruefer,
    semester,
    pruefungensnr,
    studiengangId,
    raum,
    ruecktrittbis,
    credit_point,
  } = professorData;
  const renderExamsList = useCallback((exams) => {
    let myExams = [];
    if (!Array.isArray(exams)) return null;

    for (let exam of exams) {
      myExams.push({
        label: exam.title,
        value: exam.id,
        children: exam.children.length > 0 && renderExamsList(exam.children),
      });
    }
    return myExams;
  }, []);

  const handleInput = (e) => {
    setProfessorData({ ...professorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const myForrm = new FormData();

    myForrm.set("title", title);
    myForrm.set("pruefungensnr", pruefungensnr);
    if (studiengangIdFromParent) {
      myForrm.set("studiengangId", studiengangIdFromParent);
    } else {
      myForrm.set("studiengangId", studiengangId);
    }
    if (pruefer) {
      myForrm.set("pruefer", pruefer);
    }

    if (datum) {
      myForrm.set("datum", datum);
    }

    if (beginn) {
      myForrm.set("beginn", beginn);
    }
    if (ende) {
      myForrm.set("ende", ende);
    }
    if (ruecktrittbis) {
      myForrm.set("ruecktrittbis", ruecktrittbis);
    }

    if (parentId) {
      myForrm.set("parentId", parentId);
    }
    if (credit_point) {
      myForrm.set("credit_point", credit_point);
    }
    if (semester) {
      myForrm.set("semester", semester);
    }
    if (raum) {
      myForrm.set("raum", raum);
    }

    dispatch(addExam(myForrm));

    setChecked([]);
    setProfessorData({
      parentId: "",
      title: "",
      datum: "",
      beginn: "",
      ende: "",
      pruefer: "",
      semester: "",
      pruefungensnr: "",
      studiengangId: "",
      raum: "",
      ruecktrittbis: "",
      credit_point: "",
    });

    setCatParentid("");
    setStudiengangIdFromParent("");

    setProfessor([]);
    setStudiengang([]);

    handleClose();
  };
  useEffect(() => {
    if (error) alert.error(error);
    if (catParentid) {
      setProfessorData((prevData) => ({
        ...prevData,
        parentId: catParentid,
      }));
    }
    if (studiengangIdFromParent) {
      setProfessorData((prevData) => ({
        ...prevData,
        studiengangId: studiengangIdFromParent,
      }));
    }
    dispatch({ type: "clearError" });
  }, [
    error,
    alert,
    dispatch,
    catParentid,
    studiengangIdFromParent,
    setProfessorData,
  ]);

  const handleCancel = (e) => {
    setChecked([]);
    setProfessorData({
      parentId: "",
      title: "",
      datum: "",
      beginn: "",
      ende: "",
      pruefer: "",
      semester: "",
      pruefungensnr: "",
      studiengangId: "",
      raum: "",
      ruecktrittbis: "",
      credit_point: "",
    });
    setCatParentid("");
    setStudiengangIdFromParent("");
    setProfessor([]);
    setStudiengang([]);

    handleClose();
  };
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
      <Loader loading={loadingProfessor} />
      <Loader loading={loadingStudiengang} />

      <Modal open={open}>
        <Box sx={style}>
          <Header title="ADD EXAM" subtitle="create a new exam" />

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <form onSubmit={handleSubmit} className="login_form">
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="title *"
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
                    label="semester"
                    value={semester}
                    onBlur={handleBlur}
                    onChange={handleInput}
                    name="semester"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="pruefungensnr *"
                    value={values.pruefungensnr}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleInput(e);
                      handleChange(e);
                    }}
                    name="pruefungensnr"
                    error={!!touched.pruefungensnr && !!errors.pruefungensnr}
                    helperText={touched.pruefungensnr && errors.pruefungensnr}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="raum"
                    value={raum}
                    onBlur={handleBlur}
                    onChange={handleInput}
                    name="raum"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 1" }}
                  />{" "}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="credit_point"
                    value={credit_point}
                    onBlur={handleBlur}
                    onChange={handleInput}
                    name="credit_point"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 1" }}
                  />
                  {studiengangIdFromParent ? null : (
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
                            setProfessorData({
                              ...professorData,
                              studiengangId: e[0].value,
                            });
                          } else {
                            setProfessorData({
                              ...professorData,
                              studiengangId: "",
                            });
                          }
                          setStudiengang(e);
                        }}
                        labelledBy="Select"
                      />
                    </Box>
                  )}
                  <Box
                    sx={{ gridColumn: "span 1" }}
                    style={{ color: colors.greenAccent[500] }}
                  >
                    <span>Select professor</span>
                    <MultiSelect
                      isCreatable
                      className="multiSelect"
                      options={prueferOption}
                      value={professor}
                      onChange={(e) => {
                        if (e.length > 1) {
                          alert.error("select only one");
                          return;
                        }
                        if (e.length) {
                          setProfessorData({
                            ...professorData,
                            pruefer: e[0].value,
                          });
                        } else {
                          setProfessorData({
                            ...professorData,
                            pruefer: "",
                          });
                        }
                        setProfessor(e);
                      }}
                      labelledBy="Select"
                    />
                  </Box>
                  {catParentid ? null : (
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                          color={colors.greenAccent[500]}
                          variant="h5"
                        >
                          choose Parent exam
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <CheckboxTree
                          nodes={renderExamsList(examList)}
                          noCascade
                          checked={checked}
                          expanded={expanded}
                          onClick={(e) => {
                            setProfessorData({
                              ...professorData,
                              parentId: e.value,
                            });
                            if (checked.length < 1) {
                              checked.push(e.value);
                            }
                          }}
                          onCheck={(checked) => {
                            if (checked.length > 1) {
                              alert.error("you can pick only one category");
                              return;
                            }
                            setChecked(checked);

                            setProfessorData({
                              ...professorData,
                              parentId: checked[0],
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
                  )}
                  <Box
                    sx={{ gridColumn: "span 1" }}
                    style={{ color: colors.greenAccent[500] }}
                  >
                    <span>Select date</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="Basic date picker"
                          onChange={(e) => {
                            const datum = `${e.$y}-${e.$M + 1}-${e.$D}`;
                            setProfessorData({
                              ...professorData,
                              datum: datum,
                            });
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>{" "}
                  <Box
                    sx={{ gridColumn: "span 1" }}
                    style={{ color: colors.greenAccent[500] }}
                  >
                    <span>ruecktritt bis</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="Basic date picker"
                          onChange={(e) => {
                            const datum = `${e.$y}-${e.$M}-${e.$D}`;
                            setProfessorData({
                              ...professorData,
                              ruecktrittbis: datum,
                            });
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>{" "}
                  <Box
                    sx={{ gridColumn: "span 1" }}
                    style={{ color: colors.greenAccent[500] }}
                  >
                    <span>Select start time</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker"]}>
                        <TimePicker
                          label="Basic time picker"
                          onChange={(e) => {
                            const parsedDate = dayjs(e.$d);
                            const start = parsedDate.format("HH:mm");

                            setProfessorData({
                              ...professorData,
                              beginn: start,
                            });
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>{" "}
                  <Box
                    sx={{ gridColumn: "span 1" }}
                    style={{ color: colors.greenAccent[500] }}
                  >
                    <span>Select end time</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker"]}>
                        <TimePicker
                          label="Basic time picker"
                          onChange={(e) => {
                            const parsedDate = dayjs(e.$d);
                            const ende = parsedDate.format("HH:mm");

                            setProfessorData({
                              ...professorData,
                              ende: ende,
                            });
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
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
                    disabled={!studiengangId || !title || !pruefungensnr}
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
  pruefungensnr: yup.number().required("pruefungensnr is required"),
});
const initialValues = {
  title: "",
  pruefungensnr: "",
};
export default AddCategoryModal;
