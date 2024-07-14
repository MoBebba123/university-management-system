import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import "./categories.css";
import { Button, useTheme, Box } from "@mui/material";
import AddModal from "./components/AddModal";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";
import { useAlert } from "react-alert";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { getProfessorList } from "../../redux/professor/actions";
import { deleteStudent, getStudentList } from "../../redux/student/actions";

const Students = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);
  const { studentList, loading, isCreated, isUpdated, isDeleted, message } =
    useSelector((state) => state.student);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentList());
  }, [dispatch]);
  useEffect(() => {
    if (isCreated || isUpdated || isDeleted) {
      dispatch(getStudentList());

      dispatch({ type: "resetStudent" });
    }
    if (message) alert.success(message);
  }, [isCreated, isDeleted, isUpdated, message, alert, dispatch]);
  const columns = [
    { field: "id", headerName: "ID", flex: 2 },
    { field: "username", headerName: "username", flex: 1.5 },
    { field: "firstname", headerName: "firstname", flex: 1.5 },
    { field: "lastname", headerName: "lastname", flex: 1.5 },
    { field: "email", headerName: "email", flex: 1.5 },
    { field: "studiengangId", headerName: "studiengangId", flex: 1.5 },

    {
      field: "created_at",
      headerName: "created_at",
      flex: 1,
    },
    {
      field: "updated_at",
      headerName: "updated_at",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>{row.updated_at ? <span>{row.updated_at}</span> : "not updated"}</>
        );
      },
    },
    {
      field: "actions",
      headerName: "actions",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            gap="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            <Button
              onClick={(e) => {
                navigate(`/products/${row.id}`, { state: { id: row.id } });
              }}
              style={{ backgroundColor: colors.greenAccent[500] }}
            >
              <EditIcon />
            </Button>
            <Button
              style={{
                backgroundColor: colors.redAccent[500],
              }}
              onClick={(e) => {
                e.preventDefault();
                const isConfirmed = window.confirm(
                  `are you sure you want to delete ${row.firstname}`
                );
                if (isConfirmed) dispatch(deleteStudent(row.id));
              }}
            >
              <DeleteIcon />
            </Button>
          </Box>
        );
      },
    },
  ];
  let rows = [];
  studentList?.forEach((student) => {
    rows.push({
      id: student.id,
      username: student.username,
      email: student.email,
      firstname: student.firstname,
      lastname: student.lastname,
      studiengangId: student.studiengangId,
      created_at: student.created_at,
      updated_at: student.updated_at,
    });
  });

  return (
    <div>
      <div className="container">
        <Loader loading={loading} />
        <Button
          onClick={handleOpen}
          className="addButton"
          color="secondary"
          variant="contained"
        >
          ADD
        </Button>
        <AddModal open={open} handleClose={handleClose} loading={loading} />
        {/* <Updateodal
          open={openUpdate}
          handleClose={handleCloseUpdate}
          loading={loading}
        /> */}
        <Box m="20px" display={"flex"} flexDirection={"column"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Header title="STUDENTS" subtitle="Managing the STUDENTS" />
          </Box>
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
              checkboxSelection
              editMode="row"
              onEditRowsModelChange={(e) => console.log(e)}
              rows={rows}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>{" "}
      </div>
    </div>
  );
};

export default Students;
