import React, { useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Box, Card, CardContent,
  Typography, useMediaQuery
} from "@mui/material";

import CommonButton from "./CommonButton";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";
import { useDispatch } from "react-redux";
import { getLeaveDataActionInitiate } from "../redux/actions/getLeaveAction";
import { updateLeaveDataActionInitiate } from "../redux/actions/updateLeaveAction";
import { toast } from "react-toastify";

export default function LeaveTable({ data = [], handleView, page, rowsPerPage, darkMode }) {

  const isMobile = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();


  const color = Colors(darkMode);

  useEffect(() => {
    dispatch(getLeaveDataActionInitiate());
  }, [dispatch]);

  const handleStatus = async (item, status) => {
    const updatedLeave = { ...item, status };

    await dispatch(updateLeaveDataActionInitiate(updatedLeave, item.id));
    await dispatch(getLeaveDataActionInitiate());

    toast.success(`Leave ${status}`);
  };

  return (
    <>
      <Typography sx={{
        color: color.text,
        fontSize: Theme.font20Bold,
        mt: 10,
        ml: { md: "25%", lg: "20%" }
      }}>
        Leaves List:
      </Typography>

      {isMobile ? (
        <Box>
          {data.map((item) => (
            <Card
              key={item.id}
              sx={{
                mb: 2,
                boxShadow: 3,
                mt: 3,
                color:color.card
              }}
            >
              <CardContent>

                <Box sx={{ textAlign: "center", mb: 1 }}>
                  <img
                    src={item.profileImage || "https://via.placeholder.com/60"}
                    alt="profile"
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%"
                    }}
                  />
                </Box>

                <Typography sx={{ color: color.card}}>
                  <b>Name:</b> {item.employeename}
                </Typography>

                <Typography sx={{ color: color.card }}>
                  <b>Type:</b> {item.leaveType}
                </Typography>

                <Typography sx={{ color: color.card }}>
                  <b>From:</b> {item.fromDate}
                </Typography>

                <Typography sx={{ color: color.card }}>
                  <b>To:</b> {item.toDate}
                </Typography>

                <Typography sx={{ color: color.card }}>
                  <b>Status:</b>{" "}
                  <span style={{
                    color:
                      item.status === "approved"
                        ? color.navbar
                        : item.status === "rejected"
                          ? color.headings
                          : color.text
                  }}>
                    {item.status || "pending"}
                  </span>
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>

                  <CommonButton
                    onClick={() => handleView(item)}
                    sx={{
                      backgroundColor: color.headings,
                      color: color.text,
                      fontSize: Theme.font14Bold,
                    }}
                  >
                    View
                  </CommonButton>

                  <CommonButton
                    sx={{
                      backgroundColor: item.status === "approved" ? color.navbar : color.background,
                      color: color.text,
                      fontSize: Theme.font14Bold
                    }}
                    onClick={() => handleStatus(item, "approved")}
                  >
                    {item.status === "approved" ? "Approved" : "Approve"}
                  </CommonButton>

                  <CommonButton
                    sx={{
                      backgroundColor: item.status === "rejected" ? color.navbar : color.background,
                      color: color.text,
                      fontSize: Theme.font14Bold
                    }}
                    onClick={() => handleStatus(item, "rejected")}
                  >
                    {item.status === "rejected" ? "Rejected" : "Reject"}
                  </CommonButton>

                </Box>

              </CardContent>
            </Card>
          ))}
        </Box>

      ) : (

        <Box sx={{
          mt: 2,
          width: { lg: "65%" },
          ml: { md: "25%", lg: "20%" }
        }}>
          <TableContainer sx={{ borderRadius: 3, boxShadow: 2, backgroundColor: color.background }}>
            <Table size="small">

              <TableHead sx={{ backgroundColor: color.headings, height: 50 }}>
                <TableRow>
                  <TableCell  align="start" sx={{ color: color.text }}>S.no</TableCell>
                  <TableCell  align="start" sx={{ color: color.text }}>Employee</TableCell>
                  <TableCell  align="start"sx={{ color: color.text }}>LeaveType</TableCell>
                  <TableCell   align="start"sx={{ color: color.text }}>From</TableCell>
                  <TableCell align="start" sx={{ color: color.text }}>To</TableCell>
                  <TableCell  align="start" sx={{ color: color.text }}>Status</TableCell>
                  <TableCell  align="center"sx={{ color: color.text }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item.id} hover>

                    <TableCell sx={{ color: color.text }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>

                    <TableCell sx={{ color: color.text }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <img
                          src={item.profileImage || "https://via.placeholder.com/40"}
                          alt="profile"
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%"
                          }}
                        />
                        {item.employeename}
                      </Box>
                    </TableCell>

                    <TableCell sx={{ color: color.text }}>{item.leaveType}</TableCell>
                    <TableCell sx={{ color: color.text }}>{item.fromDate}</TableCell>
                    <TableCell sx={{ color: color.text }}>{item.toDate}</TableCell>

                    <TableCell>
                      <span style={{
                        color:
                          item.status === "approved"
                            ? color.navbar
                            : item.status === "rejected"
                              ? color.headings
                              : color.text
                      }}>
                        {item.status || "pending"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>

                        <CommonButton
                          onClick={() => handleView(item)}
                          sx={{
                            backgroundColor: color.headings,
                            color: color.text,
                            fontSize: Theme.font14Bold
                          }}
                        >
                          View
                        </CommonButton>

                        <CommonButton
                          sx={{
                            backgroundColor: item.status === "approved" ? color.navbar : color.background,
                            color: color.text,
                            fontSize: Theme.font14Bold
                          }}
                          onClick={() => handleStatus(item, "approved")}
                        >
                          {item.status === "approved" ? "Approved" : "Approve"}
                        </CommonButton>

                        <CommonButton
                          sx={{
                            backgroundColor: item.status === "rejected" ? color.navbar : color.background,
                            color: color.text,
                            fontSize: Theme.font14Bold
                          }}
                          onClick={() => handleStatus(item, "rejected")}
                        >
                          {item.status === "rejected" ? "Rejected" : "Reject"}
                        </CommonButton>

                      </Box>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}