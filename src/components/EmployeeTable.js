import React from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Box, Card, CardContent,
    Typography, useMediaQuery
} from "@mui/material";

import CommonButton from "./CommonButton";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EmployeeTable({
    data = [],
    handleEdit,
    handleDelete,
    handleAdd,
    handleView
}) {

    const isMobile = useMediaQuery("(max-width:500px)");

    return (
        <>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, ml: { md: 31, lg: 35, xl: 38 }, mr: { lg: 28, xl: 26, }, mt: 15 }}>

                <Typography sx={{ mr: { xs: 3, sm: 55, md: 40, lg: 10, xl: 5 }, color: Colors.red, fontSize: Theme.font20Bold }}>Employee List:</Typography>
                <CommonButton variant="contained" sx={{ color: Colors.white, backgroundColor: Colors.headings, ml: 3, fontSize: Theme.font14Bold }} onClick={handleAdd}>
                    Add Employee
                </CommonButton>
            </Box>


            {isMobile ? (
                <Box>
                    {data.map((item) => (
                        <Card
                            key={item.id}
                            sx={{
                                mb: 2,
                                boxShadow: `0px 4px 10px ${Colors.black}`
                            }}
                        >
                            <CardContent>

                                <Box sx={{ textAlign: "center", mb: 1 }}>
                                    <img
                                        src={
                                            item.profileImage ||
                                            "https://via.placeholder.com/60"
                                        }
                                        alt="profile"
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: "50%"
                                        }}
                                    />
                                </Box>

                                <Typography fontWeight="bold">
                                    Name: {item.employeename}
                                </Typography>

                                <Typography>Role: {item.role}</Typography>
                                <Typography>Salary: {item.salary}</Typography>
                                <Typography>Address: {item.address}</Typography>
                                <Typography>Email: {item.email}</Typography>

                                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                                    <CommonButton onClick={() => handleView(item)} sx={{bgcolor:Colors.view,fontSize:Theme.font14Bold}}>
                                        View
                                    </CommonButton>
                                    <CommonButton onClick={() => handleEdit(item)} sx={{bgcolor:Colors.blue,fontSize:Theme.font14Bold}}>
                                        Edit
                                    </CommonButton>
                                    <CommonButton onClick={() => handleDelete(item.id)}sx={{bgcolor:Colors.red,fontSize:Theme.font14Bold}}>
                                        Delete
                                    </CommonButton>
                                </Box>

                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ) : (


              <Box sx={{ mt: 2, width: { lg: "66%" }, ml: { md: "25%", lg: "20%" } }}>

                    <TableContainer sx={{width: "100%",border:1, borderRadius: 5, }}>
                        <Table size="small">

                            <TableHead
                                sx={{
                                    bgcolor:Colors.headings,height: 50,
                                }}
                            >
                                <TableRow>
                                    <TableCell align="center" sx={{ color:Colors.white,fontSize:Theme.font16Bold}}>
                                        S.no
                                    </TableCell>

                                    <TableCell align="center" sx={{ color:Colors.white,fontSize:Theme.font16Bold}}>
                                        Employee
                                    </TableCell>

                                    <TableCell align="center"sx={{ color:Colors.white,fontSize:Theme.font16Bold}}>
                                        Role
                                    </TableCell>

                                    <TableCell align="center"sx={{ color:Colors.white,fontSize:Theme.font16Bold}}>
                                        Salary
                                    </TableCell>

                                    <TableCell align="center" sx={{ color:Colors.white,fontSize:Theme.font16Bold}}>
                                        Address
                                    </TableCell>

                                    <TableCell align="center" sx={{ color:Colors.white,fontSize:Theme.font16Bold}}>
                                        Email
                                    </TableCell>

                                    <TableCell align="center"sx={{ color:Colors.white,fontSize:Theme.font16Bold}}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {data.map((item, index) => (
                                    <TableRow key={item.id}>

                                        <TableCell align="center">
                                            {index + 1}
                                        </TableCell>


                                        <TableCell align="center">
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <img
                                                    src={
                                                        item.profileImage ||
                                                        "https://via.placeholder.com/40"
                                                    }
                                                    alt="profile"
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: "50%",
                                                        objectFit: "cover",

                                                    }}
                                                />

                                                <Typography fontWeight="bold">
                                                    {item.employeename}
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        <TableCell align="center" sx={{ color: Colors.black, fontSize: Theme.font14SemiBold }}>{item.role}</TableCell>
                                        <TableCell align="center" sx={{ color: Colors.black, fontSize: Theme.font14SemiBold }}>{item.salary}</TableCell>
                                        <TableCell align="center" sx={{ color: Colors.black, fontSize: Theme.font14SemiBold }}>{item.address}</TableCell>
                                        <TableCell align="center" sx={{ color: Colors.black, fontSize: Theme.font14SemiBold }}>{item.email}</TableCell>


                                        <TableCell>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: 1,
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <CommonButton onClick={() => handleView(item)} sx={{ backgroundColor:Colors.view, color:Colors.white, fontSize: Theme.font14Bold }}>
                                                    <VisibilityIcon />
                                                </CommonButton>

                                                <CommonButton onClick={() => handleEdit(item)} sx={{ backgroundColor:Colors.blue, color:Colors.white,  fontSize: Theme.font14Bold }}>
                                                    <EditIcon />
                                                </CommonButton>

                                                <CommonButton onClick={() => handleDelete(item.id)} sx={{ backgroundColor:Colors.red, color:Colors.white,  fontSize: Theme.font14Bold }}>
                                                    <DeleteIcon />
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