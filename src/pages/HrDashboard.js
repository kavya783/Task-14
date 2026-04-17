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


import { deleteEmployeeDataActionInitiate } from "../redux/actions/deleteEmployeeAction";
import { getEmployeeDataActionInitiate } from "../redux/actions/getEmployeeAction";
import { addEmployeeDataActionInitiate } from "../redux/actions/addEmployeeAction";
import { updateEmployeeDataActionInitiate } from "../redux/actions/updateEmployeeAction";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import AppBarr from "../components/appBar";
import NavBar from "../components/NavBar";
import { toast } from "react-toastify";
import Loader from "../components/Loader";



function HrDashboard() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.getemployeedata?.data) || [];


    const initialEmployee = {
        profileImage: "",
        employeename: "",
        role: "",
        salary: "",
        address: "",
        email: "",


    };
    const [type, setType] = useState("add");
    const [show, setShow] = useState(false);
    const [employee, setemployee] = useState(initialEmployee);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const isMobile = useMediaQuery("(max-width:600px)");
     const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        getAllEmployees();
    }, []);
      
    const getAllEmployees = async () => {
    try {
        setLoading(true);   // start loader
        await dispatch(getEmployeeDataActionInitiate());
    } catch (error) {
        console.log("error", error);
    } finally {
        setLoading(false); 
    }
};
    const handleClose = () => {
        setShow(false);
         setemployee(initialEmployee);
    };
  const submitHandle = async () => {
    try {
        setLoading(true);
        if (type === "add") {
            await dispatch(addEmployeeDataActionInitiate(employee));
            toast.success("employee added successfully!");
        } else if (type === "edit") {
            await dispatch(updateEmployeeDataActionInitiate(employee, employee.id));
            toast.success("employee updated successfully!");
        }
        await getAllEmployees();
        handleClose();
    } finally {
        setLoading(false);
    }
};



  const handleDelete = async (id) => {
    try {
        setLoading(true);
        await dispatch(deleteEmployeeDataActionInitiate(id));
        await getAllEmployees();
        toast.success("Employee deleted successfully!");
    } finally {
        setLoading(false);
    }
};
    const handleChange = (e) => {
        const { name, value } = e.target;
         setemployee({ ...employee, [name]: value });
    };
    const handleAdd = () => {
        setType("add");
         setemployee(initialEmployee);
        setShow(true);
    };

    const handleView = (item) => {
        setType("view");
        setemployee(item);
        setShow(true);
    };

    const handleEdit = (item) => {
        setType("edit");
        setemployee({ ...item });
        setShow(true);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedProducts = (data || []).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
console.log("DATA FROM REDUX ", data);
  if (loading) return <Loader />;

    return (

        <>
          <AppBarr roled="hr" />
          <NavBar/>
          
            
            <Box sx={{ padding: 2,background:Colors.background,height:695, }}>
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
                                color: Colors.black
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: Theme.font14Bold, color: Colors.black }}>
                      <b>Name:</b>
                    </Typography>

                    <Typography sx={{ fontSize: Theme.font16SemiBold, color: Colors.blue }}>
                      {employee.employeename}
                    </Typography>
                  </Box>
                           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: Theme.font14Bold, color: Colors.black }}>
                      <b>Role:</b>
                    </Typography>

                    <Typography sx={{ fontSize: Theme.font16SemiBold, color: Colors.blue }}>
                      {employee.role}
                    </Typography>
                  </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: Theme.font14Bold, color: Colors.black }}>
                      <b>Salary:</b>
                    </Typography>

                    <Typography sx={{ fontSize: Theme.font16SemiBold, color: Colors.blue }}>
                      {employee.salary}
                    </Typography>
                  </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: Theme.font14Bold, color: Colors.black }}>
                      <b>Address:</b>
                    </Typography>

                    <Typography sx={{ fontSize: Theme.font16SemiBold, color: Colors.blue }}>
                      {employee.address}
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
                        </DialogContent>
                        <DialogActions>
                            <CommonButton
                                onClick={handleClose}
                                sx={{ backgroundColor: Colors.view, color: Colors.white }}
                            >
                                Close
                            </CommonButton>
                        </DialogActions>
                    </Dialog>
                )}

                {type !== "view" && (
                    <EmployeeForm
                        show={show}
                        handleClose={handleClose}
                        type={type}
                        employee={employee}
                        handleChange={handleChange}
                        submitHandle={submitHandle}

                    />
                )}

                <EmployeeTable
                    data={paginatedProducts}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleAdd={handleAdd}
                    handleView={handleView}

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
                        // mr: 10
                    }}
                />
            </Box>




        </>
    );
}


export default HrDashboard;