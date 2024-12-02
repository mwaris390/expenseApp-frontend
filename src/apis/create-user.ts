import axios from "axios";
import toast from "react-hot-toast";
export async function CreateUser({
  firstName,
  lastName,
  age,
  email,
  password,
  gender,
}: {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  password: string;
  gender: string;
}) {
  let castedAge = Number(age);
  
  try {
    await axios
      .post(`register-users`, {
        fname: firstName,
        lname: lastName,
        age: castedAge,
        email,
        password,
        gender,
      })
      .then((res) => {
        const response = res.data;
        console.log(response.data);
        toast.success(res.data);
      })
      .catch((err) => {
        const error = err.response.data.error;
        if (typeof error === typeof String()) {
          toast.error(error);
        } else {
          error.forEach((err: any) => {
            toast.error(err.message);
          });
        }
        console.log(error);
      });
  } catch (e) {
    toast.error('Unknown error occurred while making request');
    console.log(e);
  }
}
