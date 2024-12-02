import { Outlet } from "react-router-dom";
import { Sidebar } from "../shared-components/sidebar";
import { Header } from "../shared-components/header";
import { useSelector } from "react-redux";
import Verify from "../shared-components/verify";

export function ParentComponent() {
  const user = useSelector((state: any) => state.user);
  return (
    <>
      <div className="flex">
        <div className="w-[20%]">
          <Sidebar />
        </div>
        <div className="w-[80%] py-2 px-8 border">
          <Header />
          {!user.isVerified && <Verify userId={user.id} />}
          {user.isVerified && <Outlet />}
        </div>
      </div>
    </>
  );
}
