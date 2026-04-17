import React, { useEffect, useState } from "react";
import AppBarr from "./appBar";
import NavBar from "./NavBar";
import {
  Box,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getLeaveDataActionInitiate } from "../redux/actions/getLeaveAction";
import { Theme } from "../GlobalStyles";
import Colors from "../colors";
import Loader from "./Loader";
import CommonButton from "./CommonButton";

export default function EmployeeLeave() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  const data = useSelector((state) => state.getleavereducer?.data) || [];

  const userEmail = localStorage.getItem("email");

  const filteredData = data.filter(
    (item) => item.email === userEmail
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(getLeaveDataActionInitiate());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const getStatusColor = (status) => {
    if (status === "approved") return "success";
    if (status === "rejected") return "error";
    return "warning";
  };
  if (loading) return <Loader />;

  return (
    <>
      <AppBarr roled="employee" />
      <NavBar />
      <Box
        sx={{
          bgcolor: Colors.background,
          height: 670,




        }}
      >


        <Box
          sx={{
            p: 2,
            mt: 7,
            ml: { md: "240px" },

          }}
        >

          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: "bold",
              bgcolor: Colors.view,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            My Leave Status
          </Typography>


          {isMobile ? (
            filteredData.length === 0 ? (
              <Typography align="center" color="text.secondary">
                No Leaves Found
              </Typography>
            ) : (
              filteredData.map((item) => (
                <Card
                  key={item.id}
                  sx={{
                    mb: 2,
                    borderRadius: 3,
                    boxShadow: 3
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography sx={{ fontSize: Theme.font14Bold, color: Colors.black }}>
                        <b>Name:</b>
                      </Typography>

                      <Typography sx={{ fontSize: Theme.font16SemiBold, color: Colors.blue }}>
                        {item.employeename}
                      </Typography>
                    </Box>


                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography sx={{ fontSize: Theme.font14Bold, color: Colors.black }}>
                        <b>LeaveType:</b>
                      </Typography>

                      <Typography sx={{ fontSize: Theme.font16SemiBold, color: Colors.blue }}>
                        {item.leaveType}
                      </Typography>
                    </Box>


                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography sx={{ fontSize: Theme.font14Bold, color: Colors.black }}>
                        <b>Date:</b>
                      </Typography>

                      <Typography sx={{ fontSize: Theme.font16SemiBold, color: Colors.blue }}>
                        {item.fromDate} → {item.toDate}
                      </Typography>
                    </Box>



                    <Box sx={{ mt: 1 }}>
                      <Chip
                        label={item.status || "pending"}
                        color={getStatusColor(item.status)}
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))
            )
          ) : (

            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 4,
                boxShadow: 2,
                width: "70%",
                mx: "auto"
              }}
            >
              <Table>
                <TableHead
                  sx={{
                    bgcolor: Colors.headings,height:50
                  }}
                >
                  <TableRow>
                    <TableCell align="center" sx={{ fontSize: Theme.font16Bold, color: Colors.white }}>
                      S.No
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: Theme.font16Bold, color: Colors.white }}>
                      Name
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: Theme.font16Bold, color: Colors.white }}>
                      Leave Type
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: Theme.font16Bold, color: Colors.white }}>
                      FromDate
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: Theme.font16Bold, color: Colors.white }}>
                      ToDate
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: Theme.font16Bold, color: Colors.white }}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No Leaves Found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.map((item, index) => (
                      <TableRow key={item.id} hover>
                        <TableCell align="center">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">
                          {item.employeename}
                        </TableCell>
                        <TableCell align="center">
                          {item.leaveType}
                        </TableCell>
                        <TableCell align="center">
                          {item.fromDate}
                        </TableCell>
                        <TableCell align="center">
                          {item.toDate}
                        </TableCell>
                        <TableCell align="center">
                          <CommonButton
                            variant="contained"
                            size="small"
                            sx={{
                              textTransform: "capitalize",
                               fontSize:Theme.font12Bold,
                              borderRadius: "20px",
                              // px: 2,
                              py: 0.5,
                             

                              backgroundColor:
                                item.status === "approved"
                                  ? "#4caf50"
                                  : item.status === "rejected"
                                    ? "#f44336"
                                    : "#ff9800",

                              color: "#fff",

                              "&:hover": {
                                backgroundColor:
                                  item.status === "approved"
                                    ? "#43a047"
                                    : item.status === "rejected"
                                      ? "#e53935"
                                      : "#fb8c00",
                              }
                            }}
                          >
                            {item.status || "pending"}
                          </CommonButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </>
  );
}