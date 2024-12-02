import axios from "axios";
import toast from "react-hot-toast";

export async function UpdateBudget(userId:string,id: string, data: any) {
  try {
    await toast.promise(
      axios.put("expense-budget", Object.assign(data, { id, userId })),
      {
        loading: "Update Budget",
        success: (res: any) => res.data.message,
        error: (err) =>
          err.response?.data?.message || "Error occurred during adding budget",
      }
    );
    return false;
  } catch (e) {
    console.log(e);
    toast.error("error occurred");
    return true;
  }
}
