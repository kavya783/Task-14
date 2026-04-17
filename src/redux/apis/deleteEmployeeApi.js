import axios from "axios";

export const deleteEmployeeData = async (id) => {
  try {
    console.log("Deleting employee with ID:", id);
    const response = await axios.delete(`https://redux-portal-default-rtdb.firebaseio.com/Employee/${id}.json`);
    console.log("Delete response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in deleteProductData:", error);
    throw error;
  }
};