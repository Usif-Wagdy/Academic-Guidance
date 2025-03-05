import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrivateRoute({ children }) {
  const user = Cookies.get("userData");
  return user ? children : <Navigate to="/auth/login" />;
}
