// eslint-disable-next-line
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getNotenspiegel } from "../../redux/notenspiegel/actions";
import Loader from "../../components/Loader";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Stack } from "@mui/joy";
import dayjs from "dayjs";
import "./styles.css";
import axios from "axios";
import { baseURL } from "../../constants/api";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { VscCircleLargeFilled } from "react-icons/vsc";

const columnHelper = createColumnHelper();

axios.defaults.baseURL = baseURL;

axios.defaults.withCredentials = true;

const Notenspiegel = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const [pdfLink, setPdfLink] = useState("");
  const [loadPdf, setLoadPdf] = useState(false);

  const [expanded, setExpanded] = useState({});
  const sendHtmlToServer = async () => {
    try {
      setLoadPdf(true);
      const response = await axios.post(
        `${baseURL}/api/notenspiegel/generate-pdf`,
        {
          htmlContent: document.getElementById("pdf").innerHTML,
        },
        {
          responseType: "arraybuffer", // This is important to receive binary data
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(blob);
      setPdfLink(pdfUrl);
      setLoadPdf(false);

      window.open(pdfUrl, "_blank");
      // auto download
      //  const a = document.createElement('a');
      //  a.href = pdfUrl;
      //  a.download = pdfUrl+'.pdf';
      //  document.body.appendChild(a);
      //  a.click();
      //  document.body.removeChild(a);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  const { notenspiegel, loading } = useSelector((state) => state.notenspiegel);
  useEffect(() => {
    dispatch(getNotenspiegel());
  }, [dispatch]);
  const columns = [
    columnHelper.accessor("pruefungsnr", {
      id: "pruefungsnr",

      header: ({ table }) => (
        <Stack alignItems={"center"} direction="row" spacing={2}>
          {/* <Button
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
          </Button> */}
          <span>Prüfungsnr</span>
        </Stack>
      ),
      cell: ({ row, getValue }) => (
        <Stack direction="row" spacing={2}>
          {/* {row.getCanExpand() ? (
            <Button
              onClick={row.getToggleExpandedHandler()}
              color="warning"
              size="sm"
              style={{ fontSize: 16 }}
            >
              {row.getIsExpanded() ? (
                <IoIosArrowDown style={{ color: colors.greenAccent[400] }} />
              ) : (
                <IoIosArrowForward style={{ color: colors.greenAccent[400] }} />
              )}
            </Button>
          ) : (
            <Button
              onClick={row.getToggleExpandedHandler()}
              color="warning"
              size="sm"
              style={{ fontSize: 16 }}
            >
              <VscCircleLargeFilled style={{ color: colors.redAccent[200] }} />
            </Button>
          )} */}
          {row.original.pruefungsnr}
        </Stack>
      ),
    }),
    columnHelper.accessor("pruefungstext", {
      id: "pruefungstext",
      header: "pruefungstext",
      cell: ({ row }) => <Stack>{row.original.pruefungstext}</Stack>,
    }),
    columnHelper.accessor("semester", {
      id: "semester",
      header: "semester",
      cell: ({ row }) => <Stack>{row.original.semester}</Stack>,
    }),
    columnHelper.accessor("bewertung", {
      id: "bewertung",
      header: "bewertung",
      cell: ({ row }) => <Stack>{row.original.bewertung}</Stack>,
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: "status",
      cell: ({ row }) => <Stack>{row.original.status}</Stack>,
    }),

    columnHelper.accessor("credit_point", {
      id: "credit_point",
      header: "credit_point",
      cell: ({ row }) => <Stack>{row.original.cp}</Stack>,
    }),
    columnHelper.accessor("vermerk", {
      id: "vermerk",
      header: "vermerk",
      cell: ({ row }) => <Stack>{row.original.vermerk}</Stack>,
    }),
    columnHelper.accessor("versuch", {
      id: "versuch",
      header: "versuch",
      cell: ({ row }) => <Stack>{row.original.versuch}</Stack>,
    }),
    columnHelper.accessor("pruefungsdatum", {
      id: "pruefungsdatum",
      header: "datum",
      cell: ({ row }) => {
        // console.log(row.original )
        const date = row.original?.pruefungsdatum;
        const parsedDate = dayjs(date).format("YYYY-MM-DD");
        return row.original?.pruefungsdatum ? (
          <Stack>{parsedDate}</Stack>
        ) : null;
      },
    }),
  ];

  const table = useReactTable({
    data: notenspiegel || [],
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.children,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (!table.getRowModel().rows) {
      return;
    }
    const allRowIds = table.getRowModel().rows.map((row) => row.id);
    const expandedState = allRowIds.reduce((acc, rowId) => {
      acc[rowId] = true;
      return acc;
    }, {});
    setExpanded(expandedState);
  }, [table.getRowModel().rows, table]);

  return (
    <Box m="20px">
      <Loader loading={loading} />
      <Loader loading={loadPdf} />
      <Header title="Notenspiegel" subtitle="List of Invoice Balances" />
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
        }}
      >
        <div id="pdf">
          <table>
            <caption>
              Abschluss: [84] Bachelor Studiengang: [222] Informationstechnik
            </caption>
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
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <th
                      key={cell.id}
                      style={{
                        display:
                          row.original.children.length === 0 &&
                          !row.original.semester &&
                          "none",
                        backgroundColor:
                          row?.original?.children?.length === 0
                            ? "rgb(100, 100, 144)"
                            : "",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button onClick={sendHtmlToServer} href={pdfLink}>
            Generate PDF
          </button>
        </div>
      </Box>
    </Box>
  );
};

export default Notenspiegel;
