import axios from "axios";
import toast from "react-hot-toast";
export async function LoginUser(credential: {
  email: string;
  password: string;
}) {
  // const dispatch = useDispatch()
  let loginDetail = undefined;
  try {
    await axios
      .post("login", {
        email: credential.email,
        password: credential.password,
      })
      .then((res) => {
        const response = res.data.message; 
        // dispatch(setUser(res.data.data));
        toast.success(response);
        loginDetail = res.data.data;
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
    toast.error("Unknown error occurred while making request");
    console.log(e);
  }
  return loginDetail;
}
