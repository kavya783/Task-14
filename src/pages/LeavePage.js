import { Box, Typography } from "@mui/material";
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



import Loader from "../components/Loader";

function LeavePage({ darkMode, setDarkMode }) {

    const color = Colors(darkMode); 

    const dispatch = useDispatch();
    const data = useSelector((state) => state.getleavereducer?.data) || [];

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
    // const isMobile = useMediaQuery("(max-width:600px)");
    const [loading, setLoading] = useState(true);

   useEffect(() => {
  getAllLeaves();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const paginatedProducts = data.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    if (loading) return <Loader />;

    return (
        <>
            <AppBarr 
                roled="hr" 
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
            />

          
            <Box
                sx={{
                    background: color.background,
                    height: { xs: 600, sm: 570, md: 560, lg: 728 },
                }}
            >
                <Box sx={{ padding: 1, background: color.background, }}>

                    {type === "view" && (
                        <Dialog open={show} onClose={handleClose}>
                            <DialogTitle sx={{ color: color.text,bgcolor:color.background }}>
                                Employee Details
                            </DialogTitle>

                            <DialogContent
                                sx={{
                                    minHeight: 100,
                                    minWidth: 300,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    fontSize: Theme.font20Bold,
                                    bgcolor: color.background,
                                    color: color.text,
                                }}
                            >

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Typography sx={{ fontSize: Theme.font14Bold }}>
                                        <b>Name:</b>
                                    </Typography>
                                    <Typography sx={{ fontSize: Theme.font16SemiBold }}>
                                        {employee.employeename}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Typography sx={{ fontSize: Theme.font14Bold }}>
                                        <b>LeaveType:</b>
                                    </Typography>
                                    <Typography sx={{ fontSize: Theme.font16SemiBold }}>
                                        {employee.leaveType}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Typography sx={{ fontSize: Theme.font14Bold }}>
                                        <b>FromDate:</b>
                                    </Typography>
                                    <Typography sx={{ fontSize: Theme.font16SemiBold }}>
                                        {employee.fromDate}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Typography sx={{ fontSize: Theme.font14Bold }}>
                                        <b>ToDate:</b>
                                    </Typography>
                                    <Typography sx={{ fontSize: Theme.font16SemiBold }}>
                                        {employee.toDate}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Typography sx={{ fontSize: Theme.font14Bold }}>
                                        <b>Email:</b>
                                    </Typography>
                                    <Typography sx={{ fontSize: Theme.font16SemiBold }}>
                                        {employee.email}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Typography sx={{ fontSize: Theme.font14Bold }}>
                                        <b>Reason:</b>
                                    </Typography>
                                    <Typography sx={{ fontSize: Theme.font16SemiBold }}>
                                        {employee.reason}
                                    </Typography>
                                </Box>

                            </DialogContent>

                            <DialogActions>
                                <CommonButton
                                    onClick={handleClose}
                                    sx={{
                                        backgroundColor: color.navbar,
                                        color: color.text,
                                        mr: 2,
                                    }}
                                >
                                    Close
                                </CommonButton>
                            </DialogActions>
                        </Dialog>
                    )}

                    <LeaveTable
                        data={paginatedProducts}
                        handleView={handleView}
                        page={page}
                        rowsPerPage={rowsPerPage}
                         darkMode={darkMode} 
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
                            color: color.text,
                        }}
                    />

                </Box>
            </Box>
        </>
    );
}

export default LeavePage;