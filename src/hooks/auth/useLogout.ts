import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      // Aún navegar a login incluso si hay error
      navigate("/login");
    }
  }, [logout, navigate]);

  return { handleLogout };
};

export default useLogout; 