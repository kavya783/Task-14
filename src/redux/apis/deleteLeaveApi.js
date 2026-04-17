import axios from "axios";

export const deleteLeaveData = async (id) => {
  try {
    console.log("Deleting Leave with ID:", id);
    const response = await axios.delete(`https://redux-portal-default-rtdb.firebaseio.com/Leave/${id}.json`);
    console.log("Delete response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in deleteEmployeeData:", error);
    throw error;
  }
};