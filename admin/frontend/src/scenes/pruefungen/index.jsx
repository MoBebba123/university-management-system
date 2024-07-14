import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loader";
import "./categories.css";
import { Button, useTheme } from "@mui/material";
import AddModal from "./components/AddModal";
import UpdateModal from "./components/UpdateModal";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { VscCircleLargeFilled } from "react-icons/vsc";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Stack } from "@mui/joy";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";
import { useAlert } from "react-alert";
import formatDate from "../../hooks/useFormatDate";
import {
  deleteExam,
  getExamById,
  getExams,
  getPlaces,
  updateExam,
} from "../../redux/places/actions";
import dayjs from "dayjs";
const columnHelper = createColumnHelper();

const Studiengang = () => {
  const alert = useAlert();
  let [examToUpdate, setExamToUpdate] = useState({});
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
  console.log(placeList);
  useEffect(() => {
    if (isCreated || isUpdated || isDeleted) {
      dispatch(getPlaces());
      dispatch({ type: "resetExamData" });
    }
    if (message) alert.success(message);
  }, [isCreated, isUpdated, isDeleted, message, alert, dispatch]);
  const [parentid, setParentid] = useState("");
  const [expanded, setExpanded] = useState({});
  const [studiengangId, setStudiengangId] = useState("");
  const itemToUpdate = useRef(null);

  const handleDragStart = (e, item) => {
    itemToUpdate.current = item;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const columns = [
    columnHelper.accessor("title", {
      id: "title",

      header: ({ table }) => (
        <Stack alignItems={"center"} direction="row" spacing={2}>
          <Button
            onClick={table.getToggleAllRowsExpandedHandler()}
            color="warning"
            size="sm"
            style={{ fontSize: 16 }}
          >
            {table.getIsAllRowsExpanded() ? (
              <IoIosArrowDown style={{ color: colors.greenAccent[400] }} />
            ) : (
              <IoIosArrowForward style={{ color: colors.greenAccent[400] }} />
            )}
          </Button>
          <span>title</span>
        </Stack>
      ),
      cell: ({ row, getValue }) => {
        return (
          <Stack
            direction="row"
            spacing={2}
            sx={{ paddingLeft: `${row.depth * 2}rem` }}
          >
            {row.getCanExpand() ? (
              <Button
                onClick={row.getToggleExpandedHandler()}
                color="warning"
                size="sm"
                style={{ fontSize: 16 }}
              >
                {row.getIsExpanded() ? (
                  <IoIosArrowDown style={{ color: colors.greenAccent[400] }} />
                ) : (
                  <IoIosArrowForward
                    style={{ color: colors.greenAccent[400] }}
                  />
                )}
              </Button>
            ) : (
              <Button
                onClick={row.getToggleExpandedHandler()}
                color="warning"
                size="sm"
                style={{ fontSize: 16 }}
              >
                <VscCircleLargeFilled
                  style={{ color: colors.redAccent[200] }}
                />
              </Button>
            )}
            {row.original.title}
          </Stack>
        );
      },
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: "id",
      cell: ({ row }) => <Stack>{row.original.id}</Stack>,
    }),
    columnHelper.accessor("datum", {
      id: "datum",
      header: "datum",
      cell: ({ row }) => {
        const date = row.original?.datum;
        const parsedDate = dayjs(date).format("YYYY-MM-DD");
        return row.original?.datum ? <Stack>{parsedDate}</Stack> : null;
      },
    }),
    columnHelper.accessor("beginn", {
      id: "beginn",
      header: "beginn",
      cell: ({ row }) => <Stack>{row.original.beginn}</Stack>,
    }),
    columnHelper.accessor("ende", {
      id: "ende",
      header: "ende",
      cell: ({ row }) => <Stack>{row.original.ende}</Stack>,
    }),
    columnHelper.accessor("pruefer", {
      id: "pruefer",
      header: "pruefer",
      cell: ({ row }) =>
        row.original.pruefer ? (
          <Stack>
            {row.original.pruefer_firstname +
              " " +
              row.original.pruefer_lastname}
          </Stack>
        ) : (
          ""
        ),
    }),
    columnHelper.accessor("semester", {
      id: "semester",
      header: "semester",
      cell: ({ row }) => <Stack>{row.original.semester}</Stack>,
    }),
    columnHelper.accessor("pruefungensnr", {
      id: "pruefungensnr",
      header: "pruefungensnr",
      cell: ({ row }) => <Stack>{row.original.pruefungensnr}</Stack>,
    }),
    columnHelper.accessor("studiengang", {
      id: "studiengang",
      header: "studiengang",
      cell: ({ row }) => <Stack>{row.original.studiengangstitle}</Stack>,
    }),
    columnHelper.accessor("raum", {
      id: "raum",
      header: "raum",
      cell: ({ row }) => <Stack>{row.original.raum}</Stack>,
    }),
    columnHelper.accessor("ruecktrittbis", {
      id: "ruecktrittbis",
      header: "ruecktrittbis",
      cell: ({ row }) => {
        const date = row.original?.ruecktrittbis || null;
        const parsedDate = dayjs(date).format("YYYY-MM-DD");
        return row.original?.ruecktrittbis ? <Stack>{parsedDate}</Stack> : null;
      },
    }),
    columnHelper.accessor("credit_point", {
      id: "credit_point",
      header: "credit_point",
      cell: ({ row }) => <Stack>{row.original.credit_point}</Stack>,
    }),

    columnHelper.accessor("created_at", {
      id: "created_at",
      header: "created_at",
      cell: ({ row }) => {
        const date = formatDate(row.original.created_at);
        return <Stack>{date}</Stack>;
      },
    }),
    columnHelper.accessor("updated_at", {
      id: "updated_at",
      header: "updated_at",
      cell: ({ row }) => {
        const date = formatDate(row.original.updated_at);
        return <Stack>{row.original.updated_at ? date : "Not Updated"}</Stack>;
      },
    }),

    columnHelper.accessor("action", {
      id: "action",
      header: "Actions",
      cell: ({ row }) => (
        <Stack justifyContent={"center"} direction={"row"} spacing={1}>
          <Button
            style={{
              backgroundColor: colors.blueAccent[500],
            }}
            onClick={(e) => {
              setParentid(row.original.id);
              setStudiengangId(row.original.studiengangId);
              handleOpen();
            }}
          >
            <AddIcon />
          </Button>
          <Button
            onClick={(e) => {
              setExamToUpdate(row.original);
              handleOpenUpdate();
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
              if (
                window.confirm(
                  `are you sure you want to delete ${row.original.title}`
                )
              ) {
                dispatch(deleteExam(row.original.id));
              }
            }}
          >
            <DeleteIcon />
          </Button>
        </Stack>
      ),
    }),
  ];
  // const table = useReactTable({
  //   data: examList,
  //   columns,
  //   state: {
  //     expanded,
  //   },

  //   onExpandedChange: setExpanded,
  //   getExpandedRowModel: getExpandedRowModel(),
  //   getSubRows: (row) => row.children,
  //   getCoreRowModel: getCoreRowModel(),
  // });
  return (
    <div>
      <Loader loading={loading} />
      {/* <div className="container">
        <Loader loading={loading} />
        <Button
          onClick={handleOpen}
          className="addButton"
          color="secondary"
          variant="contained"
        >
          ADD
        </Button>
        <AddModal
          open={open}
          catParentid={parentid}
          studiengangIdFromParent={studiengangId}
          setStudiengangIdFromParent={setStudiengangId}
          setCatParentid={setParentid}
          handleClose={handleClose}
          examList={examList}
        />
        <UpdateModal
          open={openUpdate}
          handleClose={handleCloseUpdate}
          exam={examToUpdate}
          examList={examList}
        />
        <table>
          <caption>PRUEFUNGEN TABLE</caption>
          <thead
            style={{
              backgroundColor: "rgb(127, 147, 198)",
              position: "sticky",
              top: 0,
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} draggable id="list">
                {row.getVisibleCells().map((cell) => (
                  <th key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default Studiengang;
