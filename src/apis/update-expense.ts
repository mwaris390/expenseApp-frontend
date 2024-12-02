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
async function UpdateExpense(userId:string,expenseId:string, data: Expense) {
  let responseFromServer = false;
  try {
    await axios
      .put("expense", Object.assign(data, { userId, id: expenseId }))
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
export default UpdateExpense;
