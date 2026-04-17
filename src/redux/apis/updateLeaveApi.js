import axios from "axios";

// ✅ UPDATE LEAVE
export const updateLeaveData = async (leave, id) => {
  try {
    const response = await axios.put(
      `https://redux-portal-default-rtdb.firebaseio.com/Leave/${id}.json`,
      leave
    );

    return response.data;
  } catch (error) {
    console.error("Error updating leave:", error);
    throw error;
  }
};