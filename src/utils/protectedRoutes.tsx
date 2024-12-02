import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
  children: ReactNode;
}

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const user = useSelector((state: any) => state.user);
// //   const navigate = useNavigate();

//     if (user.id.length != 36) {
//       return <Navigate to='/login'/>;
//     }

//   return <>{children}</>;
// };
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useSelector((state: any) => state.user);
  //   const navigate = useNavigate();

      if (user.id.length != 36) {
        return <Navigate to='/login'/>;
      }
  return <>{children}</>;
}
export default ProtectedRoute;
