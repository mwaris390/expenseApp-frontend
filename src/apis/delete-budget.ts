import axios from "axios";
import toast from "react-hot-toast";

export async function DeleteBudget(id: string) {
  try {
    const response = await toast.promise(
      axios.delete("expense-budget", {
        data: {
          id,
        },
      }),
      {
        loading: "Deleting budget",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      }
    );
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
