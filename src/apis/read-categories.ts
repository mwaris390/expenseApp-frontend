import axios from "axios";

import toast from "react-hot-toast";

export async function ReadCategories(userId: string) {
  try {
    await axios
      .get(`expense-category/${userId}`)
      .then((res) => {
        const response = res.data;
        console.log(response.data);
        toast.success(response.message);
        res =  response;
      })
      .catch((err) => {
        const error = err.response.data.error;
        if (typeof error === "string") {
          toast.success(error);
        } else {
          error.forEach((err: any) => {
            toast.success(err.message);
          });
        }
        console.log(error);
      });
  } catch (e) {
    toast.error("Unknown error occurred while making request");
    console.log(e);
  }
}
