import { Link, NavLink } from "react-router-dom";
import logo from "../../public/trackify-white.svg";
import home from "../assets/home.svg";
import expenseManagement from "../assets/expense.svg";
import profile from "../assets/profile.svg";
import files from "../assets/files.svg";
import budget from "../assets/money-pie.svg";
import logout from "../assets/logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../hooks/slices/userSlice";
export function Sidebar() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const links = [
    { path: "/", title: "Dashboard", img: home, show: user.isVerified },
    { path: "/profile", title: "Profile", img: profile, show: user.isVerified },
    {
      path: "/read-expense",
      title: "Manage Cash Flow",
      img: expenseManagement,
      show: user.isVerified,
    },
    {
      path: "/categories",
      title: "Manage Categories",
      img: files,
      show: user.isVerified,
    },
    {
      path: "/types",
      title: "Manage Types",
      img: files,
      show: user.isVerified,
    },
    {
      path: "/budget",
      title: "Manage Budget",
      img: budget,
      show: user.isVerified,
    },
  ];
  return (
    <>
      <div className="w-full h-screen bg-newPrimary shadow-lg py-1 rounded-e-xl">
        <div className=" ps-2 flex">
          <div className="w-[80%] flex">
            <div className="">
              <img src={logo} alt="logo" className="w-[35px]" />
            </div>
            <div className="text-white mt-1 ms-2">
              <h2>Trackify</h2>
            </div>
          </div>
          <div className="w-[20%]"></div>
        </div>
        <div className="flex flex-col justify-between h-[90vh] mt-4 ">
          <div>
            {links.map((link, key) => {
              return (
                link.show && (
                  <div key={key} className="">
                    <NavLink
                      className={({ isActive }) => {
                        return ` flex items-center px-2  py-4 ${
                          isActive
                            ? "text-white"
                            : "text-gray-300 hover:text-white"
                        }`;
                      }}
                      key={key}
                      to={link.path}
                    >
                      <img
                        className="w-[25px] me-4"
                        src={link.img}
                        alt={link.title}
                      />
                      {link.title}
                    </NavLink>
                  </div>
                )
              );
            })}
          </div>
          <div
            className="flex items-center px-2 py-4 text-gray-300 cursor-pointer w-full hover:text-white"
            onClick={() => {
              dispatch(
                setUser({ id: "", email: "", isVerified: false, pic: "" })
              );
            }}
          >
            <img className="w-[25px] me-4" src={logout} alt="logout" />
            <span className="">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
}
