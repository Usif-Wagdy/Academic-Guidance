import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrivateRoute({ children, type }) {
  const user = Cookies.get("userData");
  const isAuthenticated = user ? true : false;
  const isAdmin = user ? JSON.parse(user).isAdmin : false;

  if (type === "requireAuth" && !isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  if (type === "requireNoAuth" && isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (type === "admin" && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}
