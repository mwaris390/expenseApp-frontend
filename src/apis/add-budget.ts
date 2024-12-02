import axios from "axios";
import toast from "react-hot-toast";

export async function AddBudget(userId: string, data: any) {
  try {
    await toast.promise(
      axios.post("expense-budget", Object.assign(data, { userId })),
      {
        success: (res: any) => res.data.message,
        loading: "Adding Budget",
        error: (err) =>
          err.response?.data?.message || "Error occurred during adding budget",
      }
    );
    return false
  } catch (e) {
    console.log(e);
    toast.error("error occurred");
    return true
  }
}
