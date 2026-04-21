import { Box, Typography } from "@mui/material";


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
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Colors from "../colors";

function HrDashboard({ darkMode, setDarkMode }) {

  const color = Colors(darkMode); 

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
  // const isMobile = useMediaQuery("(max-width:600px)");
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  getAllEmployees();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  const getAllEmployees = async () => {
    try {
      setLoading(true);
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

  const submitHandle = async (data) => {
    try {
      setLoading(true);

      if (type === "add") {
        await dispatch(addEmployeeDataActionInitiate(data));
      } else if (type === "edit") {
        await dispatch(updateEmployeeDataActionInitiate(data, data.id));
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
          padding: 2,
          background: color.background,
          height: { xs: 1810, sm: 570, md: 560, lg: 695 },
        }}
      >
        {type === "view" && (
          <Dialog open={show} onClose={handleClose}>
            <DialogTitle sx={{ color: color.navbar }}>Employee Details</DialogTitle>

            <DialogContent
              sx={{
                minHeight: 100,
                minWidth: 300,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                fontSize: Theme.font20Bold,
                color: color.card,
              }}
            >
              <Typography> Name:{employee.employeename}</Typography>
              <Typography>Role:{employee.role}</Typography>
              <Typography>Salary:{employee.salary}</Typography>
              <Typography>Address:{employee.address}</Typography>
              <Typography>Email:{employee.email}</Typography>
            </DialogContent>

            <DialogActions>
              <CommonButton
                onClick={handleClose}
                sx={{ backgroundColor: color.background, color: color.text }}
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
            darkMode={darkMode} 
          />
        )}

        <EmployeeTable
          data={paginatedProducts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleAdd={handleAdd}
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
    </>
  );
}

export default HrDashboard;     