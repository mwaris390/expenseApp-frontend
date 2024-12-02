import axios from "axios";
import toast from "react-hot-toast";
import { ErrorMessage } from "../utils/error";
type Expense = {
  title: string;
  description: string;
  amount: number;
  date: string;
  typeId: string;
  categoryId: string;
};
async function AddExpense(userId: string, data: Expense) {
  let responseFromServer = false;
  try {
    await axios
      .post("expense", Object.assign(data, { userId }))
      .then((response) => {
        toast.success(response.data.message);
        responseFromServer = response.data.status;
      })
      .catch((err) => {
        ErrorMessage(err);
        responseFromServer = err.response.data.status;
      });
  } catch (e: any) {
    toast.error(e);
    responseFromServer = false;
  }
  return responseFromServer;
}
export default AddExpense;
