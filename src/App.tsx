import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./pages/child-components/dashboard";
import { Login } from "./pages/login";
import { Registration } from "./pages/registration";
import ProtectedRoute from "./utils/protectedRoutes";
import { NonProtectedRoute } from "./utils/nonProtectedRoute";
import { ParentComponent } from "./pages/parentComponent";
import { ReadExpense } from "./pages/child-components/readExpense";
import { UserProfile } from "./pages/child-components/profile";
import { ManageCategories } from "./pages/child-components/manageCatgories";
import { ManageTypes } from "./pages/child-components/manageTypes";
import { BudgetSetter } from "./pages/child-components/budgetSetter";
const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ParentComponent />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "read-expense",
        element: <ReadExpense />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "categories",
        element: <ManageCategories />,
      },
      {
        path: "types",
        element: <ManageTypes />,
      },
      {
        path: "Budget",
        element: <BudgetSetter />,
      },
    ],
  },
  {
    path: "login",
    element: (
      <NonProtectedRoute>
        <Login />
      </NonProtectedRoute>
    ),
  },
  {
    path: "registration",
    element: (
      <NonProtectedRoute>
        <Registration />
      </NonProtectedRoute>
    ),
  },
]);
function App() {
  return <RouterProvider router={route} />;
}

export default App;
