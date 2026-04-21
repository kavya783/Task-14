import axios from "axios";


const endPoints = "Employee";

export const updateEmployeeData = async (employee, id) => {
  const response = await axios.put(
    `https://redux-portal-default-rtdb.firebaseio.com/${endPoints}/${id}.json`,
    employee
  );
  return response.data;
};