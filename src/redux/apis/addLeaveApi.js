import axios from "axios";




export const saveLeaveData = async (newLeave) => {
  try {
    console.log("Adding new Leave:", newLeave);

    const response = await axios.post(`https://redux-portal-default-rtdb.firebaseio.com/Leave.json`, newLeave);

    console.log("Add response:", response);

    return response.data; // { name: "firebase-generated-id" }

  } catch (error) {
    console.error("Error in saveLeaveData:", error);
    throw error;
  }
};