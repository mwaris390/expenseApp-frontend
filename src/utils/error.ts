import toast from "react-hot-toast";

export function ErrorMessage(err: any) {
  console.log(err);
  
  const error = err?.response?.data.error;
  if (typeof error === typeof "String") {
    toast.error(error);
  } else {
    error.forEach((err: any) => {
      toast.error(err?.message);
    });
  }
}
