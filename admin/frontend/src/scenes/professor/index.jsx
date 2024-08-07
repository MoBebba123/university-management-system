import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import "./categories.css";
import { Button, useTheme, Box } from "@mui/material";
import AddStudiengangModal from "./components/AddStudiengangModal";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";
import { useAlert } from "react-alert";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
  deleteProfessor,
  getProfessorList,
} from "../../redux/professor/actions";
import { getPlaces } from "../../redux/places/actions";

const Professor = () => {
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
  const { placeList, loading, isCreated, isUpdated, isDeleted, message } =
    useSelector((state) => state.places);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlaces());
  }, [dispatch]);
  useEffect(() => {
    if (isCreated || isDeleted || isUpdated) {
      dispatch(getPlaces());

      dispatch({ type: "resetProfessor" });
    }
    if (message) alert.success(message);
  }, [isCreated, isDeleted, isUpdated, message, alert, dispatch]);
  const columns = [
    { field: "id", headerName: "ID", flex: 2 },
    { field: "name", headerName: "name", flex: 1 },
    { field: "city", headerName: "city", flex: 1 },
    { field: "lat", headerName: "lat", flex: 1 },
    { field: "lon", headerName: "lon", flex: 1 },

    {
      field: "created_at",
      headerName: "created_at",
      flex: 1.5,
    },
    {
      field: "updated_at",
      headerName: "updated_at",
      flex: 1.5,
      renderCell: ({ row }) => {
        return (
          <>{row.updated_at ? <span>{row.updated_at}</span> : "not updated"}</>
        );
      },
    },
    {
      field: "actions",
      headerName: "actions",
      flex: 1.5,
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
                navigate(`/products/${row.id}`, { state: { _id: row._id } });
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
                  `are you sure you want to delete ${row.name}`
                );
                if (isConfirmed) dispatch(deleteProfessor(row.id));
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
  placeList?.forEach((place) => {
    rows.push({
      id: place._id,

      city: place.city,
      name: place.name,
      lat: place.location.coordinates[0],
      lon: place.location.coordinates[1],
      created_at: place.created_at,
      updated_at: place.updated_at,
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
        <AddStudiengangModal
          open={open}
          handleClose={handleClose}
          loading={loading}
        />
        {/* <UpdateStudiengangModal
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
            <Header title="Place List" subtitle="Manage yout places" />
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

export default Professor;
