import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = Cookies.get("authToken");
    const userData = Cookies.get("userData");

    return token && userData ? { token, user: JSON.parse(userData) } : null;
  });

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userData = Cookies.get("userData");

    if (token && userData) {
      setAuth({ token, user: JSON.parse(userData) });
    } else {
      setAuth(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
