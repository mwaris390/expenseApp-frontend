import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function NonProtectedRoute({ children }: { children: ReactNode }) {
  const user = useSelector((state: any) => state.user);
  if (user.id.length == 36) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

