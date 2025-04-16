import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext, useState } from "react";

type JwtPayload = {
  sub: string;
  userId: number;
};

type User = {
  id: number;
  username: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode<JwtPayload>(storedToken);
        console.log("Decoded Token:", decoded); 
        return { id: decoded.userId, username: decoded.sub ?? "unknown" };
      } catch (err) {
        console.error("Invalid token in localStorage", err);
        localStorage.removeItem("token"); // Clean it up
      }
    }
    return null;
  });

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
