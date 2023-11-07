/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, LinearProgress, Paper, Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getFileById } from "../../store/actionCreators/File.AC";
import LogoutButton from "../../components/LogoutButton";

const File: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { file } = useAppSelector((state) => state.fileReducer);
  const dispatch = useAppDispatch();

  const [excelData, setExcelData] = useState<any[]>([]);
  const headers = useMemo<GridColDef[]>(
    () => [
      { field: "age", headerName: "Age" },
      { field: "job", headerName: "Job" },
      { field: "marital", headerName: "Marital" },
      { field: "education", headerName: "Education" },
      { field: "default", headerName: "Default" },
      { field: "housing", headerName: "Housing" },
      { field: "loan", headerName: "Loan" },
      { field: "contact", headerName: "Contact" },
      { field: "month", headerName: "Month", width: 70 },
      { field: "day_of_week", headerName: "Day of week" },
      { field: "duration", headerName: "Duration" },
      { field: "campaign", headerName: "Campaign" },
      { field: "pdays", headerName: "Pdays" },
      { field: "previous", headerName: "Previous" },
      { field: "poutcome", headerName: "Poutcome" },
      { field: "emp.var.rate", headerName: "Emp.var.rate" },
      { field: "cons.price.idx", headerName: "Cons.price.idx" },
      { field: "cons.conf.idx", headerName: "Cons.conf.idx" },
      { field: "euribor3m", headerName: "Euribor3m" },
      { field: "nr.employed", headerName: "Nr.employed" },
      { field: "y", headerName: "Y" },
    ],
    []
  );

  useEffect(() => {
    dispatch(getFileById({ id: Number(id) }));
  }, []);

  useEffect(() => {
    if (file) {
      const excelFile = XLSX.read(file);
      const sheet = excelFile.Sheets[excelFile.SheetNames[0]];
      const excelJson = XLSX.utils.sheet_to_json(sheet);
      const excelJsonWithId = excelJson.map((item: any, index) => ({
        ...item,
        id: index + 1,
      }));
      setExcelData(excelJsonWithId);
    }
  }, [file]);

  return (
    <Container sx={{ paddingTop: "5%" }}>
      <Box position={"fixed"} top={10} left={10}>
        <Button variant="contained" onClick={() => navigate("/userFiles")}>
          Back
        </Button>
      </Box>
      <LogoutButton />
      {excelData.length === 0 ? (
        <LinearProgress />
      ) : (
        <Paper elevation={2} sx={{ padding: 2 }}>
          <DataGrid
            columns={headers}
            rows={excelData}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            pageSizeOptions={[20, 40]}
          />
        </Paper>
      )}
    </Container>
  );
};

export default File;
