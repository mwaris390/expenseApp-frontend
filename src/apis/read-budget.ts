import axios from "axios";
import toast from "react-hot-toast";

export async function ReadBudget(userId: any) {
  try {
    const response = await toast.promise(
      axios.get(`expense-budget/${userId}`),
      {
        loading: "Loading Fetching budget",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      }
    );
    return response.data.data;
  } catch (err: any) {
    console.log(err);
  }
}
