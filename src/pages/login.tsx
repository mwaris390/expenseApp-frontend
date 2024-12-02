import { Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/trackify.svg";
import { Button } from "../shared-components/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUser } from "../apis/login";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../hooks/slices/userSlice";
export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email({ message: "Should be valid Email" }),
    password: z.string().min(1, "Password is required"),
  });
  type schemaType = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<schemaType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });
  const formData = async (data: any) => {
    const loginDetail = await LoginUser(data);
    if (loginDetail) {
      dispatch(setUser(loginDetail));
      navigate("/");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="border shadow-lg w-[30rem] px-4 py-4 bg-slate-50 rounded-lg">
          <div className="flex justify-center items-center mb-5">
            <img className="w-[28px] me-2 " src={logo} alt="logo" />
            <h2 className="text-2xl">Trackify</h2>
          </div>
          <div>
            <form onSubmit={handleSubmit(formData)}>
              <div className="flex flex-col py-1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Write Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col py-1">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Write Password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="error-message">{errors.password.message}</p>
                )}
              </div>
              <div className="flex flex-col mt-4">
                <Button
                  title="Login"
                  type="submit"
                  className="btn-primary"
                  isDisable={!isValid}
                />
              </div>
              <div className="flex flex-col mt-4">
                <Button
                  title="Registration"
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate("/registration")}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
