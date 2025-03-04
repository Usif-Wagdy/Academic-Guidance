import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrivateRoute({ children }) {
  const token = Cookies.get("authToken");
  return token ? children : <Navigate to="/auth/login" />;
}
