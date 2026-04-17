import axios from "axios";
import API from "../../API/API";


const api = new API();

export const fetchEmployeeData = async () => {
  try {
    const response = await axios.get(
    "https://redux-portal-default-rtdb.firebaseio.com/Employee.json"
    );

   const data = response.data;
    if (!data) return []; // no data
    return Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [];
  }
}