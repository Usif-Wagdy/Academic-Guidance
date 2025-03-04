import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userData = Cookies.get("userData");

    // console.log("Auth Token from Cookies:", token);
    // console.log("User Data from Cookies:", userData);

    if (token && userData) {
      setAuth({ token, user: JSON.parse(userData) });
    }
  }, [Cookies.get("authToken")]); // Runs again if token changes

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
