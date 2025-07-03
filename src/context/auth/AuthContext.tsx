import { createContext, useEffect, useState } from "react";
import { logoutApi } from "../../services/auth/api";

interface AuthContextProps {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (token: string, user: any) => void;
  logout: () => Promise<void>;
  sessionLimitError: string | null;
  setSessionLimitError: (error: string | null) => void;
  activeSessions: any[];
  setActiveSessions: (sessions: any[]) => void;
  maxTokensAllowed: number;
  setMaxTokensAllowed: (max: number) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );
  const [user, setUser] = useState<any | null>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null
  );
  const [sessionLimitError, setSessionLimitError] = useState<string | null>(
    null
  );
  const [activeSessions, setActiveSessions] = useState<any[]>([]);
  const [maxTokensAllowed, setMaxTokensAllowed] = useState<number>(2);

  // Verificar si el usuario está autenticado
  const isAuthenticated = !!token && !!user;

  // Sincronizar con localStorage cuando cambien los estados
  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  const login = (token: string, user: any) => {
    setToken(token);
    setUser(user);
    setSessionLimitError(null); // Limpiar errores al hacer login exitoso
  };

  const logout = async () => {
    try {
      // Llamar al endpoint de logout del backend
      if (token) {
        await logoutApi();
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Continuar con el logout local incluso si falla la llamada al backend
    } finally {
      // Limpiar el estado local
      setToken(null);
      setUser(null);
      setSessionLimitError(null);
      setActiveSessions([]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
        sessionLimitError,
        setSessionLimitError,
        activeSessions,
        setActiveSessions,
        maxTokensAllowed,
        setMaxTokensAllowed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
