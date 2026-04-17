import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";
import Colors from "../colors";

const AppBarr = ({ roled }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const role = roled?.toLowerCase();

  let title = "";
  if (role === "hr") title = "HR PORTAL";
  else if (role === "employee") title = "EMPLOYEE PORTAL";
  else return null;


  const userEmail = localStorage.getItem("email");
  const firstLetter = userEmail ? userEmail.charAt(0).toUpperCase() : "U";


  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: Colors.navbar,
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center", px: 2 }}>


        <Box sx={{ width: 48 }} />


        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "18px", md: "24px" },
              color: "#fff"
            }}
          >
            {title}
          </Typography>
        </Box>


        <Box sx={{ width: 48, display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleOpen}>
            <Avatar
              sx={{
                bgcolor:Colors.view,
                color:Colors.black,
                fontWeight: "bold"
              }}
            >
              {firstLetter}
            </Avatar>
          </IconButton>


          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled>{userEmail}</MenuItem>

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default AppBarr;