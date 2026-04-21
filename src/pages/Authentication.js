import React, { useState } from "react";
import { TextField, Typography, Button, Card, CardContent, Box } from "@mui/material";
import AppBarr from "../components/appBar";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";


import axios from "axios";
import { toast } from "react-toastify";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";
import bcrypt from "bcryptjs";

export default function AuthenticationForm({ darkMode }) {
  const navigate = useNavigate();
   const color = Colors(darkMode); 

  const [employee, setEmployee] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };


  const validate = () => {
    let valid = true;

    let tempErrors = {
      email: false,
      password: false,
    };

    if (!employee.email.trim()) {
      tempErrors.email = true;
      valid = false;
    }

    if (!employee.password.trim()) {
      tempErrors.password = true;
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {

      const userCred = await signInWithEmailAndPassword(
        auth,
        employee.email,
        employee.password
      );

      localStorage.setItem("email", employee.email);
      localStorage.setItem("role", "hr");

      toast.success("HR Login Success ✅");
      navigate("/hr");

    } catch (firebaseError) {
      console.log("Not HR, checking employee DB...");

      try {

        const res = await axios.get(
          "https://redux-portal-default-rtdb.firebaseio.com/Employee.json"
        );



        const employees = Object.entries(res.data || {}).map(([id, value]) => ({
          id,
          ...value,
        }));

        console.log("EMPLOYEES ARRAY:", JSON.stringify(employees, null, 2));
        const user = employees.find((emp) => {
          if (emp.email === employee.email) {
            return bcrypt.compareSync(employee.password, emp.password);
          }
        });

        console.log("FOUND USER:", user);
       

        if (!user) {
          toast.error("Invalid email ❌");
          return;
        }
        localStorage.setItem("email", user.email);
        localStorage.setItem("role", "employee");

        toast.success("Employee Login Success ✅");
        navigate("/employee");

      } catch (err) {
        console.log(err);
        toast.error("Login Failed ❌");
      }
    }
  };
  return (
    <Box
      sx={{
        height: 648,
        background:color.headings,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt: 10,
      }}
    >
      <AppBarr />

      <Card sx={{ width: { xs: 200, sm: 300 }, p: 3, borderRadius: 5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)", }}>
        <CardContent>
          <Typography sx={{ textAlign: "center", mb: 2, color: Colors.black, fontSize: Theme.font20Bold }}>
            Login Form
          </Typography>

          <form onSubmit={handleSubmit}>

            <TextField
              label="Email"
              name="email"
              fullWidth
              value={employee.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email ? "Email required" : " "}
              sx={{ mb: 3 }}
            />


            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={employee.password}
              onChange={handleChange}
              error={errors.password}
              helperText={errors.password ? "Password required" : " "}
              sx={{ mb: 3 }}
            />


            <Button
              type="submit"
              variant="contained"
              sx={{ ml: { xs: 5, sm: 10 }, width: 100, color: Colors.black, fontSize: Theme.font14Bold, background: Colors.navbar }}
            // fullWidth
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}