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
import bcrypt from "bcryptjs";

export default function EmployeeForm({ darkMode, setDarkMode,
  employee,
  handleChange,
  submitHandle,
  show,
  handleClose,
  type
}) {
  const [errors, setErrors] = useState({});

  const color = Colors(darkMode);

  const handleInputChange = (e) => {
    const { name } = e.target;

    handleChange(e);

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!employee.employeename)
      newErrors.employeename = "Name is required";
    // } else if (employee.employeename.length >= 15) {
    //   newErrors.employeename = "Name must be 1 to 15  letters  only";
    // }

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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const saltRounds = 10;

      const hashedPassword = await bcrypt.hash(
        employee.password,
        saltRounds
      );

      const updatedEmployee = {
        ...employee,
        password: hashedPassword
      };

      submitHandle(updatedEmployee);
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
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{
      sx: {
        backgroundColor: color.background,
      }
    }}>
      <DialogTitle sx={{ color: color.text, backgroundColor: color.background }}>
        {type === "add"
          ? "Add Employee"
          : type === "edit"
            ? "Edit Employee"
            : "View Employee"}
      </DialogTitle>

      <DialogContent sx={{
        color: color.text,
        backgroundColor: color.background
      }}>
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
            sx={{
              input: { color: color.text },
              label: { color: color.text },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: color.text },
                "&:hover fieldset": { borderColor: color.text },
                "&.Mui-focused fieldset": { borderColor: color.navbar },
              }
            }}
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
            sx={{
              "& .MuiInputLabel-root": {
                color: color.text
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: color.navbar
              },
              "& .MuiSelect-select": {
                color: color.text
              },
              "& .MuiSvgIcon-root": {
                color: color.text
              },
              "& .MuiOutlinedInput-root": {
                color: color.text,  // important
                "& fieldset": { borderColor: color.text },
                "&:hover fieldset": { borderColor: color.text },
                "&.Mui-focused fieldset": { borderColor: color.navbar }
              }
            }}
          >


            <MenuItem
              value="HR"
              sx={{
                backgroundColor: color.background,
                color: color.text,
                "&.Mui-selected": {
                  backgroundColor: color.background,
                  color: color.text
                },
                "&.Mui-selected:hover": {
                  backgroundColor: color.background
                }
              }}
            >
              HR
            </MenuItem>

            <MenuItem
              value="Employee"
              sx={{
                backgroundColor: color.background,
                color: color.text,
                "&.Mui-selected": {
                  backgroundColor: color.background,
                  color: color.text
                },
                "&.Mui-selected:hover": {
                  backgroundColor: color.background
                }
              }}
            >
              Employee
            </MenuItem>
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
            sx={{
              input: { color: color.text },
              label: { color: color.text },

              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: color.text },
                "&:hover fieldset": { borderColor: color.text },
                "&.Mui-focused fieldset": { borderColor: color.navbar },
              }
            }}
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
            sx={{
              input: { color: color.text },
              label: { color: color.text },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: color.text },
                "&:hover fieldset": { borderColor: color.text },
                "&.Mui-focused fieldset": { borderColor: color.navbar },
              }
            }}
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
            sx={{
              input: { color: color.text },
              label: { color: color.text },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: color.text },
                "&:hover fieldset": { borderColor: color.text },
                "&.Mui-focused fieldset": { borderColor: color.navbar },
              }
            }}
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
            sx={{
              input: { color: color.text },
              label: { color: color.text },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: color.text },
                "&:hover fieldset": { borderColor: color.text },
                "&.Mui-focused fieldset": { borderColor: color.navbar },
              }
            }}
          />
          <Box sx={{ mt: 2 }}>
            <CommonButton
              variant="contained"
              component="label"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                background: color.headings,
                color: color.text,
              }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
              />
            </CommonButton>
          </Box>

          {errors.profileImage && (
            <p style={{ color: color.text, fontSize: "12px" }}>
              {errors.profileImage}
            </p>
          )}

          {employee.profileImage && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <img
                src={employee.profileImage}
                alt="preview"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%"
                }}
              />
            </Box>
          )}

          <DialogActions>
            <CommonButton
              onClick={handleClose}
              sx={{ backgroundColor: color.background, color: color.text }}
            >
              Cancel
            </CommonButton>

            {type !== "view" && (
              <CommonButton
                type="submit"
                sx={{ backgroundColor: color.navbar, color: color.headings }}
              >
                {type === "add" ? "Add Employee" : "Update Employee"}
              </CommonButton>
            )}
          </DialogActions>

        </form>
      </DialogContent>
    </Dialog>
  );
}