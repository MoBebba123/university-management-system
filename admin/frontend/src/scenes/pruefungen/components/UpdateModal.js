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
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Header from "../../../components/Header";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { tokens } from "../../../theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckboxTree from "react-checkbox-tree";
import { useAlert } from "react-alert";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { addExam, updateExam } from "../../../redux/places/actions";
import { MultiSelect } from "react-multi-select-component";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { getProfessorList } from "../../../redux/professor/actions";
import { getStudiengangList } from "../../../redux/studiengang/actions";
import Loader from "../../../components/Loader";
import dayjs from "dayjs";
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

const UpdateModal = ({ open, handleClose, examList, initialValues, exam }) => {
  const alert = useAlert();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();
  const { loading: loadingProfessor, professorList } = useSelector(
    (state) => state.professor
  );
  const { loading: loadingStudiengang, studiengangList } = useSelector(
    (state) => state.studiengang
  );

  const { loading, error, isCreated, message, success } = useSelector(
    (state) => state.exam
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
  const [deleteParentId, setDeleteParentId] = useState(false);

  const [expanded, setExpanded] = useState([]);
  const [professorData, setProfessorData] = useState({
    parentId: "",
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
  useEffect(() => {
    const date = dayjs(exam.datum).format("YYYY-MM-DD");
    const rueckstritt = dayjs(exam.ruecktrittbis).format("YYYY-MM-DD");
    setProfessorData({
      ...exam,
      datum: exam.datum ? date : null,
      ruecktrittbis: exam.ruecktrittbis ? rueckstritt : null,
    });
  }, [exam, setProfessorData]);
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

  const handelSubmit = (e) => {
    if (e) e.preventDefault();
    const myForrm = new FormData();
    myForrm.set("title", title);
    myForrm.set("pruefungensnr", pruefungensnr);
    if (studiengang[0]?.value) {
      myForrm.set("studiengangId", studiengang[0]?.value);
    } else {
      myForrm.set("studiengangId", studiengangId);
    }

    if (professor[0]?.value) {
      myForrm.set("pruefer", professor[0]?.value);
    } else if (pruefer !== null) {
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

    dispatch(updateExam(exam.id, myForrm));

    setProfessor([]);
    setStudiengang([]);
    setChecked([]);

    handleClose();
  };
  useEffect(() => {
    if (error) alert.error(error);

    dispatch({ type: "clearError" });
  }, [
    loading,
    error,
    isCreated,
    message,
    success,
    alert,
    dispatch,
    professorData,
  ]);

  const handleCancel = (e) => {
    setChecked([]);

    handleClose();
  };
  return (
    <>
      <Modal open={open} style={{}}>
        <Box sx={style}>
          <Header title="UPDATE EXAM" subtitle="update your exam" />
          <Box
            sx={{ gridColumn: "span 1", paddingBottom: "10px" }}
            style={{ color: colors.greenAccent[500] }}
          >
            {exam.id}
          </Box>
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
                    label="title"
                    value={title}
                    onBlur={handleBlur}
                    onChange={handleInput}
                    name="title"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
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
                    label="pruefungensnr"
                    value={pruefungensnr}
                    onBlur={handleBlur}
                    onChange={handleInput}
                    name="pruefungensnr"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
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
                  <Box
                    sx={{ gridColumn: "span 1" }}
                    style={{ color: colors.greenAccent[500] }}
                  >
                    <span>Select studiengang</span>
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
                  <Box
                    sx={{ gridColumn: "span 1" }}
                    style={{ color: colors.greenAccent[500] }}
                  >
                    {pruefer ? (
                      <>
                        <Typography
                          color={colors.greenAccent[500]}
                          variant="h5"
                        >
                          current pruefer:{" "}
                          {exam.pruefer_firstname + " " + exam.pruefer_lastname}
                        </Typography>
                        <Button
                          sx={{ margin: "10px" }}
                          color="warning"
                          variant="contained"
                          onClick={() => {
                            setProfessorData({
                              ...professorData,
                              pruefer: null,
                            });
                          }}
                        >
                          remove
                        </Button>
                      </>
                    ) : (
                      <Typography color={colors.greenAccent[500]} variant="h5">
                        no pruefer
                      </Typography>
                    )}
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
                  <Box
                    sx={{ gridColumn: "span 1" }}
                    style={{ color: colors.greenAccent[500] }}
                  >
                    {parentId ? (
                      <>
                        <Typography
                          color={colors.greenAccent[500]}
                          variant="h5"
                        >
                          current parentId: {parentId}
                        </Typography>
                        <Button
                          sx={{ margin: "10px" }}
                          color="warning"
                          variant="contained"
                          onClick={() => {
                            setProfessorData({
                              ...professorData,
                              parentId: null,
                            });
                          }}
                        >
                          remove
                        </Button>
                      </>
                    ) : (
                      <Typography color={colors.greenAccent[500]} variant="h5">
                        no parentId
                      </Typography>
                    )}
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
                  </Box>
                  <Box
                    sx={{ gridColumn: "span 1" }}
                    style={{ color: colors.greenAccent[500] }}
                  >
                    {datum ? (
                      <>
                        <span>
                          exams date: {dayjs(datum).format("YYYY-MM-DD")}
                        </span>
                        <Button
                          sx={{ margin: "10px" }}
                          color="warning"
                          variant="contained"
                          onClick={() => {
                            setProfessorData({
                              ...professorData,
                              datum: null,
                            });
                          }}
                        >
                          remove
                        </Button>
                      </>
                    ) : (
                      <span>not specified</span>
                    )}
                    <br />
                    <span>update exams date</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          slotProps={{
                            actionBar: {
                              actions: ["clear"],
                            },
                          }}
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
                    {ruecktrittbis ? (
                      <>
                        <span>
                          exams ruecktrittbis:
                          {dayjs(ruecktrittbis).format("YYYY-MM-DD")}
                        </span>
                        <Button
                          sx={{ margin: "10px" }}
                          color="warning"
                          variant="contained"
                          onClick={() => {
                            setProfessorData({
                              ...professorData,
                              ruecktrittbis: null,
                            });
                          }}
                        >
                          remove
                        </Button>
                      </>
                    ) : (
                      <span>not specified</span>
                    )}
                    <br />
                    <span>update exams ruecktrittbis</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="Basic date picker"
                          onChange={(e) => {
                            const datum = `${e.$y}-${e.$M + 1}-${e.$D}`;
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
                    {beginn ? (
                      <>
                        <span>exams start time: {beginn}</span>
                        <Button
                          sx={{ margin: "10px" }}
                          color="warning"
                          variant="contained"
                          onClick={() => {
                            setProfessorData({
                              ...professorData,
                              beginn: null,
                            });
                          }}
                        >
                          remove
                        </Button>
                      </>
                    ) : (
                      <span>not specified</span>
                    )}
                    <br />
                    <span>update start time</span>
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
                    {ende ? (
                      <>
                        <span>exams ende time: {ende}</span>
                        <Button
                          sx={{ margin: "10px" }}
                          color="warning"
                          variant="contained"
                          onClick={() => {
                            setProfessorData({
                              ...professorData,
                              ende: null,
                            });
                          }}
                        >
                          remove
                        </Button>
                      </>
                    ) : (
                      <span>not specified</span>
                    )}
                    <br />
                    <span>update end time</span>
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
