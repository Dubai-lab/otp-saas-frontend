import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import Loader from "../components/UI/Loader";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextState {
  user: User | null;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextState>({
  user: null,
  refreshUser: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await axios.get("/users/me");

      setUser(res.data);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    void refreshUser().finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <AuthContext.Provider value={{ user, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
