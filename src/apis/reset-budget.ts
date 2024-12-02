import axios from "axios";
import toast from "react-hot-toast";

export async function ResetBudget(id: string,userId:string) {
  try {
    let amount = 0
    const response = await toast.promise(
      axios.patch("expense-budget",{id,amount,userId}),
      {
        loading: "Resetting budget",
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
