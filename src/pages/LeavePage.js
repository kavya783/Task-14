import { Box, Typography, useMediaQuery } from "@mui/material";
import Colors from "../colors";

import { Theme } from "../GlobalStyles";
import CommonButton from "../components/CommonButton";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,

    TablePagination,

} from "@mui/material";

import LeaveTable from "../components/LeaveTable";

import { getLeaveDataActionInitiate } from "../redux/actions/getLeaveAction";

import AppBarr from "../components/appBar";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";



function LeavePage() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.getleavereducer?.data) || [];
    console.log("leave data--------------", data)

    const initialEmployee = {
        employeename: "",
        role: "",
        salary: "",
        address: "",
        email: "",
        userId: data?._id,


    };
    const [type, setType] = useState("add");
    const [show, setShow] = useState(false);
    const [employee, setEmployee] = useState(initialEmployee);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const isMobile = useMediaQuery("(max-width:600px)");
     const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllLeaves();
    }, []);
    const getAllLeaves = async () => {
        try {
             setLoading(true);
            await dispatch(getLeaveDataActionInitiate());
        } catch (error) {
            console.log("error", error);
        } finally {
        setLoading(false); 
    }
    };
    const handleClose = () => {
        setShow(false);
        setEmployee(initialEmployee);
    };






    const handleView = (item) => {
        setType("view");
        setEmployee(item);
        setShow(true);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const pendingLeaves = data.filter(
    //     (item) => item.status !== "approved" && item.status !== "rejected"
    // );

    const paginatedProducts = data.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    console.log("DATA FROM REDUX ", data);
     if (loading) return <Loader />;

    return (

        <>
            <AppBarr roled="hr" />
            <NavBar />
            <Box
            sx={{background:Colors.background,height:720,}}>


            <Box sx={{ padding: 1 }}>
                {type === "view" && (
                    <Dialog open={show} onClose={handleClose}>
                        <DialogTitle sx={{ color: Colors.red }}>Employee Details</DialogTitle>
                        <DialogContent
                            sx={{
                                minHeight: 100,
                                minWidth: 300,
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                fontSize: Theme.font20Bold,
                                bgcolor: Colors.white,
                                color: Colors.black,
                                
                            }}
                        >
                             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize:Theme.font14Bold, color: Colors.black }}>
                      <b>Name:</b>
                    </Typography>

                    <Typography sx={{ fontSize: Theme.font16SemiBold, color: Colors.blue }}>
                      {employee.employeename}
                    </Typography>
                  </Box>
                             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: Theme.font14Bold, color: Colors.black }}>
                      <b>LeaveType:</b>
                    </Typography>

                    <Typography sx={{ fontSize: Theme.font16SemiBold, color: Colors.blue }}>
                      {employee.leaveType}
                    </Typography>
                  </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: Theme.font14Bold, color: Colors.black }}>
                      <b>FromDate:</b>
                    </Typography>

                    <Typography sx={{ fontSize: Theme.font16SemiBold, color: Colors.blue }}>
                      {employee.fromDate}
                    </Typography>
                  </Box>
                           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: Theme.font14Bold, color: Colors.black }}>
                      <b>ToDate:</b>
                    </Typography>

                    <Typography sx={{ fontSize: Theme.font16SemiBold, color: Colors.blue }}>
                      {employee.toDate}
                    </Typography>
                  </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: Theme.font14Bold, color: Colors.black }}>
                      <b>Email:</b>
                    </Typography>

                    <Typography sx={{ fontSize: Theme.font16SemiBold, color: Colors.blue }}>
                      {employee.email}
                    </Typography>
                  </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: Theme.font14Bold, color: Colors.black }}>
                      <b>Reason:</b>
                    </Typography>

                    <Typography sx={{ fontSize: Theme.font16SemiBold, color: Colors.blue }}>
                      {employee.reason}
                    </Typography>
                  </Box>
                        </DialogContent>
                        <DialogActions>
                            <Box sx={{}}>
                                <CommonButton
                                    onClick={handleClose}
                                    sx={{ backgroundColor: Colors.view, color: Colors.white, mr: 5 }}
                                >
                                    Close
                                </CommonButton>

                            </Box>
                        </DialogActions>
                    </Dialog>
                )}



                <LeaveTable
                    data={paginatedProducts}
                    handleView={handleView}
                    page={page}
                    rowsPerPage={rowsPerPage}
                />

                <TablePagination
                    component="div"
                  count={data.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "end",
                        color: Colors.black,

                    }}
                />
            </Box>
            </Box>




        </>
    );
}


export default LeavePage;