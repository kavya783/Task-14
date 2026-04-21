import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Avatar,
  Stack
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addLeaveDataActionInitiate } from "../redux/actions/addLeaveAction";

import { getLeaveDataActionInitiate } from "../redux/actions/getLeaveAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";

function LeaveForm({ darkMode, setDarkMode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const color = Colors(darkMode);

  const initialLeave = {
    employeename: "",
    email: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    profileImage: "",
    status: "pending"
  };

  const [leave, setLeave] = useState(initialLeave);
  const [errors, setErrors] = useState({});
const [type] = useState("add");  
if (type === "add") {
 
}

  useEffect(() => {
    dispatch(getLeaveDataActionInitiate());

    const email = localStorage.getItem("email");

    const fetchEmployee = async () => {
      const res = await fetch(
        "https://redux-portal-default-rtdb.firebaseio.com/Employee.json"
      );
      const data = await res.json();

      const employees = Object.values(data || {});
      const user = employees.find((emp) => emp.email === email);

      if (user) {
        setLeave((prev) => ({
          ...prev,
          employeename: user.employeename,
          email: user.email,
          profileImage: user.profileImage
        }));
      }
    };

    fetchEmployee();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLeave({
      ...leave,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const validate = () => {
    let newErrors = {};
    let valid = true;

    if (!leave.leaveType) {
      newErrors.leaveType = "Select leave type";
      valid = false;
    }

    if (!leave.fromDate) {
      newErrors.fromDate = "Select from date";
      valid = false;
    }

    if (!leave.toDate) {
      newErrors.toDate = "Select to date";
      valid = false;
    }

    if (leave.fromDate && leave.toDate && leave.fromDate > leave.toDate) {
      newErrors.toDate = "To date must be after From date";
      valid = false;
    }

    if (!leave.reason.trim()) {
      newErrors.reason = "Reason is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      await dispatch(addLeaveDataActionInitiate(leave));
      toast.success("Leave added successfully!");

      setLeave(initialLeave);
      navigate("/employee");
    }
  };

  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
       
      }}
    >
      <Card
        sx={{
          width: 340,
          borderRadius: 4,
          p: 2,
          backgroundColor: color.background,
          color: color.text
        }}
      >
        <CardContent>
          <Stack alignItems="center" spacing={1} mb={2}>
            <Avatar
              sx={{
                width: 45,
                height: 45,
                background: color.background
              }}
            >
              <WorkIcon fontSize="small" />
            </Avatar>

            <Typography sx={{ fontSize: Theme.font20Bold, color: color.headings }}>
              Apply Leave
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit}>
            <TextField
              size="small"
              label="Name"
              value={leave.employeename}
              fullWidth
              disabled
              sx={{
                mb: 1,
                mt: 3,

                "& .MuiInputLabel-root": {
                  color: color.text
                },
                "& .MuiInputLabel-root.Mui-disabled": {
                  color: color.text
                },

                "& .MuiInputBase-input": {
                  color: color.text
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: color.text
                },

                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: color.text
                  },
                  "&.Mui-disabled fieldset": {
                    borderColor: color.text
                  }
                }
              }}
            />

            <TextField
              size="small"
              label="email  "
              value={leave.email}
              fullWidth
              disabled
              sx={{
                mb: 1,
                mt: 1,

                "& .MuiInputLabel-root": {
                  color: color.text
                },
                "& .MuiInputLabel-root.Mui-disabled": {
                  color: color.text 
                },

                "& .MuiInputBase-input": {
                  color: color.text
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: color.text 
                },

                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: color.text
                  },
                  "&.Mui-disabled fieldset": {
                    borderColor: color.text 
                  }
                }
              }}
            />
            <TextField
              select
              size="small"
              label="Leave Type"
              name="leaveType"
              fullWidth
              value={leave.leaveType}
              onChange={handleChange}
              error={!!errors.leaveType}
              helperText={errors.leaveType}
              sx={{
                 mb: 2,
                mt: 2,

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
                  color: color.card,
                  "& fieldset": { borderColor: color.text },
                  "&:hover fieldset": { borderColor: color.text },
                  "&.Mui-focused fieldset": { borderColor: color.navbar }
                }
              }}
            >
              <MenuItem
                value="Casual"
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
              >Casual</MenuItem>
              <MenuItem
                value="Sick"
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
                }}>Sick</MenuItem>
              <MenuItem
                value="Emergency"
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
                }}>Emergency</MenuItem>
            </TextField>

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                size="small"
                type="date"
                name="fromDate"
                fullWidth
                value={leave.fromDate}
                onChange={handleChange}
                error={!!errors.fromDate}
                helperText={errors.fromDate}
                sx={{
                    mb: 2,
                mt: 2,
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
                size="small"
                type="date"
                name="toDate"
                fullWidth
                value={leave.toDate}
                onChange={handleChange}
                error={!!errors.toDate}
                helperText={errors.toDate}
                sx={{
                    mb: 2,
                mt: 2,
                  input: { color: color.text },
                  label: { color: color.text },

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: color.text },
                    "&:hover fieldset": { borderColor: color.text },
                    "&.Mui-focused fieldset": { borderColor: color.navbar },
                  }
                }}
              />
            </Box>

            <TextField
              size="small"
              label="Reason"
              name="reason"
              fullWidth
              multiline
              rows={2}
              value={leave.reason}
              onChange={handleChange}
              error={!!errors.reason}
              helperText={errors.reason}
              sx={{
                  mb: 2,
                mt: 2,
                input: { color: color.text },
                label: { color: color.text },

                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: color.text },
                  "&:hover fieldset": { borderColor: color.text },
                  "&.Mui-focused fieldset": { borderColor: color.navbar },
                }
              }}
            />

            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                onClick={() => navigate("/employee")}
                sx={{ color: color.card, fontSize: Theme.font14Bold }}
              >
                Back
              </Button>

              <Button type="submit" fullWidth variant="contained" sx={{ color: color.text, background: color.navbar, fontSize: Theme.font14Bold }}   >
                Submit
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LeaveForm;