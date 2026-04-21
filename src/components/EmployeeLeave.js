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

export default function EmployeeLeave({ darkMode, setDarkMode }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");
   const color = Colors(darkMode); 

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
      <AppBarr roled="employee"
       darkMode={darkMode} 
        setDarkMode={setDarkMode}  />
      <NavBar 
       darkMode={darkMode} 
        setDarkMode={setDarkMode} />
      <Box
        sx={{
          bgcolor:color.background,
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
              bgcolor: color.text,
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
                      <Typography sx={{ fontSize: Theme.font14Bold, color: color.card }}>
                        <b>Name:</b>
                      </Typography>

                      <Typography sx={{ fontSize: Theme.font16SemiBold, color:  color.card }}>
                        {item.employeename}
                      </Typography>
                    </Box>


                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography sx={{ fontSize: Theme.font14Bold, color:  color.card}}>
                        <b>LeaveType:</b>
                      </Typography>

                      <Typography sx={{ fontSize: Theme.font16SemiBold, color:  color.card }}>
                        {item.leaveType}
                      </Typography>
                    </Box>


                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography sx={{ fontSize: Theme.font14Bold, color: color.card}}>
                        <b>Date:</b>
                      </Typography>

                      <Typography sx={{ fontSize: Theme.font16SemiBold, color:  color.card}}>
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
    mx: "auto",
    backgroundColor: color.background   
  }}
>
              <Table>
                <TableHead
                  sx={{
                    bgcolor: color.headings,height:50
                  }}
                >
                  <TableRow>
                    <TableCell align="start" sx={{ fontSize: Theme.font16Bold, color: color.text }}>
                      S.No
                    </TableCell>
                    <TableCell align="start" sx={{ fontSize: Theme.font16Bold, color: color.text}}>
                      Name
                    </TableCell>
                    <TableCell align="start" sx={{ fontSize: Theme.font16Bold, color: color.text }}>
                      Leave Type
                    </TableCell>
                    <TableCell align="start" sx={{ fontSize: Theme.font16Bold, color:color.text }}>
                      FromDate
                    </TableCell>
                    <TableCell align="start" sx={{ fontSize: Theme.font16Bold, color:color.text}}>
                      ToDate
                    </TableCell>
                    <TableCell align="start" sx={{ fontSize: Theme.font16Bold, color: color.text }}>
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
                        <TableCell align="start" sx={{color:color.text}}>
                          {index + 1}
                        </TableCell>
                        <TableCell align="start"  sx={{color:color.text}}>
                          {item.employeename}
                        </TableCell>
                        <TableCell align="start"  sx={{color:color.text}}>
                          {item.leaveType}
                        </TableCell>
                        <TableCell align="start"  sx={{color:color.text}}>
                          {item.fromDate}
                        </TableCell>
                        <TableCell align="start"  sx={{color:color.text}}>
                          {item.toDate}
                        </TableCell>
                        <TableCell align="start"  sx={{color:color.text}}>
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
                                  ?color.navbar
                                  : item.status === "rejected"
                                    ?color.headings
                                    :color.background,

                              color:color.text,
                              fontSize:Theme.font14Bold,

                             
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