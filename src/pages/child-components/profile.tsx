import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import verify from "../../assets/verify.svg";
import cancel from "../../assets/cross-white.svg";
import edit from "../../assets/edit.svg";
import userCover from "../../assets/user-cover.svg";
import { ReadUser } from "../../apis/read-user";
import { object, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UpdateUser from "../../apis/update-user";
import toast from "react-hot-toast";
import UploadImage from "../../apis/patch-image";
import { ResetPassword } from "../../apis/reset-password";
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
export function UserProfile() {
  const user = useSelector((state: any) => state.user);
  const [userData, setUserData] = useState<User | null>(null);
  const [editProfile, setEditProfile] = useState(false);
  const [editPassword, setPassword] = useState(false);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const userSchema = z.object({
    fname: z.string().min(1, "First name required"),
    lname: z.string().min(1, "last name required"),
    age: z
      .string()
      .min(1, "Age is required")
      .transform((value) => {
        const parsed = parseInt(value);
        if (isNaN(parsed)) {
          throw new Error("Age must be a number");
        } else {
          return parsed;
        }
      }),
    email: z
      .string()
      .email({ message: "email is required" })
      .min(1, "email  required"),
    gender: z.string().min(1, "gender  required"),
  });
  const userPasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current Password required"),
    newPassword: z.string().min(1, "New Password required"),
  });
  type userSchema = z.infer<typeof userSchema>;
  type passwordSchema = z.infer<typeof userPasswordSchema>;

  const {
    register,
    handleSubmit: handleUser,
    setValue,
    formState: { errors },
  } = useForm<userSchema>({
    mode: "onChange",
    resolver: zodResolver(userSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handlePassword,
    setValue: setPassValue,
    formState: { errors: errorPassword },
  } = useForm<passwordSchema>({
    mode: "onChange",
    resolver: zodResolver(userPasswordSchema),
  });

  // console.log(user);
  const changePasswordEvent = async (e?: any) => {
    console.log(e);
    let payload = {
      id: user.id,
      currentHashPassword: userData?.password,
    };
    Object.assign(payload,e)
    if (editPassword) {
      let response = await ResetPassword(payload);
      if (response) {
        setPassword(false);
        setPassValue("currentPassword", "");
        setPassValue("newPassword", "");
        fetchUser()
      }
    } else {
      setPassword(true);
    }
  };

  const changePasswordCancelEvent = () => {
    if (editPassword) {
      setPassword(false);
    } else {
      setPassword(true);
    }
  };

  const changeProfileEvent = async (data?: any) => {
    console.log(data);
    if (editProfile) {
      let response = await UpdateUser(user.id, data);
      if (response) {
        setEditProfile(false);
      }
    } else {
      setEditProfile(true);
    }
  };

  const changeProfileCancelEvent = () => {
    if (editProfile) {
      setEditProfile(false);
    } else {
      setEditProfile(true);
    }
  };

  const changeProfilePicEvent = async (e: any) => {
    const file = e.target.files[0];
    if (
      file.type == "image/jpeg" ||
      file.type == "image/png" ||
      file.type == "image/jpg"
    ) {
      console.log(file);
      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("file", file);
      let response = await UploadImage(formData);
      if (response) {
        fetchUser();
      }
    } else {
      toast.error("Un-Supported file type");
    }
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const fetchUser = async () => {
    setUserData(await ReadUser(user.id));
  };

  useEffect(() => {
    if (userData == null) {
      fetchUser();
    } else {
      setValue("fname", userData?.fname || "");
      setValue("lname", userData?.lname || "");
      setValue("email", userData?.email || "");
      setValue("age", userData?.age || 0);
      setValue("gender", userData?.gender || "");
    }
  }, [userData]);

  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h2 className="bg-white text-black rounded-3xl px-3 shadow w-fit h-fit">
          User Profile
        </h2>
        <div>
          {userData?.isVerified && (
            <div className="flex shadow bg-green-400 w-fit h-fit px-2 py-1 text-white font-bold rounded-3xl ms-3">
              <img className="w-[20px] me-2" src={verify} alt="verified" />
              <span>VERIFIED</span>
            </div>
          )}
          {!userData?.isVerified && (
            <div className="flex shadow bg-red-500 w-fit h-fit px-2 py-1 text-white font-bold rounded-3xl ms-3">
              <img className="w-[20px] me-2" src={cancel} alt="cancel" />
              <span>UNVERIFIED</span>
            </div>
          )}
        </div>
      </header>
      <main>
        <section>
          <div className="p-6 flex shadow-lg bg-slate-50 rounded-lg">
            <div className="w-[50%]">
              <div className="flex h-[10rem]">
                <div className=" aspect-square h-[10rem]">
                  <img
                    src={
                      userData?.pic
                        ? `${import.meta.env.VITE_BASEURL}user-image/${
                            userData?.pic
                          }`
                        : userCover
                    }
                    className="border shadow border-secondary rounded-lg w-full h-full object-contain"
                    alt="user"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="profilePic"
                  className="flex justify-between items-center bg-accent text-white font-bold rounded-lg py-1 px-3 shadow w-fit cursor-pointer"
                >
                  <img src={edit} className="w-[20px] me-2" alt="edit" />
                  Change Profile Pic
                  <input
                    ref={fileInput}
                    id="profilePic"
                    type="file"
                    className="hidden"
                    onChange={changeProfilePicEvent}
                  />
                </label>
              </div>
              <div className="my-4 flex  items-center">
                <button
                  onClick={changeProfileCancelEvent}
                  className={`flex justify-between items-center  text-white font-bold rounded-lg py-1 px-3 shadow w-fit me-4 ${
                    editProfile ? "bg-red-500" : "bg-accent"
                  }`}
                >
                  {!editProfile && (
                    <img src={edit} className="w-[20px] me-2" alt="edit" />
                  )}
                  {editProfile && (
                    <img src={cancel} className="w-[20px] me-2" alt="cancel" />
                  )}
                  {editProfile ? "Cancel" : "Edit Profile"}
                </button>
                {editProfile && (
                  <button
                    className="flex justify-between items-center bg-accent text-white font-bold rounded-lg py-1 px-3 shadow w-fit"
                    onClick={handleUser(changeProfileEvent)}
                  >
                    <img src={edit} className="w-[20px] me-2" alt="edit" />
                    Save Profile Changes
                  </button>
                )}
              </div>
              <div className="flex  items-center">
                <button
                  onClick={changePasswordCancelEvent}
                  className={`flex justify-between items-center   text-white font-bold rounded-lg py-1 px-3 shadow w-fit me-4 ${
                    editPassword ? "bg-red-500" : "bg-accent"
                  }`}
                >
                  {!editPassword && (
                    <img src={edit} className="w-[20px] me-2" alt="edit" />
                  )}
                  {editPassword && (
                    <img src={cancel} className="w-[20px] me-2" alt="cancel" />
                  )}
                  {editPassword ? "Cancel" : "Change Password"}
                </button>
                {editPassword && (
                  <button
                    onClick={handlePassword(changePasswordEvent)}
                    className="flex justify-between items-center bg-accent text-white font-bold rounded-lg py-1 px-3 shadow w-fit"
                  >
                    <img src={edit} className="w-[20px] me-2" alt="edit" />
                    Save Password Changes
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col w-[50%]">
              <form id="profileForm" className="">
                <div>
                  <h5 className="bg-secondary w-fit px-3 text-white">
                    Personal Information
                  </h5>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="Write First Name"
                      disabled={!editProfile}
                      {...register("fname")}
                    />
                    {errors.fname && (
                      <p className="error-message">
                        {errors.fname.message as string}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Write Last Name"
                      disabled={!editProfile}
                      {...register("lname")}
                    />
                    {errors.lname && (
                      <p className="error-message">
                        {errors.lname.message as string}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Write Email"
                      disabled={!editProfile}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="error-message">
                        {errors.email.message as string}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="age">Age</label>
                    <input
                      type="text"
                      id="age"
                      placeholder="Write Age"
                      disabled={!editProfile}
                      {...register("age")}
                    />
                    {errors.age && (
                      <p className="error-message">
                        {errors.age.message as string}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="gender">Gender</label>
                    {!editProfile && (
                      <input
                        type="text"
                        id="gender"
                        defaultValue={userData?.gender}
                        disabled={true}
                      />
                    )}
                    <div className="flex items-center">
                      {editProfile && (
                        <>
                          <input
                            type="radio"
                            id="male"
                            value="male"
                            className="mx-3 accent-accent"
                            checked={userData?.gender == "male" ? true : false}
                            {...register("gender")}
                          />
                          <label htmlFor="male">Male</label>
                        </>
                      )}
                      {editProfile && (
                        <>
                          <input
                            type="radio"
                            id="female"
                            value="female"
                            className="mx-3 accent-accent"
                            checked={
                              userData?.gender == "female" ? true : false
                            }
                            {...register("gender")}
                          />
                          <label htmlFor="female">Female</label>
                        </>
                      )}
                      {errors.gender && (
                        <p className="error-message">
                          {errors.gender.message as string}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </form>
              <form id="passwordForm" className="">
                <div>
                  <h5 className="bg-secondary w-fit px-3 text-white mt-4">
                    Password Management
                  </h5>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="email">Current Password</label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Write Current Password"
                      disabled={!editPassword}
                      {...registerPassword("currentPassword")}
                    />
                    {errorPassword.currentPassword && (
                      <p className="error-message">
                        {errorPassword.currentPassword.message as string}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="password">New Password</label>
                    <input
                      type="text"
                      id="password"
                      placeholder="Write New Password"
                      disabled={!editPassword}
                      {...registerPassword("newPassword")}
                    />
                    {errorPassword.newPassword && (
                      <p className="error-message">
                        {errorPassword.newPassword.message as string}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
