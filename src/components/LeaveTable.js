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

export default function LeaveTable({ data = [], handleView, page, rowsPerPage }) {

  const isMobile = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();

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
        color: Colors.red,
        fontSize: Theme.font20Bold,
        mt: 10,
        ml: { md: "25%", lg: "20%" }
      }}>
        Leaves List:
      </Typography>

      {isMobile ? (
        <Box>
          {data.map((item) => (
            <Card key={item.id} sx={{ mb: 2, boxShadow: 3 }}>
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

                <Typography><b>Name:</b> {item.employeename}</Typography>
                <Typography><b>Type:</b> {item.leaveType}</Typography>
                <Typography><b>From:</b> {item.fromDate}</Typography>
                <Typography><b>To:</b> {item.toDate}</Typography>

                <Typography>
                  <b>Status:</b>{" "}
                  <span style={{
                    color:
                      item.status === "approved"
                        ? "green"
                        : item.status === "rejected"
                          ? "red"
                          : "orange"
                  }}>
                    {item.status || "pending"}
                  </span>
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                  
                  <CommonButton onClick={() => handleView(item)}>
                    View
                  </CommonButton>

                  {/* APPROVE */}
                  {item.status === "approved" ? (
                    <CommonButton disabled sx={{ background: "green", color: "white" }}>
                      Approved
                    </CommonButton>
                  ) : (
                    <CommonButton
                      sx={{ background: Colors.blue, color: "white" }}
                      disabled={item.status === "rejected"}
                      onClick={() => handleStatus(item, "approved")}
                    >
                      Approve
                    </CommonButton>
                  )}

                  {/* REJECT */}
                  {item.status === "rejected" ? (
                    <CommonButton disabled sx={{ background: Colors.red, color: "white" }}>
                      Rejected
                    </CommonButton>
                  ) : (
                    <CommonButton
                      sx={{ background: Colors.red, color: "white" }}
                      disabled={item.status === "approved"}
                      onClick={() => handleStatus(item, "rejected")}
                    >
                      Reject
                    </CommonButton>
                  )}

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
          <TableContainer sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Table size="small">

              <TableHead sx={{ background: Colors.headings }}>
                <TableRow>
                  <TableCell align="center" sx={{ color: Colors.white }}>S.no</TableCell>
                  <TableCell align="center" sx={{ color: Colors.white }}>Name</TableCell>
                  <TableCell align="center" sx={{ color: Colors.white }}>LeaveType</TableCell>
                  <TableCell align="center" sx={{ color: Colors.white }}>From</TableCell>
                  <TableCell align="center" sx={{ color: Colors.white }}>To</TableCell>
                  <TableCell align="center" sx={{ color: Colors.white }}>Status</TableCell>
                  <TableCell align="center" sx={{ color: Colors.white }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item.id} hover>

                    <TableCell align="center">
                      {page * rowsPerPage + index + 1}
                    </TableCell>

                    <TableCell align="center">
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
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

                    <TableCell align="center">{item.leaveType}</TableCell>
                    <TableCell align="center">{item.fromDate}</TableCell>
                    <TableCell align="center">{item.toDate}</TableCell>

                    <TableCell align="center">
                      <span style={{
                        color:
                          item.status === "approved"
                            ? "green"
                            : item.status === "rejected"
                              ? "red"
                              : "orange"
                      }}>
                        {item.status || "pending"}
                      </span>
                    </TableCell>

                    <TableCell align="center">
                     <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>

  <CommonButton onClick={() => handleView(item)}>
    View
  </CommonButton>

  <CommonButton
    sx={{
      backgroundColor: item.status === "approved" ? "green" : Colors.blue,
      color: "white"
    }}
    onClick={() => handleStatus(item, "approved")}
  >
    {item.status === "approved" ? "Approved" : "Approve"}
  </CommonButton>


  <CommonButton
    sx={{
      backgroundColor: item.status === "rejected" ? Colors.red : Colors.red,
      color: "white"
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