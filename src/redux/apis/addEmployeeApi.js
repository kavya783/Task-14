import axios from "axios";
import API from "../../API/API";



export const saveEmployeeData = async (newEmployee) => {
  try {
    console.log("Adding new Employee:", newEmployee);

    const response = await axios.post(`https://redux-portal-default-rtdb.firebaseio.com/Employee.json`, newEmployee);

    console.log("Add response:", response);

    return response.data; // { name: "firebase-generated-id" }

  } catch (error) {
    console.error("Error in saveEmployeeData:", error);
    throw error;
  }
};