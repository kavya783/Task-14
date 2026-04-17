import axios from "axios";

// ✅ GET
export const fetchLeaveData = async () => {
  try {
    const response = await axios.get(
      "https://redux-portal-default-rtdb.firebaseio.com/Leave.json"
    );

    const data = response.data;
    if (!data) return [];

    return Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

