import { useSelector } from "react-redux";

export function Dashboard() {
  const user = useSelector((state: any) => state.user);
  console.log(user);

  return (
    <>
      <h2>Dashboard</h2>
    </>
  );
}
