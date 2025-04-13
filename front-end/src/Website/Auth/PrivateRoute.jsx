import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import AccessDeniedPage from "../../Components/Admin/Access";

export default function PrivateRoute({ children, type }) {
  const user = Cookies.get("userData");
  const isAuthenticated = user ? true : false;
  const userData = user ? JSON.parse(user) : null;
  const isAdmin = userData?.isAdmin || false;
  const role = userData?.role;

  // Check if the user is authenticated (requireAuth)
  if (type === "requireAuth" && !isAuthenticated) {
    return <Navigate to="/Oops" />;
  }

  // Check if the user is already authenticated (requireNoAuth)
  if (type === "requireNoAuth" && isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Role-based access for admin routes
  if (type === "admin" && !isAdmin) {
    return <Navigate to="/" />;
  }

  // Role-based access for different roles :-
  if (type === "superAdmin" && role !== "superAdmin") {
    return <AccessDeniedPage />;
  }

  if (type === "trackAdmin" && role !== "trackAdmin" && role !== "superAdmin") {
    return <AccessDeniedPage />;
  }

  if (type === "cvAdmin" && role !== "cvAdmin" && role !== "superAdmin") {
    return <AccessDeniedPage />;
  }

  if (
    type === "instructor" &&
    role !== "instructor" &&
    role !== "superInstructor" &&
    role !== "superAdmin"
  ) {
    return <AccessDeniedPage />;
  }

  return children;
}
