import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
  
} from "@mui/material";
import Colors from "../colors";
import CommonButton from "./CommonButton";
import { toast } from "react-toastify";

export default function EmployeeForm({
  employee,
  handleChange,
  submitHandle,
  show,
  handleClose,
  type
}) {
  const [errors, setErrors] = useState({});


  const handleInputChange = (e) => {
    const { name,value } = e.target;

    handleChange(e);

    // only that field error clear
    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };


  const validate = () => {
    let newErrors = {};

    if (!employee.employeename)
      newErrors.employeename = "Name is required";

    if (!employee.role)
      newErrors.role = "Role is required";

    if (!employee.salary)
      newErrors.salary = "Salary is required";

    if (!employee.address)
      newErrors.address = "Address is required";

    if (!employee.email)
      newErrors.email = "Email is required";

    if (!employee.password)
      newErrors.password = "Password is required";

    if (!employee.profileImage)
      newErrors.profileImage = "Image is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      submitHandle();
    }
  };

 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      toast.error("Only JPG and PNG images are allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;

      handleChange({
        target: {
          name: "profileImage",
          value: base64
        }
      });

      setErrors((prev) => ({
        ...prev,
        profileImage: ""
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{color:Colors.navbar}}>
        {type === "add"
          ? "Add Employee"
          : type === "edit"
          ? "Edit Employee"
          : "View Employee"}
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>

          <TextField
            label="Employee Name"
            name="employeename"
            value={employee.employeename}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.employeename}
            helperText={errors.employeename}
          />

          <TextField
            label="Role"
            select
            name="role"
            value={employee.role}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.role}
            helperText={errors.role}
          >
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
          </TextField>

          <TextField
            label="Salary"
            name="salary"
            value={employee.salary}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.salary}
            helperText={errors.salary}
          />

          <TextField
            label="Address"
            name="address"
            value={employee.address}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.address}
            helperText={errors.address}
          />

          <TextField
            label="Email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={employee.password}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.password}
            helperText={errors.password}
          />

       
<Box sx={{ mt: 2 }}>
  <CommonButton
  variant="contained"
  component="label"
  
  sx={{
    mt: 2,
    textTransform: "none",
    borderRadius: 2,
    background: Colors.blue,
    fontWeight: "bold"
  }}
>
  Upload Profile Image
  <input
    type="file"
    hidden
    accept="image/png, image/jpeg"
    onChange={handleImageChange}
  />
</CommonButton>
</Box>


          {errors.profileImage && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.profileImage}
            </p>
          )}

          {employee.profileImage && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
  <Box
    component="img"
    src={employee.profileImage}
    alt="preview"
    sx={{
      width: 90,
      height: 90,
      borderRadius: "50%",
      objectFit: "cover",
      border: `2px solid ${Colors.blue}`
    }}
  />
</Box>
          )}

          <DialogActions>
            <CommonButton onClick={handleClose} sx={{ backgroundColor: Colors.view, color: Colors.black}}>
              Cancel
            </CommonButton>

            {type !== "view" && (
              <CommonButton type="submit"sx={{ backgroundColor: Colors.blue, color: Colors.black}}>
                {type === "add" ? "Add Employee" : "Update Employee"}
              </CommonButton>
            )}
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}