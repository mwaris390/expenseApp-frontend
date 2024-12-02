import axios from "axios";
import toast from "react-hot-toast";

export async function DeleteExpense(
  id: string,
  userId: string,
  categoryId: string,
  amount: number
) {
  try {
    // await axios.delete("expense",{data:{
    //     id:userId
    // }}).then((response)=>{
    //     toast.success(response.data.message)
    // }).catch((err)=>{
    //     toast.error(err.response.data.message)
    // })
    await toast.promise(
      axios.delete("expense", { data: { id, userId, categoryId, amount } }),
      {
        loading: "Deleting expense",
        success: (response) => response.data.message,
        error: (err) =>
          err.response?.data?.message || "Failed to delete expense",
      }
    );
  } catch (e: any) {
    console.log(e);
    toast.error("unexpected error occurred");
  }
}
