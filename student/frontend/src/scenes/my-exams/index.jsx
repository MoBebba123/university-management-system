import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { useEffect } from "react";
import { getRegisteredExams } from "../../redux/anmeldeList/actions";
const MyExams = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const { loading, anmeldeliste } = useSelector((state) => state.anmeldeListe);
  const columns = [
    { field: "id", headerName: "id", flex: 0.5, hide: true },

    { field: "Pruefungsnr", headerName: "Pruefungsnr", flex: 1 },
    { field: "pruefungstitle", headerName: "Prüfungstext", flex: 1 },
    {
      field: "prueferLastname",
      headerName: "Prüfer/-in",
      flex: 0.5,
    },
    {
      field: "semester",
      headerName: "Semester",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "anmeldedatum",
      headerName: "Anmeldedatum",
      flex: 1,
    },

    {
      field: "datum",
      headerName: "Prüfungsdatum",
      flex: 1,
    },
    {
      field: "beginn",
      headerName: "Beginn",
      flex: 1,
    },
    {
      field: "raum",
      headerName: "Raum",
      flex: 1,
    },
    {
      field: "ruecktrittbis",
      headerName: "Rücktritt bis",
      flex: 1,
    },
  ];
  useEffect(() => {
    dispatch(getRegisteredExams());
  }, [dispatch]);

  let rows = [];
  console.log(anmeldeliste);
  anmeldeliste?.forEach((list) => {
    rows.push({
      id: list.id,
      Pruefungsnr: list.Pruefungsnr,
      datum: list.datum,
      pruefungstitle: list.pruefungstitle,
      prueferLastname: list.prueferLastname,
      semester: list.semester,
      anmeldedatum: list.anmeldedatum,
      beginn: list.beginn,
      raum: list.raum,
      ruecktrittbis: list.ruecktrittbis,
    });
  });
  return (
    <>
      <Loader loading={loading} />
      <Box m="20px">
        <Header
          title="MyExams"
          subtitle="List of MyExams for Future Reference"
        />
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
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </>
  );
};

export default MyExams;
