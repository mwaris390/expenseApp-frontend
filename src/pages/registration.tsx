import { useNavigate } from "react-router-dom";
import logo from "../assets/trackify.svg";
import { Button } from "../shared-components/button";
import { useForm } from "react-hook-form";
import { CreateUser } from "../apis/create-user";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function Registration() {
  const navigate = useNavigate();
  const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "First name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email({ message: "Should be valid Email" }),
    password: z.string().min(1, "Password is required"),
    gender: z.string({ message: "Must Choose one option" }),
    age: z.string().min(1, "Age is required"),
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
  const data = (data: any) => {
    console.log(data);
    CreateUser(data);
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen py-[25rem]">
        <div className="border shadow-lg w-[30rem] px-4 py-4 bg-slate-50 rounded-lg">
          <div className="flex justify-center items-center mb-5">
            <img className="w-[28px] me-2 " src={logo} alt="logo" />
            <h2 className="text-2xl">Trackify</h2>
          </div>
          <div>
            <form onSubmit={handleSubmit(data)}>
              <div className="flex flex-col py-1">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Write firstName"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="error-message">
                    {errors.firstName.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col py-1">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Write lastName"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="error-message">
                    {errors.lastName.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col py-1">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  placeholder="Write age"
                  {...register("age")}
                />
                {errors.age && (
                  <p className="error-message">
                    {errors.age.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col py-1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Write email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="error-message">
                    {errors.email.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col py-1">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Write password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="error-message">
                    {errors.password.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col py-1">
                <label htmlFor="password">Gender</label>
                <div className="flex items-center">
                  <div className="flex justify-between items-center me-3">
                    <input
                      type="radio"
                      className="me-3 accent-accent"
                      id="male"
                      value="male"
                      {...register("gender")}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div className="flex justify-between items-center">
                    <input
                      type="radio"
                      className="me-3 accent-accent"
                      id="female"
                      value="female"
                      {...register("gender")}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
                {errors.gender && (
                  <p className="error-message">
                    {errors.gender.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col mt-4">
                <Button
                  title="Registration"
                  type="submit"
                  className="btn-primary"
                  isDisable={!isValid}
                />
              </div>
              <div className="flex flex-col mt-4">
                <Button
                  title="Login"
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate("/login")}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
