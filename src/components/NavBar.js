import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";

function NavBar({ }) { 
  const [open, setOpen] = useState(false);
  const [roled, setRoled] = useState('');
  const location = useLocation();

  useEffect(() => {
    const ghjk = async()=>{
     const storedRole = localStorage.getItem("role");
      if (storedRole) setRoled(storedRole);
    }
    ghjk();
  }, []);

  const linkStyles = {
    p: 2,
    display: "block",
    textDecoration: "none",
    color: Colors.black,
    "&:hover": {
      color:  Colors.red,
    },
  };

 const drawerContent = (
  <Box sx={{ width: 240, mt: 5, backgroundColor: Colors.white, height: "100%" }}>


    {roled === "hr" && (
      <>
        <Link to="/hr" style={{ textDecoration: "none" }}>
          <Typography sx={{...linkStyles,  ...(location.pathname === "/hr" && {
            backgroundColor:Colors.headings,
              color: Colors.white,
              fontSize:Theme.font16SemiBold,
          }),}}>Employees</Typography>
        </Link>
      
        <Divider />

        <Link to="/leave" style={{ textDecoration: "none" }}>
          <Typography sx={{...linkStyles,  ...(location.pathname === "/leave" && {
            backgroundColor:Colors.headings,
              color: Colors.white,
              fontSize:Theme.font16SemiBold,
          }),
          }}>Leaves</Typography>
        </Link>

        <Divider />
      </>
    )}

  
    {roled === "employee" && (
      <>
        <Link to="/employee" style={{ textDecoration: "none" }}>
          <Typography sx={{
            ...linkStyles,
            ...(location.pathname === "/employee" && {
              backgroundColor:Colors.headings,
              color: Colors.white,
              fontSize:Theme.font16SemiBold,
            }),
          }}
        >Home</Typography>
        </Link>
         <Link to="/leave/status" style={{ textDecoration: "none" }}>
          <Typography sx={{
            ...linkStyles,
            ...(location.pathname === "/leave/status" && {
              backgroundColor: Colors.headings,
              color: Colors.white,
              fontSize:Theme.font16SemiBold,
            }),
          }}
        >Leave Status</Typography>
        </Link>
      </>
    )}

  </Box>
);
  return (
    <>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "absolute",
          top: 90,
          right:20,
          zIndex: 1300,
        }}
      >
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon sx={{ color:  "#000" }} />
        </IconButton>
      </Box>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 240,
            top: "60px",
            mr:50,
            backgroundColor: Colors.white,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: 240,
            top: "65px",
            height: "calc(100vh - 64px)",
            backgroundColor:Colors.white,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default NavBar;