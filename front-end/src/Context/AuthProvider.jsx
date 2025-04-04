import { createContext, useContext, useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state based on cookies
  const [auth, setAuth] = useState(() => {
    const token = Cookies.get("authToken");
    const userData = Cookies.get("userData");

    return token && userData ? { token, user: JSON.parse(userData) } : null;
  });

  // UseMemo to prevent unnecessary re-renders
  const value = useMemo(() => ({ auth, setAuth }), [auth]);

  // Check for changes in cookies once on mount and only update state if needed
  useEffect(() => {
    const token = Cookies.get("authToken");
    const userData = Cookies.get("userData");

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      if (!auth || auth.token !== token || auth.user?.id !== parsedUser.id) {
        setAuth({ token, user: parsedUser });
      }
    } else if (auth !== null) {
      setAuth(null);
    }
  }, []); // This runs once when the component mounts

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
