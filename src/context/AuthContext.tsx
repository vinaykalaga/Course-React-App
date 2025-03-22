import { createContext, useContext, useState, useEffect } from "react";
import { login as authLogin, logout as authLogout, isAuthenticated } from "../services/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(isAuthenticated());

  useEffect(() => {
    setUser(isAuthenticated());
  }, []);

  const login = async (username: string, password: string) => {
    await authLogin(username, password);
    setUser(true);
  };

  const logout = () => {
    authLogout();
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
