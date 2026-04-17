import axios from "axios";
import API from "../../API/API";
const api = new API();
const endPoints = "Employee";

export const updateEmployeeData = async (employee, id) => {
  try {
    const response = await axios.put(`https://redux-portal-default-rtdb.firebaseio.com/Employee/${id}.json`, employee);
    return response.data;
  } catch (error) {
    throw error;
  }
};