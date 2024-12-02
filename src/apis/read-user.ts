import axios from "axios";
import toast from "react-hot-toast";
type User = {
  id: string;
  fname: string;
  lname: string;
  age: number;
  email: string;
  password: string;
  pic: string | null;
  gender: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};
export async function ReadUser(userId: any) {
  try {
    const response = await toast.promise(
      axios.get(`users/${userId}`),
      {
        loading: "Loading Fetching User",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      }
    );
    return response.data.data;
  } catch (err: any) {
    console.log(err);
  }
}
