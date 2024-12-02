import axios from "axios";
import toast from "react-hot-toast";
import { ErrorMessage } from "../utils/error";

type User = {
  fname: string;
  lname: string;
  age: number;
  email: string;
  gender: string;
};

async function UpdateUser(userId: string, data: User) {
  let responseFromServer = false;
  try {
    await axios
      .put("users", Object.assign(data, { id:userId }))
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
export default UpdateUser;
