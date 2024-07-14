import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import ExamTree from "../../components/ExamTree";
import Loader from "../../components/Loader";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { getExams } from "../../redux/exams/actions";
import { getRegisteredExams } from "../../redux/anmeldeList/actions";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const alert = useAlert();
  const dispatch = useDispatch();

  const { examList, loading } = useSelector((state) => state.exam);
  const {
    loading: loadingCreate,
    isCreated,
    message,
    isDeleted,
    error,
    anmeldeliste,
  } = useSelector((state) => state.anmeldeListe);
  useEffect(() => {
    dispatch(getExams());
    dispatch(getRegisteredExams());
  }, [dispatch]);
  useEffect(() => {
    if (error) alert.error(error);
    if (isCreated) {
      dispatch(getRegisteredExams());

      alert.success(message);
    }
    if (isDeleted) {
      alert.success(message);

      dispatch(getRegisteredExams());
    }
    dispatch({ type: "resetExamRegistrationData" });
  }, [alert, error, isCreated, message, isDeleted, dispatch]);

  function removeEmptyChildren(exams) {
    return exams.reduce((acc, exam) => {
      if (exam.children && exam.children.length > 0) {
        // Recursively remove empty children
        const updatedExam = {
          ...exam,
          children: removeEmptyChildren(exam.children),
        };
        acc.push(updatedExam);
      }
      return acc;
    }, []);
  }

  // Example usage
  const filteredExams = removeEmptyChildren(examList);

  return (
    <>
      <Loader loading={loading} />
      <Loader loading={loadingCreate} />
      <Box m="20px">
        <Header title="Pruefungen" subtitle="preufungen an/abmelden" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <ExamTree
            exams={examList}
            anmeldeliste={anmeldeliste}
            filteredExams={filteredExams}
          />
        </Box>
      </Box>
    </>
  );
};

export default Team;
